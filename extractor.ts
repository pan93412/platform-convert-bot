import urlRegexSafe from 'url-regex-safe';
import logger from './logger';

/**
 * Extract the URLs from the message.
 * 
 * @param message The message to extract the URLs from.
 * @returns The URLs extracted from the message.
 */
export function extractUrls(message: string): URL[] {
    const matches = message.match(urlRegexSafe()) ?? [];
    return matches.map(url => {
        try {
            return new URL(url);
        } catch (error) {
            logger.debug({ url, error }, "failed to parse URL");
            return null;
        }
    }).filter((url): url is URL => url !== null);
}
