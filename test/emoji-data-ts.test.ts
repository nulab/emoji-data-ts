import { EmojiData, Emoji, sheetColumns, sheetRows } from '../src/emoji-data-ts'
import e from '../src/emoji.json'
import {multiplyPos} from './util'

describe('emoji-data-ts test', () => {
  const normalEmoji = new EmojiData()
  it('EmojiData is instantiable', () => {
    expect(new EmojiData()).toBeInstanceOf(EmojiData)
  })

  it('currentVersion returns 7.0.2', () => {
    expect(normalEmoji.currentVersion).toEqual('7.0.2')
  })

  it('getVariationEmojis returns emojis with skintone array', () => {
    expect(normalEmoji.getVariationEmojis()).toEqual(e.filter(a => a.skin_variations != null))
  })

  it('getImageDataWithColon returns correct data', () => {
    const shortName = "smile"
    const smileData = normalEmoji.getEmojiByName(shortName)
    if(smileData == null){
      throw new Error("smile emoji not found")
    }
    expect(normalEmoji.getImageDataWithColon(`:${shortName}:`)).toEqual({
      imageUrl: '1f604.png',
      sheetSizeX: sheetColumns * 100,
      sheetSizeY: sheetRows * 100,
      ...multiplyPos(smileData.sheet_x, smileData.sheet_y, sheetColumns,sheetRows)
    })
  })

  it('getImageData returns correct data', () => {
    const shortName = "smile"
    const smileData = normalEmoji.getEmojiByName(shortName)
    if(smileData == null){
      throw new Error("smile emoji not found")
    }
    expect(normalEmoji.getImageData(shortName)).toEqual({
      imageUrl: '1f604.png',
      sheetSizeX: sheetColumns * 100,
      sheetSizeY: sheetRows * 100,
      ...multiplyPos(smileData.sheet_x, smileData.sheet_y, sheetColumns,sheetRows)
    })
  })

  it('getImageData returns correct data with skintone', () => {
    const shortName = "spock-hand"
    const skinTone = "skin-tone-4"
    const spockHand = normalEmoji.getEmojiByName(shortName)
    const skin4 = normalEmoji.getEmojiByName(skinTone)

    if(spockHand == null || skin4 == null || spockHand.skin_variations == null){
      throw new Error("emoji not found")
    }
    const spockHandSkin4 = spockHand.skin_variations[skin4.unified]
    if(spockHandSkin4 == null){
      throw new Error("emoji with skintone not found")
    }
    expect(normalEmoji.getImageData(`${shortName}::${skinTone}`)).toEqual({
      imageUrl: '1f596-1f3fd.png',
      sheetSizeX: sheetColumns * 100,
      sheetSizeY: sheetRows * 100,
      ...multiplyPos(spockHandSkin4.sheet_x, spockHandSkin4.sheet_y, sheetColumns,sheetRows)
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
    expect(normalEmoji.searchEmoji(searchWord, 10).map(a => a.short_name)).toEqual([
      "sa", "sob", "ski", "six", "sos", "swan", "seal", "stew", "salt", "sake"
    ])
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
        sheet_x: 32,
        sheet_y: 56,
        short_name: 'smile',
        unified: '1F604'
      })
      return
    }
    fail()
  })

  it('getSkinInfo returns an emoji with multi-skintone', () => {
    const emoji = {
      name: null,
      unified: '1F9D1-200D-1F91D-200D-1F9D1',
      image: '1f9d1-200d-1f91d-200d-1f9d1.png',
      sheet_x: 46,
      sheet_y: 38,
      short_name: 'people_holding_hands',
      short_names: ['people_holding_hands'],
      category: 'People & Body',
      skin_variations: {
        '1F3FB-1F3FB': {
          unified: '1F9D1-1F3FB-200D-1F91D-200D-1F9D1-1F3FB',
          image: '1f9d1-1f3fb-200d-1f91d-200d-1f9d1-1f3fb.png',
          sheet_x: 46,
          sheet_y: 39,
          image_url: '1f9d1-1f3fb-200d-1f91d-200d-1f9d1-1f3fb.png'
        },
        '1F3FB-1F3FC': {
          unified: '1F9D1-1F3FB-200D-1F91D-200D-1F9D1-1F3FC',
          image: '1f9d1-1f3fb-200d-1f91d-200d-1f9d1-1f3fc.png',
          sheet_x: 46,
          sheet_y: 40,
          image_url: '1f9d1-1f3fb-200d-1f91d-200d-1f9d1-1f3fc.png'
        },
        '1F3FB-1F3FD': {
          unified: '1F9D1-1F3FB-200D-1F91D-200D-1F9D1-1F3FD',
          image: '1f9d1-1f3fb-200d-1f91d-200d-1f9d1-1f3fd.png',
          sheet_x: 46,
          sheet_y: 41,
          image_url: '1f9d1-1f3fb-200d-1f91d-200d-1f9d1-1f3fd.png'
        },
        '1F3FB-1F3FE': {
          unified: '1F9D1-1F3FB-200D-1F91D-200D-1F9D1-1F3FE',
          image: '1f9d1-1f3fb-200d-1f91d-200d-1f9d1-1f3fe.png',
          sheet_x: 46,
          sheet_y: 42,
          image_url: '1f9d1-1f3fb-200d-1f91d-200d-1f9d1-1f3fe.png'
        },
        '1F3FB-1F3FF': {
          unified: '1F9D1-1F3FB-200D-1F91D-200D-1F9D1-1F3FF',
          image: '1f9d1-1f3fb-200d-1f91d-200d-1f9d1-1f3ff.png',
          sheet_x: 46,
          sheet_y: 43,
          image_url: '1f9d1-1f3fb-200d-1f91d-200d-1f9d1-1f3ff.png'
        },
        '1F3FC-1F3FB': {
          unified: '1F9D1-1F3FC-200D-1F91D-200D-1F9D1-1F3FB',
          image: '1f9d1-1f3fc-200d-1f91d-200d-1f9d1-1f3fb.png',
          sheet_x: 46,
          sheet_y: 44,
          image_url: '1f9d1-1f3fc-200d-1f91d-200d-1f9d1-1f3fb.png'
        },
        '1F3FC-1F3FC': {
          unified: '1F9D1-1F3FC-200D-1F91D-200D-1F9D1-1F3FC',
          image: '1f9d1-1f3fc-200d-1f91d-200d-1f9d1-1f3fc.png',
          sheet_x: 46,
          sheet_y: 45,
          image_url: '1f9d1-1f3fc-200d-1f91d-200d-1f9d1-1f3fc.png'
        },
        '1F3FC-1F3FD': {
          unified: '1F9D1-1F3FC-200D-1F91D-200D-1F9D1-1F3FD',
          image: '1f9d1-1f3fc-200d-1f91d-200d-1f9d1-1f3fd.png',
          sheet_x: 46,
          sheet_y: 46,
          image_url: '1f9d1-1f3fc-200d-1f91d-200d-1f9d1-1f3fd.png'
        },
        '1F3FC-1F3FE': {
          unified: '1F9D1-1F3FC-200D-1F91D-200D-1F9D1-1F3FE',
          image: '1f9d1-1f3fc-200d-1f91d-200d-1f9d1-1f3fe.png',
          sheet_x: 46,
          sheet_y: 47,
          image_url: '1f9d1-1f3fc-200d-1f91d-200d-1f9d1-1f3fe.png'
        },
        '1F3FC-1F3FF': {
          unified: '1F9D1-1F3FC-200D-1F91D-200D-1F9D1-1F3FF',
          image: '1f9d1-1f3fc-200d-1f91d-200d-1f9d1-1f3ff.png',
          sheet_x: 46,
          sheet_y: 48,
          image_url: '1f9d1-1f3fc-200d-1f91d-200d-1f9d1-1f3ff.png'
        },
        '1F3FD-1F3FB': {
          unified: '1F9D1-1F3FD-200D-1F91D-200D-1F9D1-1F3FB',
          image: '1f9d1-1f3fd-200d-1f91d-200d-1f9d1-1f3fb.png',
          sheet_x: 46,
          sheet_y: 49,
          image_url: '1f9d1-1f3fd-200d-1f91d-200d-1f9d1-1f3fb.png'
        },
        '1F3FD-1F3FC': {
          unified: '1F9D1-1F3FD-200D-1F91D-200D-1F9D1-1F3FC',
          image: '1f9d1-1f3fd-200d-1f91d-200d-1f9d1-1f3fc.png',
          sheet_x: 46,
          sheet_y: 50,
          image_url: '1f9d1-1f3fd-200d-1f91d-200d-1f9d1-1f3fc.png'
        },
        '1F3FD-1F3FD': {
          unified: '1F9D1-1F3FD-200D-1F91D-200D-1F9D1-1F3FD',
          image: '1f9d1-1f3fd-200d-1f91d-200d-1f9d1-1f3fd.png',
          sheet_x: 46,
          sheet_y: 51,
          image_url: '1f9d1-1f3fd-200d-1f91d-200d-1f9d1-1f3fd.png'
        },
        '1F3FD-1F3FE': {
          unified: '1F9D1-1F3FD-200D-1F91D-200D-1F9D1-1F3FE',
          image: '1f9d1-1f3fd-200d-1f91d-200d-1f9d1-1f3fe.png',
          sheet_x: 46,
          sheet_y: 52,
          image_url: '1f9d1-1f3fd-200d-1f91d-200d-1f9d1-1f3fe.png'
        },
        '1F3FD-1F3FF': {
          unified: '1F9D1-1F3FD-200D-1F91D-200D-1F9D1-1F3FF',
          image: '1f9d1-1f3fd-200d-1f91d-200d-1f9d1-1f3ff.png',
          sheet_x: 46,
          sheet_y: 53,
          image_url: '1f9d1-1f3fd-200d-1f91d-200d-1f9d1-1f3ff.png'
        },
        '1F3FE-1F3FB': {
          unified: '1F9D1-1F3FE-200D-1F91D-200D-1F9D1-1F3FB',
          image: '1f9d1-1f3fe-200d-1f91d-200d-1f9d1-1f3fb.png',
          sheet_x: 46,
          sheet_y: 54,
          image_url: '1f9d1-1f3fe-200d-1f91d-200d-1f9d1-1f3fb.png'
        },
        '1F3FE-1F3FC': {
          unified: '1F9D1-1F3FE-200D-1F91D-200D-1F9D1-1F3FC',
          image: '1f9d1-1f3fe-200d-1f91d-200d-1f9d1-1f3fc.png',
          sheet_x: 46,
          sheet_y: 55,
          image_url: '1f9d1-1f3fe-200d-1f91d-200d-1f9d1-1f3fc.png'
        },
        '1F3FE-1F3FD': {
          unified: '1F9D1-1F3FE-200D-1F91D-200D-1F9D1-1F3FD',
          image: '1f9d1-1f3fe-200d-1f91d-200d-1f9d1-1f3fd.png',
          sheet_x: 46,
          sheet_y: 56,
          image_url: '1f9d1-1f3fe-200d-1f91d-200d-1f9d1-1f3fd.png'
        },
        '1F3FE-1F3FE': {
          unified: '1F9D1-1F3FE-200D-1F91D-200D-1F9D1-1F3FE',
          image: '1f9d1-1f3fe-200d-1f91d-200d-1f9d1-1f3fe.png',
          sheet_x: 47,
          sheet_y: 0,
          image_url: '1f9d1-1f3fe-200d-1f91d-200d-1f9d1-1f3fe.png'
        },
        '1F3FE-1F3FF': {
          unified: '1F9D1-1F3FE-200D-1F91D-200D-1F9D1-1F3FF',
          image: '1f9d1-1f3fe-200d-1f91d-200d-1f9d1-1f3ff.png',
          sheet_x: 47,
          sheet_y: 1,
          image_url: '1f9d1-1f3fe-200d-1f91d-200d-1f9d1-1f3ff.png'
        },
        '1F3FF-1F3FB': {
          unified: '1F9D1-1F3FF-200D-1F91D-200D-1F9D1-1F3FB',
          image: '1f9d1-1f3ff-200d-1f91d-200d-1f9d1-1f3fb.png',
          sheet_x: 47,
          sheet_y: 2,
          image_url: '1f9d1-1f3ff-200d-1f91d-200d-1f9d1-1f3fb.png'
        },
        '1F3FF-1F3FC': {
          unified: '1F9D1-1F3FF-200D-1F91D-200D-1F9D1-1F3FC',
          image: '1f9d1-1f3ff-200d-1f91d-200d-1f9d1-1f3fc.png',
          sheet_x: 47,
          sheet_y: 3,
          image_url: '1f9d1-1f3ff-200d-1f91d-200d-1f9d1-1f3fc.png'
        },
        '1F3FF-1F3FD': {
          unified: '1F9D1-1F3FF-200D-1F91D-200D-1F9D1-1F3FD',
          image: '1f9d1-1f3ff-200d-1f91d-200d-1f9d1-1f3fd.png',
          sheet_x: 47,
          sheet_y: 4,
          image_url: '1f9d1-1f3ff-200d-1f91d-200d-1f9d1-1f3fd.png'
        },
        '1F3FF-1F3FE': {
          unified: '1F9D1-1F3FF-200D-1F91D-200D-1F9D1-1F3FE',
          image: '1f9d1-1f3ff-200d-1f91d-200d-1f9d1-1f3fe.png',
          sheet_x: 47,
          sheet_y: 5,
          image_url: '1f9d1-1f3ff-200d-1f91d-200d-1f9d1-1f3fe.png'
        },
        '1F3FF-1F3FF': {
          unified: '1F9D1-1F3FF-200D-1F91D-200D-1F9D1-1F3FF',
          image: '1f9d1-1f3ff-200d-1f91d-200d-1f9d1-1f3ff.png',
          sheet_x: 47,
          sheet_y: 6,
          has_img_apple: true,
          has_img_google: true,
          has_img_twitter: true,
          has_img_facebook: true,
          image_url: '1f9d1-1f3ff-200d-1f91d-200d-1f9d1-1f3ff.png'
        }
      },
      char: '🧑‍🤝‍🧑',
      image_url: '1f9d1-200d-1f91d-200d-1f9d1.png'
    }
    const skinTone = 'skin-tone-6'
    const skin6 = normalEmoji.getEmojiByName(skinTone)

    if(skin6 == null || emoji.skin_variations == null) {
      throw new Error('skin6 is null')
    }

    expect(normalEmoji.getSkinInfo((emoji as never) as Emoji, skinTone)).toEqual(
      expect.objectContaining({
        unified: '1F9D1-200D-1F91D-200D-1F9D1',
        short_name: 'skin-tone-6',
        image_url: '1f9d1-1f3ff-200d-1f91d-200d-1f9d1-1f3ff.png'
      })
    )
  })

  it('getSkinInfo returns an emoji object with skintone', () => {
    const emoji = normalEmoji.getEmojiByName('smile')
    if (emoji != null) {
      expect(normalEmoji.getSkinInfo(emoji, 'skin-tone-5')).toEqual(
        expect.objectContaining({
        image_url: '1f604.png',
        short_name: 'skin-tone-5',
        unified: '1F604'
      })
      )
      return
    }
    fail()
  })
})
