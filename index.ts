/**
 * Main entry point for the Discord bot
 */

import { Client, Events, GatewayIntentBits } from 'discord.js';
import { REST } from '@discordjs/rest';
import { config } from 'dotenv';
import { platforms, registerSlashCommands } from './platforms';

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
  if (!client.user) {
    throw new Error("Client user is not set");
  }

  console.log(`Logged in as ${client.user.tag}!`);

  const rest = new REST().setToken(discordToken);
  
  // Register slash commands
  registerSlashCommands(rest, client.user.id).then(() => {
    console.log("Slash commands registered successfully");
  }).catch(console.error);
});

// Handle interaction create events (slash commands)
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) return;

  // 取得 slash command 名稱
  const commandName = interaction.commandName;

  // 取得 slash command 對應的 platform
  const platform = platforms.get(commandName);
  if (!platform) {
    console.error(`使用者嘗試觸發未知的 slash command: ${interaction.commandName}`);
    return;
  }

  try {
    const url = interaction.options.get("url", true).value;
    if (typeof url !== "string") {
      throw new Error("沒有指定網址。");
    }

    const convertedUrl = platform.convert(url);
    await interaction.reply({ content: `${platform.name}: ${convertedUrl}` });
  } catch (error) {
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: `執行失敗 🥺: ${error}`, ephemeral: true });
    } else {
      await interaction.reply({ content: `執行失敗 🥺: ${error}`, ephemeral: true });
    }
  }
});
