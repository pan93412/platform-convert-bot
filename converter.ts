import { platforms } from "./platforms";
import type { Platform } from "./platforms/types";

/**
 * Convert the URL. If the URL is not handled by any platform, return `null`.
 *
 * @param url The URL to convert.
 * @returns The converted URL, or `null` if the URL is not handled by any platform.
 */
export function convertUrl(url: URL): ConvertResult | null {
    for (const [_, platform] of platforms) {
        if (platform.shouldHandle(url)) {
            return {
                result: platform.convert(url),
                platform: platform,
            };
        }
    }

    return null;
}

interface ConvertResult {
    result: string;
    platform: Platform;
}
