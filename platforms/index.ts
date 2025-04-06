import { bilibili } from "./bilibili";
import type { Platform } from "./types";
import { youtube } from "./youtube";

export const platforms: Map<string, Platform> = new Map([
    ["b23", bilibili],
    ["yt", youtube],
]);
