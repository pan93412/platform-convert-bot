import { describe, it, expect } from "vitest";
import { bilibili } from "./bilibili";

describe("Bilibili", () => {
    describe("shouldHandle", () => {
        it("should return true if the url is a bilibili standard url", () => {
            const url = new URL("https://www.bilibili.com/video/BV1oWQyYdECQ/");
            const result = bilibili.shouldHandle(url);
            expect(result).toBe(true);
        });

        it("should return true if the url is a bilibili short url", () => {
            const url = new URL("https://b23.tv/nHaHjyu");
            const result = bilibili.shouldHandle(url);
            expect(result).toBe(true);
        });

        it("should return false if the url has been converted", () => {
            const url = new URL("https://vxb23.tv/BV1oWQyYdECQ");
            const result = bilibili.shouldHandle(url);
            expect(result).toBe(false);
        });

        it("should return false if the url is not a bilibili url", () => {
            const url = new URL("https://www.google.com");
            const result = bilibili.shouldHandle(url);
            expect(result).toBe(false);
        });
    });

    describe("convert", () => {
        it("should convert bilibili standard url to vxb23 url", () => {
            const url = new URL("https://www.bilibili.com/video/BV1oWQyYdECQ/");
            const result = bilibili.convert(url);
            expect(result).toBe("https://vxb23.tv/BV1oWQyYdECQ");
        });
    
        it("should convert bilibili short url to vxb23 url", () => {
            const url = new URL("https://b23.tv/nHaHjyu");
            const result = bilibili.convert(url);
            expect(result).toBe("https://vxb23.tv/nHaHjyu");
        });

        it("should convert bilibili short url with track id to vxb23 url", () => {
            const url = new URL("https://b23.tv/nHaHjyu?spm_id_from=333.337.search-card.all.click&vd_source=114514");
            const result = bilibili.convert(url);
            expect(result).toBe("https://vxb23.tv/nHaHjyu");
        });
    
        it("should convert bilibili short url with track id to vxb23 url", () => {
            const url = new URL("https://b23.tv/nHaHjyu?spm_id_from=333.337.search-card.all.click&vd_source=114514");
            const result = bilibili.convert(url);
            expect(result).toBe("https://vxb23.tv/nHaHjyu");
        });
    });
});
