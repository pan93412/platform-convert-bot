import type { Platform } from "./types";

export const bilibili: Platform = {
    command: "b23",
    name: "Bilibili",
    description: "將 Bilibili 的連結轉換成 vxb23 的連結",

    shouldHandle(url: URL): boolean {
        return url.hostname === "www.bilibili.com" || url.hostname === "b23.tv";
    },

    convert(url: URL): string {
        const pathname = url.pathname.replace(/\/$/, "");
        const videoId = pathname.split("/").pop()?.trim();
        if (!videoId) {
            throw new Error("Invalid Bilibili URL: no video id found.");
        }

        return `https://vxb23.tv/${videoId}`;
    }
}
