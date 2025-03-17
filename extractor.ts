import logger from './logger';

/**
 * Extract the URLs from the message.
 * 
 * @param message The message to extract the URLs from.
 * @returns The URLs extracted from the message.
 */
export function extractUrl(message: string): URL[] {
    const urlRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    const match = message.match(urlRegex);
    if (!match) return [];

    return match.map(url => {
        try {
            return new URL(url);
        } catch (error) {
            logger.warn({ url, error }, "the extracted url is invalid");
            return null;
        }
    }).filter(Boolean) as URL[];
}
