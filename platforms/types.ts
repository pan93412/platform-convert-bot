export interface Platform {
    /**
     * 指令名稱 (例如: /b23)
     */
    command: string;
    /**
     * 轉換器名稱 (例如: Bilibili)
     */
    name: string;
    /**
     * 轉換器描述
     */
    description: string;

    /**
     * 決定是否要處理這則訊息。
     *
     * @param url 網址
     * @returns 是否要由這個 platform 處理
     */
    shouldHandle(url: URL): boolean;

    /**
     * 傳入一個網址，轉換成整理過的連結
     *
     * @param url 網址
     * @returns 整理過的連結
     */
    convert(url: URL): string;
}
