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
interface Option {
    cdnPath?: string;
}
export interface EmojiImage {
    x: number;
    y: number;
    sheetSizeX: number;
    sheetSizeY: number;
    imageUrl: string;
}
export declare class EmojiData {
    private opts?;
    private emojiValMap;
    private emojiUnifiedValMap;
    emojiCategoryLookUp: Map<string, Emoji[]>;
    readonly emojiUnicodeRegex: RegExp;
    constructor(opts?: Option | undefined);
    findImage: (actual: Emoji, variation?: Emoji | undefined) => EmojiImage;
    getImageDataWithColon(emojiStrWithColon: string): EmojiImage | null;
    getImageData(emojiStr: string): EmojiImage | null;
    getEmojiByName(emojiStr: string): Emoji | undefined;
    isSkinTone(skinTone: string): boolean;
    replaceEmojiToStr(text: string): string;
    private convertUniToStr;
    private initEnv;
    private initEmojiMap;
    private getEmojiImgPath;
    private initUnified;
}
export {};
