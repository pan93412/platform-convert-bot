import { REST, Routes, SlashCommandBuilder, type Snowflake } from "discord.js";
import { bilibili } from "./bilibili";
import type { Platform } from "./types";

export const platforms: Map<string, Platform> = new Map([
    ["b23", bilibili],
]);

export async function registerSlashCommands(rest: REST, applicationId: Snowflake) {
    const commandsData = Object.values(platforms).map(platform => new SlashCommandBuilder()
        .setName(platform.command)
        .setDescription(platform.description)
        .addStringOption(option => option.setName("url").setDescription("原始連結").setRequired(true)));

    await rest.put(
        Routes.applicationCommands(applicationId),
        { body: commandsData },
    );
}
