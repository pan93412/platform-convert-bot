import { describe, expect, it } from "vitest";
import { convertUrl, type ConvertResult } from "./converter";
import { bilibili } from "./platforms/bilibili";

describe("convertUrl", () => {
    it("should convert bilibili url to vxb23 url", () => {
        const url = new URL("https://www.bilibili.com/video/BV1oWQyYdECQ");
        const result = convertUrl(url);
        expect(result).toStrictEqual({
            result: "https://vxb23.tv/BV1oWQyYdECQ",
            platform: bilibili,
        } satisfies ConvertResult);
    });

    it("should return null if the url is not handled by any platform", () => {
        const url = new URL("https://www.google.com");
        const result = convertUrl(url);
        expect(result).toBeNull();
    });
});
