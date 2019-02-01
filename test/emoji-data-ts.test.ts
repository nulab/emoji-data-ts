import { EmojiData } from '../src/emoji-data-ts'

describe('Dummy test', () => {
  const normalEmoji = new EmojiData()
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('EmojiData is instantiable', () => {
    expect(new EmojiData({ cdnPath: '' })).toBeInstanceOf(EmojiData)
  })

  it('getImageDataWithColon must return correct data', () => {
    expect(normalEmoji.getImageDataWithColon(':smile:')).toEqual({
      imageUrl: 'emoji/4.1.0/1f604.png',
      sheetSizeX: 5200,
      sheetSizeY: 5200,
      x: 58.8235294117647,
      y: 54.90196078431372
    })
  })

  it('getImageData must return correct data', () => {
    expect(normalEmoji.getImageData('smile')).toEqual({
      imageUrl: 'emoji/4.1.0/1f604.png',
      sheetSizeX: 5200,
      sheetSizeY: 5200,
      x: 58.8235294117647,
      y: 54.90196078431372
    })
  })

  it('getImageData must return correct data with skintone', () => {
    expect(normalEmoji.getImageData('spock-hand::skin-tone-4')).toEqual({
      imageUrl: 'emoji/4.1.0/1f596-1f3fd.png',
      sheetSizeX: 5200,
      sheetSizeY: 5200,
      x: 56.86274509803921,
      y: 92.15686274509804
    })
  })

  it('getImageData must return null with invalid emoji', () => {
    expect(normalEmoji.getImageData(':)')).toEqual(null)
  })

  it('getImageData must return null with invalid emoji with skintone', () => {
    expect(normalEmoji.getImageData(':)::skin-tone-4')).toEqual(null)
  })
})
