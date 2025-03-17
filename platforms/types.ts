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
     * 傳入一個網址，轉換成整理過的連結
     * 
     * @param url 網址
     * @returns 整理過的連結
     */
    convert(url: string): string;
}
