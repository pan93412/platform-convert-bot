/**
 * Main entry point for the Discord bot
 */

import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { extractUrl } from './extractor';
import { convertUrl } from './converter';

// Load environment variables
config();

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

const discordToken = process.env.DISCORD_TOKEN;
if (!discordToken) {
  throw new Error("DISCORD_TOKEN is not set");
}

// Log in to Discord
client.login(discordToken);

// When the client is ready, run this code once
client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user?.tag ?? '<unknown>'}!`);
});

// Handle message create events
client.on(Events.MessageCreate, async (message) => {
  const urls = extractUrl(message.content);
  const convertedUrls = urls.map(url => convertUrl(url));

  if (convertedUrls.length > 0) {
    await message.reply({ content: convertedUrls.map(result => `${result?.platform.name}: ${result?.result}`).join("\n") });
  }
});
