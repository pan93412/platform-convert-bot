import { Platform } from "./types";

export const bilibili: Platform = {
    command: "b23",
    name: "Bilibili",
    description: "將 Bilibili 的連結轉換成 vxb23 的連結",
    convert(url: string): string {
        const parsedUrl = new URL(url);

        // 如果已經是 vxb23 的連結，則直接回傳（不處理）
        if (parsedUrl.hostname === "vxb23.tv") {
            return url;
        }

        // 如果 hostname 不是 bilibili 或 b23，則拋出錯誤
        if (parsedUrl.hostname !== "www.bilibili.com" && parsedUrl.hostname !== "b23.tv") {
            throw new Error("Invalid Bilibili URL: invalid hostname.");
        }

        const pathname = parsedUrl.pathname.replace(/\/$/, "");
        const videoId = pathname.split("/").pop()?.trim();
        if (!videoId) {
            throw new Error("Invalid Bilibili URL: no video id found.");
        }

        return `https://vxb23.tv/${videoId}`;
    }
}
