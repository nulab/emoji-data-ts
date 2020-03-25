export interface Emoji {
    short_name: string;
    unified: string;
    short_names: string[];
    sheet_x: number;
    sheet_y: number;
    skin_variations?: {
        [key: string]: Emoji;
    };
    category: string;
    char: string;
    image_url: string;
    image: string;
}
export interface EmojiImage {
    x: number;
    y: number;
    sheetSizeX: number;
    sheetSizeY: number;
    imageUrl: string;
}
export declare const categoriesData: string[];
export declare const sheetColumns = 52;
export declare const sheetRows = 52;
export declare class EmojiData {
    private emojiValMap;
    private emojiUnifiedValMap;
    emojiCategoryLookUp: Map<string, Emoji[]>;
    readonly emojiUnicodeRegex: RegExp;
    readonly currentVersion: string;
    constructor();
    getVariationEmojis(): Emoji[];
    getImageDataWithColon(emojiStrWithColon: string): EmojiImage | null;
    getImageData(emojiStr: string): EmojiImage | null;
    getEmojiByName(emojiStr: string): Emoji | undefined;
    searchEmoji(emojiStr: string, limit: number): Emoji[];
    isSkinTone(skinTone: string): boolean;
    replaceEmojiToStr(text: string): string;
    getSkinInfo: (emoji: Emoji, skinTone?: string | undefined) => {
        sheet_x: number;
        sheet_y: number;
        unified: string;
        short_name: string;
        image_url: string;
    };
    private convertUniToStr;
    private initEnv;
    private initEmojiMap;
    private initUnified;
    private findImage;
}
