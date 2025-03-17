/**
 * Main entry point for the Discord bot
 */

import { Client, Events, GatewayIntentBits, MessageFlags } from 'discord.js';
import { config } from 'dotenv';
import { extractUrls } from './extractor';
import { convertUrl } from './converter';
import logger from './logger';

// Load environment variables
config();

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const discordToken = process.env.DISCORD_TOKEN;
if (!discordToken) {
    logger.error("DISCORD_TOKEN is not set");
    throw new Error("DISCORD_TOKEN is not set");
}

// Log in to Discord
client.login(discordToken);

// When the client is ready, run this code once
client.once(Events.ClientReady, () => {
    logger.info(`Logged in as ${client.user?.tag ?? '<unknown>'}!`);
});

// Handle message create events
client.on(Events.MessageCreate, async (message) => {
    // make sure the message is not from the bot
    if (message.author.bot) return;

    // extract the urls from the message
    const urls = extractUrls(message.content);
    const convertedUrls = urls.map(url => convertUrl(url)).filter(Boolean);

    logger.debug({ urls, convertedUrls, content: message.content }, "Converting URLs");

    if (convertedUrls.length > 0) {
        await message.reply({
            content: convertedUrls.map(result => `${result?.platform.name}: ${result?.result}`,
            ).join("\n"),
            flags: MessageFlags.SuppressNotifications,
        });
    }
});
