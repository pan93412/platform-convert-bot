import logger from './logger';

/**
 * Extract the URLs from the message.
 * 
 * @param message The message to extract the URLs from.
 * @returns The URLs extracted from the message.
 */
export function extractUrl(message: string): URL[] {
    const urls: URL[] = [];
    
    // Split the message into words
    const words = message.split(/\s+/);
    
    for (const word of words) {
        // Remove trailing punctuation
        let cleanWord = word;
        
        // Skip empty words
        if (!cleanWord) continue;
        
        // Try to parse the word as a URL
        try {
            // Check if the word contains a protocol, if not, try to add it
            let urlCandidate = cleanWord;
            if (!urlCandidate.startsWith('http://') && !urlCandidate.startsWith('https://')) {
                continue; // Skip words without protocol as they're likely not URLs
            }
            
            // Remove trailing punctuation (commas, periods, etc.)
            while (urlCandidate.length > 0 && 
                   [',', '.', ':', ';', '，', '。', '：', '；', '、'].includes(urlCandidate[urlCandidate.length - 1])) {
                urlCandidate = urlCandidate.slice(0, -1);
            }
            
            if (urlCandidate) {
                const url = new URL(urlCandidate);
                urls.push(url);
            }
        } catch (error) {
            logger.debug({ url: cleanWord, error }, "the extracted url is invalid");
        }
    }
    
    return urls;
}
