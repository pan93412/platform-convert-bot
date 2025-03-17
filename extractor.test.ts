import { describe, expect, it } from "vitest";
import { extractUrl } from "./extractor";

describe("extractUrl", () => {
    it("should extract urls from a pure URL message", () => {
        const message = "https://www.google.com";
        const urls = extractUrl(message);
        expect(urls).toEqual([new URL(message)]);
    });

    it("should extract urls from a message with multiple urls", () => {
        const message = "https://www.google.com https://www.facebook.com";
        const urls = extractUrl(message);
        expect(urls).toEqual([
            new URL("https://www.google.com"),
            new URL("https://www.facebook.com"),
        ]);
    });

    it("should extract urls from a message with multiple urls and spaces", () => {
        const message = "https://www.google.com https://www.facebook.com  https://www.twitter.com";
        const urls = extractUrl(message);
        expect(urls).toEqual([
            new URL("https://www.google.com"),
            new URL("https://www.facebook.com"),
            new URL("https://www.twitter.com"),
        ]);
    });

    it("should extract urls from a regular message", () => {
        const message = "hello https://www.google.com";
        const urls = extractUrl(message);
        expect(urls).toEqual([new URL("https://www.google.com")]);
    });

    it("should extract urls from a message with comma or period", () => {
        const message = "hello https://www.google.com, 這東西很酷欸 ><";
        const urls = extractUrl(message);
        expect(urls).toEqual([new URL("https://www.google.com")]);
    });

    it("should extract urls from a message with comma or period and spaces", () => {
        const message = "hello https://www.google.com, 這東西很酷欸 >< https://www.facebook.com";
        const urls = extractUrl(message);
        expect(urls).toEqual([
            new URL("https://www.google.com"),
            new URL("https://www.facebook.com"),
        ]);
    });
});