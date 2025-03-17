import logger from './logger';

/**
 * Extract the URLs from the message.
 * 
 * @param message The message to extract the URLs from.
 * @returns The URLs extracted from the message.
 */
export function extractUrl(message: string): URL[] {
    let urlBuf = '';
    const urls: URL[] = [];

    let idx = 0;

    for (const char of message) {
        if (char === ' ') {
            if (urlBuf.length > 0) {
                try {
                    const url = new URL(urlBuf);
                    urls.push(url);
                } catch (error) {
                    logger.debug({ url: urlBuf, error, idx }, "the extracted url is invalid");
                }
            }
            urlBuf = '';
        } else {
            urlBuf += char;
        }

        idx++;
    }

    // check if there is a url in the buffer, if so, parse it.
    if (urlBuf.length > 0) {
        try {
            const url = new URL(urlBuf);
            urls.push(url);
        } catch (error) {
            logger.debug({ url: urlBuf, error, idx }, "the extracted url is invalid");
        }
    }

    return urls;
}
