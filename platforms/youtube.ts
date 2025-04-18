import logger from "../logger";
import type { Platform } from "./types";

export const youtube: Platform = {
    command: "yt",
    name: "YouTube",
    description: "將 YouTube 的連結轉換成 youtube.com 格式，並移除追蹤參數",

    shouldHandle(url: URL): boolean {
        return (
            url.hostname === "www.youtube.com" ||
            url.hostname === "youtube.com" ||
            url.hostname === "youtu.be"
        );
    },

    convert(url: URL): string {
        let videoId: string | null;
        let timestamp: string | null = null;

        // Extract video ID based on URL format
        if (url.hostname === "youtu.be") {
            videoId = url.pathname.replace(/^\//, "").split("/")[0];
        } else {
            videoId = url.searchParams.get("v");
        }
        timestamp = url.searchParams.get("t");

        if (!videoId) {
            logger.error(
                { url: url.toString() },
                "Invalid YouTube URL: no video id found.",
            );
            throw new Error("Invalid YouTube URL: no video id found.");
        }

        let result = `https://youtube.com/watch?v=${videoId}`;

        // Preserve timestamp if it exists
        if (timestamp) {
            result += `&t=${timestamp}`;
        }

        return result;
    },
};
