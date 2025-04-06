import { describe, expect, it } from "vitest";
import { youtube } from "./youtube";

describe("YouTube", () => {
    describe("shouldHandle", () => {
        it("should return true if the url is a youtube standard url", () => {
            const url = new URL("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
            const result = youtube.shouldHandle(url);
            expect(result).toBe(true);
        });

        it("should return true if the url is a youtube.com url", () => {
            const url = new URL("https://youtube.com/watch?v=dQw4w9WgXcQ");
            const result = youtube.shouldHandle(url);
            expect(result).toBe(true);
        });

        it("should return true if the url is a youtu.be short url", () => {
            const url = new URL("https://youtu.be/dQw4w9WgXcQ");
            const result = youtube.shouldHandle(url);
            expect(result).toBe(true);
        });

        it("should return false if the url is not a youtube url", () => {
            const url = new URL("https://www.google.com");
            const result = youtube.shouldHandle(url);
            expect(result).toBe(false);
        });
    });

    describe("convert", () => {
        it("should convert youtube standard url to youtube.com url", () => {
            const url = new URL("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
            const result = youtube.convert(url);
            expect(result).toBe("https://youtube.com/watch?v=dQw4w9WgXcQ");
        });

        it("should maintain youtube.com url format", () => {
            const url = new URL("https://youtube.com/watch?v=dQw4w9WgXcQ");
            const result = youtube.convert(url);
            expect(result).toBe("https://youtube.com/watch?v=dQw4w9WgXcQ");
        });

        it("should convert youtu.be url to youtube.com format", () => {
            const url = new URL("https://youtu.be/dQw4w9WgXcQ");
            const result = youtube.convert(url);
            expect(result).toBe("https://youtube.com/watch?v=dQw4w9WgXcQ");
        });

        it("should remove tracking parameters from youtu.be url and convert to youtube.com", () => {
            const url = new URL(
                "https://youtu.be/dQw4w9WgXcQ?si=IPsWsXYiUwuOfB7x",
            );
            const result = youtube.convert(url);
            expect(result).toBe("https://youtube.com/watch?v=dQw4w9WgXcQ");
        });

        it("should preserve timestamp parameter when converting youtube urls", () => {
            const url = new URL(
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s",
            );
            const result = youtube.convert(url);
            expect(result).toBe(
                "https://youtube.com/watch?v=dQw4w9WgXcQ&t=30s",
            );
        });

        it("should preserve timestamp parameter when converting youtu.be urls", () => {
            const url = new URL("https://youtu.be/dQw4w9WgXcQ?t=30s");
            const result = youtube.convert(url);
            expect(result).toBe(
                "https://youtube.com/watch?v=dQw4w9WgXcQ&t=30s",
            );
        });

        it("should convert youtube url with additional parameters but only keep timestamp parameter", () => {
            const url = new URL(
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s&ab_channel=RickAstley",
            );
            const result = youtube.convert(url);
            expect(result).toBe(
                "https://youtube.com/watch?v=dQw4w9WgXcQ&t=30s",
            );
        });

        it("should throw error for invalid youtube urls", () => {
            const url = new URL("https://www.youtube.com/playlist?list=123456");
            expect(() => youtube.convert(url)).toThrow(
                "Invalid YouTube URL: no video id found.",
            );
        });
    });
});
