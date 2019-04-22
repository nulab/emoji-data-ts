import { EmojiData } from '../src/emoji-data-ts'
import e from '../src/emoji.json'

describe('Dummy test', () => {
  const normalEmoji = new EmojiData()
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('EmojiData is instantiable', () => {
    expect(new EmojiData()).toBeInstanceOf(EmojiData)
  })

  it('currentVersion returns 4.1.0', () => {
    expect(normalEmoji.currentVersion).toEqual('4.1.0')
  })

  it('getVariationEmojis returns emojis with skintone array', () => {
    expect(normalEmoji.getVariationEmojis()).toEqual(e.filter(a => a.skin_variations != null))
  })

  it('getImageDataWithColon returns correct data', () => {
    expect(normalEmoji.getImageDataWithColon(':smile:')).toEqual({
      imageUrl: '1f604.png',
      sheetSizeX: 5200,
      sheetSizeY: 5200,
      x: 58.8235294117647,
      y: 54.90196078431372
    })
  })

  it('getImageData returns correct data', () => {
    expect(normalEmoji.getImageData('smile')).toEqual({
      imageUrl: '1f604.png',
      sheetSizeX: 5200,
      sheetSizeY: 5200,
      x: 58.8235294117647,
      y: 54.90196078431372
    })
  })

  it('getImageData returns correct data with skintone', () => {
    expect(normalEmoji.getImageData('spock-hand::skin-tone-4')).toEqual({
      imageUrl: '1f596-1f3fd.png',
      sheetSizeX: 5200,
      sheetSizeY: 5200,
      x: 56.86274509803921,
      y: 92.15686274509804
    })
  })

  it('getImageData returns null with invalid emoji', () => {
    expect(normalEmoji.getImageData(':)')).toEqual(null)
  })

  it('getImageData returns null with invalid emoji with skintone', () => {
    expect(normalEmoji.getImageData(':)::skin-tone-4')).toEqual(null)
  })

  it('getEmojiByName returns correct emoji object', () => {
    const smile = 'smile'
    expect(normalEmoji.getEmojiByName(smile)).toEqual(e.find(a => a.short_name === smile))
  })

  it('searchEmoji returns correct emoji list', () => {
    const searchWord = 's'
    expect(normalEmoji.searchEmoji(searchWord, 10)).toEqual(
      e.filter(a => a.short_name.indexOf(searchWord) > -1).slice(0, 10)
    )
  })

  it(':ok_hand::skin-tone-5: is judged true', () => {
    expect(normalEmoji.isSkinTone(':ok_hand::skin-tone-5:')).toEqual(true)
  })

  it(':ok_hand: is judged false', () => {
    expect(normalEmoji.isSkinTone(':ok_hand:')).toEqual(false)
  })

  it('replaceEmojiToStr returns emoji short name', () => {
    expect(normalEmoji.replaceEmojiToStr('😀')).toEqual(':grinning:')
  })

  it('replaceEmojiToStr returns emoji short name with skintone', () => {
    expect(normalEmoji.replaceEmojiToStr('👍🏿')).toEqual(':+1::skin-tone-6:')
  })

  it('replaceEmojiToStr returns the same as input', () => {
    expect(normalEmoji.replaceEmojiToStr('aaaa')).toEqual('aaaa')
  })

  it('getSkinInfo returns an emoji object without skintone', () => {
    const emoji = normalEmoji.getEmojiByName('smile')
    if (emoji != null) {
      expect(normalEmoji.getSkinInfo(emoji)).toEqual({
        image_url: '1f604.png',
        sheet_x: 30,
        sheet_y: 28,
        short_name: 'smile',
        unified: '1F604'
      })
      return
    }
    fail()
  })

  it('getSkinInfo returns an emoji object with skintone', () => {
    const emoji = normalEmoji.getEmojiByName('smile')
    if (emoji != null) {
      expect(normalEmoji.getSkinInfo(emoji, 'skin-tone-5')).toEqual({
        image_url: '1f604.png',
        sheet_x: 58.8235294117647,
        sheet_y: 54.90196078431372,
        short_name: 'skin-tone-5',
        unified: '1F604'
      })
      return
    }
    fail()
  })
})
