import e from './emoji.json'
const currentVersion = '5.0.1'
const emojis: Emoji[] = e

export interface Emoji {
  short_name: string
  unified: string
  short_names: string[]
  sheet_x: number
  sheet_y: number
  skin_variations?: { [key: string]: Emoji }
  category: string
  char: string
  image_url: string
  image: string
}

export interface EmojiImage {
  x: number
  y: number
  sheetSizeX: number
  sheetSizeY: number
  imageUrl: string
}

const skinToneUnicodeMap: { [key: string]: string } = {
  '\uD83C\uDFFB': 'skin-tone-2',
  '\uD83C\uDFFC': 'skin-tone-3',
  '\uD83C\uDFFD': 'skin-tone-4',
  '\uD83C\uDFFE': 'skin-tone-5',
  '\uD83C\uDFFF': 'skin-tone-6'
}

export const categoriesData = [
  'People & Body',
  'Animals & Nature',
  'Food & Drink',
  'Activities',
  'Travel & Places',
  'Objects',
  'Symbols',
  'Flags'
]

export const sheetColumns = 57
export const sheetRows = 57

export class EmojiData {
  private emojiValMap: Map<string, Emoji> = new Map()
  private emojiUnifiedValMap: Map<string, Emoji> = new Map()
  public emojiCategoryLookUp: Map<string, Emoji[]> = new Map()
  public readonly emojiUnicodeRegex = this.initUnified()

  public get currentVersion(): string {
    return currentVersion
  }

  constructor() {
    this.initEnv()
  }
  public getVariationEmojis() {
    return emojis.filter(a => a.skin_variations != null)
  }

  public getImageDataWithColon(emojiStrWithColon: string): EmojiImage | null {
    const emojiStr = emojiStrWithColon.substr(1, emojiStrWithColon.length - 2)
    return this.getImageData(emojiStr)
  }

  public getImageData(emojiStr: string): EmojiImage | null {
    if (emojiStr.indexOf('::skin-tone-') === -1) {
      const emojiVal = this.emojiValMap.get(emojiStr)

      if (emojiVal != null && emojiVal.category !== 'Skin Tones') {
        return this.findImage(emojiVal)
      }

      return null
    }

    const skinTone = emojiStr.substr(-1, 1)
    const skinVal = this.emojiValMap.get(`skin-tone-${skinTone}`)
    const emojiIdx = emojiStr.substr(0, emojiStr.length - 13)
    const emojiVal = this.emojiValMap.get(emojiIdx)

    if (emojiVal != null) {
      return this.findImage(emojiVal, skinVal)
    }

    return null
  }

  public getEmojiByName(emojiStr: string): Emoji | undefined {
    return this.emojiValMap.get(emojiStr)
  }

  public searchEmoji(emojiStr: string, limit: number): Emoji[] {
    const result = []

    for (const emoji of emojis) {
      const index = emoji.short_name.indexOf(emojiStr)
      if (index > -1 && !this.isSkinTone(emoji.short_name)) {
        result.push({ index, emoji })
      }
    }

    return result
      .sort((a, b) => a.emoji.short_name.length - b.emoji.short_name.length)
      .sort((a, b) => a.index - b.index)
      .map(a => a.emoji)
      .slice(0, limit)
  }

  public isSkinTone(skinTone: string): boolean {
    return skinTone != null && skinTone.indexOf('skin-tone-') > -1
  }

  public replaceEmojiToStr(text: string): string {
    return text.replace(this.emojiUnicodeRegex, (m, p1, p2) => {
      return this.convertUniToStr(m, p1, p2)
    })
  }

  public getSkinInfo = (
    emoji: Emoji,
    skinTone?: string
  ): {
    sheet_x: number
    sheet_y: number
    unified: string
    short_name: string
    image_url: string
  } => {
    if (skinTone != null && this.isSkinTone(skinTone)) {
      const d = this.emojiValMap.get(skinTone)
      const pos = this.findImage(emoji, d)
      return {
        sheet_x: pos.x,
        sheet_y: pos.y,
        unified: emoji.unified,
        short_name: skinTone,
        image_url: pos.imageUrl
      }
    }

    return {
      sheet_x: emoji.sheet_x,
      sheet_y: emoji.sheet_y,
      unified: emoji.unified,
      short_name: emoji.short_name,
      image_url: emoji.image_url
    }
  }

  private convertUniToStr(
    emojiUni: string,
    withoutSkinToneUni: string,
    skinToneUni?: string
  ): string {
    const emoji = this.emojiUnifiedValMap.get(withoutSkinToneUni)
    if (emoji != null) {
      if (skinToneUni != null && skinToneUnicodeMap[skinToneUni] != null) {
        return `:${emoji.short_name}::${skinToneUnicodeMap[skinToneUni]}:`
      }
      return `:${emoji.short_name}:`
    }

    return emojiUni
  }

  private initEnv() {
    this.initEmojiMap()
  }

  private initEmojiMap() {
    for (const e of emojis) {
      if (e.skin_variations != null) {
        for (const skin of Object.values(e.skin_variations)) {
          skin.image_url = skin.image
        }
      }

      e.image_url = e.image
      for (const name of e.short_names) {
        this.emojiValMap.set(name, e)
      }
      this.emojiUnifiedValMap.set(e.char, e)
    }
    const modifierCategory = 'Skin Tones'

    for (const c of categoriesData) {
      if (c !== modifierCategory) {
        const e = emojis.filter(a => a.category === c)
        this.emojiCategoryLookUp.set(c, e)
      }
    }
  }

  private initUnified() {
    const a = []
    for (const e of emojis) {
      a.push(e.char.replace('*', '\\*'))
    }

    a.sort((a, b) => {
      return b.length - a.length
    })
    return new RegExp(`(${a.join('|')})(\uD83C[\uDFFB-\uDFFF])?`, 'g')
  }

  private findImage = (actual: Emoji, variation?: Emoji): EmojiImage => {
    const sheetSizeX = 100 * sheetColumns
    const sheetSizeY = 100 * sheetRows
    const multiplyX = 100 / (sheetColumns - 1)
    const multiplyY = 100 / (sheetRows - 1)

    if (actual.skin_variations != null && variation != null) {
      const a =
        actual.skin_variations[variation.unified] ||
        actual.skin_variations[`${variation.unified}-${variation.unified}`]
      return {
        x: a.sheet_x * multiplyX,
        y: a.sheet_y * multiplyY,
        sheetSizeX,
        sheetSizeY,
        imageUrl: a.image_url
      }
    }

    return {
      x: actual.sheet_x * multiplyX,
      y: actual.sheet_y * multiplyY,
      sheetSizeX,
      sheetSizeY,
      imageUrl: actual.image_url
    }
  }
}
