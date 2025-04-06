import urlRegexSafe from 'url-regex-safe';

/**
 * Extract the URLs from the message.
 * 
 * @param message The message to extract the URLs from.
 * @returns The URLs extracted from the message.
 */
export function extractUrls(message: string): URL[] {
    const matches = message.match(urlRegexSafe()) ?? [];
    return matches.map(url => new URL(url));
}
