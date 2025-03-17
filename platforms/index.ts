import { REST, Routes, SlashCommandBuilder, type Snowflake } from "discord.js";
import { bilibili } from "./bilibili";
import type { Platform } from "./types";

export const platforms: Map<string, Platform> = new Map([
    ["b23", bilibili],
]);
