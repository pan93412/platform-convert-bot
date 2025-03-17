# Platform Convert Bot

這是一個可以將不同平台的連結轉換成其他格式的 Discord 機器人。

## 使用方式

在 Discord 中，直接貼上連結，就會將連結轉換成整理後的連結。

比如
```
這影片超讚：https://www.bilibili.com/video/BV1oWQyYdECQ/
```

機器人會回覆：

```
https://vxb23.tv/BV1oWQyYdECQ
```

## 開發指南

### 環境需求

本專案使用 TypeScript 和 Node.js 開發。你可以選擇以下兩種方式設定開發環境：

#### 方法一：使用 Devenv（建議）

如果你有安裝 [Devenv](https://devenv.sh/)，只需要一個指令就能設定好開發環境，不需要事先安裝 Node.js 和 pnpm：

```bash
devenv shell
```

#### 方法二：手動安裝

1. 安裝 [Node.js](https://nodejs.org/)
2. 安裝 [pnpm](https://pnpm.io/)

### 常用指令

- `pnpm start` - 啟動機器人
- `pnpm test` - 執行單元測試
- `pnpm type-check` - 執行型別檢查

### 如何新增平台支援

想要新增其他平台的轉換功能嗎？跟著以下步驟：

1. 在 `platforms` 資料夾中建立新的檔案，例如 `youtube.ts`
2. 參考 `bilibili.ts` 的格式來實作你的平台轉換邏輯
3. 建立對應的測試檔案，例如 `youtube.test.ts`（參考 `bilibili.test.ts`）
4. 在 `platforms/index.ts` 中註冊你的平台

#### 平台實作範例

```typescript
import type { Platform } from "./types";

export const youtube: Platform = {
    command: "yt", // 這會是斜線指令的名稱，例如 /yt
    name: "YouTube",
    description: "將 YouTube 連結轉換成無廣告版本",
    shouldHandle(url: URL): boolean {
        return url.hostname === "www.youtube.com" || url.hostname === "youtu.be";
    },
    convert(url: URL): string {
        // 實作你的轉換邏輯
        // 如果有錯誤，直接 throw 錯誤就好！
        return "轉換後的連結";
    }
}
```

#### 註冊你的平台

在 `platforms/index.ts` 中：

```typescript
import { youtube } from "./youtube";

export const platforms: Map<string, Platform> = new Map([
    ["b23", bilibili],
    ["yt", youtube], // 新增你的平台
]);
```

### 測試你的程式碼

每當你新增或修改功能時，請確保：

1. 寫好單元測試（參考 `bilibili.test.ts`）
2. 執行 `pnpm test` 確認所有測試都通過
3. 執行 `pnpm type-check` 確認沒有型別錯誤

這樣就能確保你的程式碼品質！
