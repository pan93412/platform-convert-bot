
/**
 * Extract the URLs from the message.
 * 
 * @param message The message to extract the URLs from.
 * @returns The URLs extracted from the message.
 */
export function extractUrl(message: string): URL[] {
    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    const match = message.match(urlRegex);
    if (!match) return [];

    return match.map(url => {
        try {
            return new URL(url);
        } catch (error) {
            console.warn("extractUrl: the extracted url (%s) is invalid: %s", url, error);
            return null;
        }
    }).filter(Boolean) as URL[];
}

