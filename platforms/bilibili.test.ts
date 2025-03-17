import { describe, it, expect } from "vitest";
import { bilibili } from "./bilibili";

describe("Bilibili", () => {
    it("should convert bilibili standard url to vxb23 url", () => {
        const url = "https://www.bilibili.com/video/BV1oWQyYdECQ/";
        const result = bilibili.convert(url);
        expect(result).toBe("https://vxb23.tv/BV1oWQyYdECQ");
    });

    it("should convert bilibili short url to vxb23 url", () => {
        const url = "https://b23.tv/nHaHjyu";
        const result = bilibili.convert(url);
        expect(result).toBe("https://vxb23.tv/nHaHjyu");
    });

    it("should convert bilibili short url with track id to vxb23 url", () => {
        const url = "https://b23.tv/nHaHjyu?spm_id_from=333.337.search-card.all.click&vd_source=114514";
        const result = bilibili.convert(url);
        expect(result).toBe("https://vxb23.tv/nHaHjyu");
    });

    it("should convert bilibili short url with track id to vxb23 url", () => {
        const url = "https://b23.tv/nHaHjyu?spm_id_from=333.337.search-card.all.click&vd_source=114514";
        const result = bilibili.convert(url);
        expect(result).toBe("https://vxb23.tv/nHaHjyu");
    });
    
    it("should leave the url unchanged if it's already a vxb23 url", () => {
        const url = "https://vxb23.tv/nHaHjyu";
        const result = bilibili.convert(url);
        expect(result).toBe(url);
    });

    it("should throw an error if the url is not a bilibili url", () => {
        const url = "https://www.google.com";
        expect(() => bilibili.convert(url)).toThrow("Invalid Bilibili URL: invalid hostname.");
    });
});
