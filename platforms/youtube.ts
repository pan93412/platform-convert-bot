import type { Platform } from "./types";
import logger from "../logger";

export const youtube: Platform = {
    command: "yt",
    name: "YouTube",
    description: "將 YouTube 的連結轉換成短版 youtu.be 格式，並移除追蹤參數",

    shouldHandle(url: URL): boolean {
        return url.hostname === "www.youtube.com" || 
               url.hostname === "youtube.com" || 
               url.hostname === "youtu.be";
    },

    convert(url: URL): string {
        // If it's already a youtu.be URL, just ensure it has no tracking parameters
        if (url.hostname === "youtu.be") {
            const videoId = url.pathname.replace(/^\//, "").split("/")[0];
            return `https://youtu.be/${videoId}`;
        }

        // Extract video ID from URL params for youtube.com URLs
        const videoId = url.searchParams.get("v");
        if (!videoId) {
            logger.error({ url: url.toString() }, "Invalid YouTube URL: no video id found.");
            throw new Error("Invalid YouTube URL: no video id found.");
        }

        return `https://youtu.be/${videoId}`;
    }
};
