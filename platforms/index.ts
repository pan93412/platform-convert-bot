import { bilibili } from "./bilibili";
import { youtube } from "./youtube";
import type { Platform } from "./types";

export const platforms: Map<string, Platform> = new Map([
    ["b23", bilibili],
    ["yt", youtube]
]);
