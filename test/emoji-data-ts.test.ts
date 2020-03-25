import { EmojiData } from '../src/emoji-data-ts'
import e from '../src/emoji.json'

describe('Dummy test', () => {
  const normalEmoji = new EmojiData()
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
      y: 76.47058823529412
    })
  })

  it('getImageData returns correct data', () => {
    expect(normalEmoji.getImageData('smile')).toEqual({
      imageUrl: '1f604.png',
      sheetSizeX: 5200,
      sheetSizeY: 5200,
      x: 58.8235294117647,
      y: 76.47058823529412
    })
  })

  it('getImageData returns correct data with skintone', () => {
    expect(normalEmoji.getImageData('spock-hand::skin-tone-4')).toEqual({
      imageUrl: '1f596-1f3fd.png',
      sheetSizeX: 5200,
      sheetSizeY: 5200,
      x: 58.8235294117647,
      y: 11.76470588235294
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
      'sa',
      'ski',
      'sob',
      'six',
      'sos',
      'sari',
      'soon',
      'sled',
      'stew',
      'salt'
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
        sheet_x: 30,
        sheet_y: 39,
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
          non_qualified: null,
          image: '1f9d1-1f3fb-200d-1f91d-200d-1f9d1-1f3fb.png',
          sheet_x: 46,
          sheet_y: 39,
          added_in: '12.1',
          has_img_apple: true,
          has_img_google: true,
          has_img_twitter: true,
          has_img_facebook: true,
          image_url: '1f9d1-1f3fb-200d-1f91d-200d-1f9d1-1f3fb.png'
        },
        '1F3FB-1F3FC': {
          unified: '1F9D1-1F3FB-200D-1F91D-200D-1F9D1-1F3FC',
          non_qualified: null,
          image: '1f9d1-1f3fb-200d-1f91d-200d-1f9d1-1f3fc.png',
          sheet_x: 46,
          sheet_y: 40,
          added_in: '12.1',
          has_img_apple: true,
          has_img_google: false,
          has_img_twitter: true,
          has_img_facebook: false,
          image_url: '1f9d1-1f3fb-200d-1f91d-200d-1f9d1-1f3fc.png'
        },
        '1F3FB-1F3FD': {
          unified: '1F9D1-1F3FB-200D-1F91D-200D-1F9D1-1F3FD',
          non_qualified: null,
          image: '1f9d1-1f3fb-200d-1f91d-200d-1f9d1-1f3fd.png',
          sheet_x: 46,
          sheet_y: 41,
          added_in: '12.1',
          has_img_apple: true,
          has_img_google: false,
          has_img_twitter: true,
          has_img_facebook: false,
          image_url: '1f9d1-1f3fb-200d-1f91d-200d-1f9d1-1f3fd.png'
        },
        '1F3FB-1F3FE': {
          unified: '1F9D1-1F3FB-200D-1F91D-200D-1F9D1-1F3FE',
          non_qualified: null,
          image: '1f9d1-1f3fb-200d-1f91d-200d-1f9d1-1f3fe.png',
          sheet_x: 46,
          sheet_y: 42,
          added_in: '12.1',
          has_img_apple: true,
          has_img_google: false,
          has_img_twitter: true,
          has_img_facebook: false,
          image_url: '1f9d1-1f3fb-200d-1f91d-200d-1f9d1-1f3fe.png'
        },
        '1F3FB-1F3FF': {
          unified: '1F9D1-1F3FB-200D-1F91D-200D-1F9D1-1F3FF',
          non_qualified: null,
          image: '1f9d1-1f3fb-200d-1f91d-200d-1f9d1-1f3ff.png',
          sheet_x: 46,
          sheet_y: 43,
          added_in: '12.1',
          has_img_apple: true,
          has_img_google: false,
          has_img_twitter: true,
          has_img_facebook: false,
          image_url: '1f9d1-1f3fb-200d-1f91d-200d-1f9d1-1f3ff.png'
        },
        '1F3FC-1F3FB': {
          unified: '1F9D1-1F3FC-200D-1F91D-200D-1F9D1-1F3FB',
          non_qualified: null,
          image: '1f9d1-1f3fc-200d-1f91d-200d-1f9d1-1f3fb.png',
          sheet_x: 46,
          sheet_y: 44,
          added_in: '12.1',
          has_img_apple: true,
          has_img_google: true,
          has_img_twitter: true,
          has_img_facebook: true,
          image_url: '1f9d1-1f3fc-200d-1f91d-200d-1f9d1-1f3fb.png'
        },
        '1F3FC-1F3FC': {
          unified: '1F9D1-1F3FC-200D-1F91D-200D-1F9D1-1F3FC',
          non_qualified: null,
          image: '1f9d1-1f3fc-200d-1f91d-200d-1f9d1-1f3fc.png',
          sheet_x: 46,
          sheet_y: 45,
          added_in: '12.1',
          has_img_apple: true,
          has_img_google: true,
          has_img_twitter: true,
          has_img_facebook: true,
          image_url: '1f9d1-1f3fc-200d-1f91d-200d-1f9d1-1f3fc.png'
        },
        '1F3FC-1F3FD': {
          unified: '1F9D1-1F3FC-200D-1F91D-200D-1F9D1-1F3FD',
          non_qualified: null,
          image: '1f9d1-1f3fc-200d-1f91d-200d-1f9d1-1f3fd.png',
          sheet_x: 46,
          sheet_y: 46,
          added_in: '12.1',
          has_img_apple: true,
          has_img_google: false,
          has_img_twitter: true,
          has_img_facebook: false,
          image_url: '1f9d1-1f3fc-200d-1f91d-200d-1f9d1-1f3fd.png'
        },
        '1F3FC-1F3FE': {
          unified: '1F9D1-1F3FC-200D-1F91D-200D-1F9D1-1F3FE',
          non_qualified: null,
          image: '1f9d1-1f3fc-200d-1f91d-200d-1f9d1-1f3fe.png',
          sheet_x: 46,
          sheet_y: 47,
          added_in: '12.1',
          has_img_apple: true,
          has_img_google: false,
          has_img_twitter: true,
          has_img_facebook: false,
          image_url: '1f9d1-1f3fc-200d-1f91d-200d-1f9d1-1f3fe.png'
        },
        '1F3FC-1F3FF': {
          unified: '1F9D1-1F3FC-200D-1F91D-200D-1F9D1-1F3FF',
          non_qualified: null,
          image: '1f9d1-1f3fc-200d-1f91d-200d-1f9d1-1f3ff.png',
          sheet_x: 46,
          sheet_y: 48,
          added_in: '12.1',
          has_img_apple: true,
          has_img_google: false,
          has_img_twitter: true,
          has_img_facebook: false,
          image_url: '1f9d1-1f3fc-200d-1f91d-200d-1f9d1-1f3ff.png'
        },
        '1F3FD-1F3FB': {
          unified: '1F9D1-1F3FD-200D-1F91D-200D-1F9D1-1F3FB',
          non_qualified: null,
          image: '1f9d1-1f3fd-200d-1f91d-200d-1f9d1-1f3fb.png',
          sheet_x: 46,
          sheet_y: 49,
          added_in: '12.1',
          has_img_apple: true,
          has_img_google: true,
          has_img_twitter: true,
          has_img_facebook: true,
          image_url: '1f9d1-1f3fd-200d-1f91d-200d-1f9d1-1f3fb.png'
        },
        '1F3FD-1F3FC': {
          unified: '1F9D1-1F3FD-200D-1F91D-200D-1F9D1-1F3FC',
          non_qualified: null,
          image: '1f9d1-1f3fd-200d-1f91d-200d-1f9d1-1f3fc.png',
          sheet_x: 46,
          sheet_y: 50,
          added_in: '12.1',
          has_img_apple: true,
          has_img_google: true,
          has_img_twitter: true,
          has_img_facebook: true,
          image_url: '1f9d1-1f3fd-200d-1f91d-200d-1f9d1-1f3fc.png'
        },
        '1F3FD-1F3FD': {
          unified: '1F9D1-1F3FD-200D-1F91D-200D-1F9D1-1F3FD',
          non_qualified: null,
          image: '1f9d1-1f3fd-200d-1f91d-200d-1f9d1-1f3fd.png',
          sheet_x: 46,
          sheet_y: 51,
          added_in: '12.1',
          has_img_apple: true,
          has_img_google: true,
          has_img_twitter: true,
          has_img_facebook: true,
          image_url: '1f9d1-1f3fd-200d-1f91d-200d-1f9d1-1f3fd.png'
        },
        '1F3FD-1F3FE': {
          unified: '1F9D1-1F3FD-200D-1F91D-200D-1F9D1-1F3FE',
          non_qualified: null,
          image: '1f9d1-1f3fd-200d-1f91d-200d-1f9d1-1f3fe.png',
          sheet_x: 46,
          sheet_y: 52,
          added_in: '12.1',
          has_img_apple: true,
          has_img_google: false,
          has_img_twitter: true,
          has_img_facebook: false,
          image_url: '1f9d1-1f3fd-200d-1f91d-200d-1f9d1-1f3fe.png'
        },
        '1F3FD-1F3FF': {
          unified: '1F9D1-1F3FD-200D-1F91D-200D-1F9D1-1F3FF',
          non_qualified: null,
          image: '1f9d1-1f3fd-200d-1f91d-200d-1f9d1-1f3ff.png',
          sheet_x: 46,
          sheet_y: 53,
          added_in: '12.1',
          has_img_apple: true,
          has_img_google: false,
          has_img_twitter: true,
          has_img_facebook: false,
          image_url: '1f9d1-1f3fd-200d-1f91d-200d-1f9d1-1f3ff.png'
        },
        '1F3FE-1F3FB': {
          unified: '1F9D1-1F3FE-200D-1F91D-200D-1F9D1-1F3FB',
          non_qualified: null,
          image: '1f9d1-1f3fe-200d-1f91d-200d-1f9d1-1f3fb.png',
          sheet_x: 46,
          sheet_y: 54,
          added_in: '12.1',
          has_img_apple: true,
          has_img_google: true,
          has_img_twitter: true,
          has_img_facebook: true,
          image_url: '1f9d1-1f3fe-200d-1f91d-200d-1f9d1-1f3fb.png'
        },
        '1F3FE-1F3FC': {
          unified: '1F9D1-1F3FE-200D-1F91D-200D-1F9D1-1F3FC',
          non_qualified: null,
          image: '1f9d1-1f3fe-200d-1f91d-200d-1f9d1-1f3fc.png',
          sheet_x: 46,
          sheet_y: 55,
          added_in: '12.1',
          has_img_apple: true,
          has_img_google: true,
          has_img_twitter: true,
          has_img_facebook: true,
          image_url: '1f9d1-1f3fe-200d-1f91d-200d-1f9d1-1f3fc.png'
        },
        '1F3FE-1F3FD': {
          unified: '1F9D1-1F3FE-200D-1F91D-200D-1F9D1-1F3FD',
          non_qualified: null,
          image: '1f9d1-1f3fe-200d-1f91d-200d-1f9d1-1f3fd.png',
          sheet_x: 46,
          sheet_y: 56,
          added_in: '12.1',
          has_img_apple: true,
          has_img_google: true,
          has_img_twitter: true,
          has_img_facebook: true,
          image_url: '1f9d1-1f3fe-200d-1f91d-200d-1f9d1-1f3fd.png'
        },
        '1F3FE-1F3FE': {
          unified: '1F9D1-1F3FE-200D-1F91D-200D-1F9D1-1F3FE',
          non_qualified: null,
          image: '1f9d1-1f3fe-200d-1f91d-200d-1f9d1-1f3fe.png',
          sheet_x: 47,
          sheet_y: 0,
          added_in: '12.1',
          has_img_apple: true,
          has_img_google: true,
          has_img_twitter: true,
          has_img_facebook: true,
          image_url: '1f9d1-1f3fe-200d-1f91d-200d-1f9d1-1f3fe.png'
        },
        '1F3FE-1F3FF': {
          unified: '1F9D1-1F3FE-200D-1F91D-200D-1F9D1-1F3FF',
          non_qualified: null,
          image: '1f9d1-1f3fe-200d-1f91d-200d-1f9d1-1f3ff.png',
          sheet_x: 47,
          sheet_y: 1,
          added_in: '12.1',
          has_img_apple: true,
          has_img_google: false,
          has_img_twitter: true,
          has_img_facebook: false,
          image_url: '1f9d1-1f3fe-200d-1f91d-200d-1f9d1-1f3ff.png'
        },
        '1F3FF-1F3FB': {
          unified: '1F9D1-1F3FF-200D-1F91D-200D-1F9D1-1F3FB',
          non_qualified: null,
          image: '1f9d1-1f3ff-200d-1f91d-200d-1f9d1-1f3fb.png',
          sheet_x: 47,
          sheet_y: 2,
          added_in: '12.1',
          has_img_apple: true,
          has_img_google: true,
          has_img_twitter: true,
          has_img_facebook: true,
          image_url: '1f9d1-1f3ff-200d-1f91d-200d-1f9d1-1f3fb.png'
        },
        '1F3FF-1F3FC': {
          unified: '1F9D1-1F3FF-200D-1F91D-200D-1F9D1-1F3FC',
          non_qualified: null,
          image: '1f9d1-1f3ff-200d-1f91d-200d-1f9d1-1f3fc.png',
          sheet_x: 47,
          sheet_y: 3,
          added_in: '12.1',
          has_img_apple: true,
          has_img_google: true,
          has_img_twitter: true,
          has_img_facebook: true,
          image_url: '1f9d1-1f3ff-200d-1f91d-200d-1f9d1-1f3fc.png'
        },
        '1F3FF-1F3FD': {
          unified: '1F9D1-1F3FF-200D-1F91D-200D-1F9D1-1F3FD',
          non_qualified: null,
          image: '1f9d1-1f3ff-200d-1f91d-200d-1f9d1-1f3fd.png',
          sheet_x: 47,
          sheet_y: 4,
          added_in: '12.1',
          has_img_apple: true,
          has_img_google: true,
          has_img_twitter: true,
          has_img_facebook: true,
          image_url: '1f9d1-1f3ff-200d-1f91d-200d-1f9d1-1f3fd.png'
        },
        '1F3FF-1F3FE': {
          unified: '1F9D1-1F3FF-200D-1F91D-200D-1F9D1-1F3FE',
          non_qualified: null,
          image: '1f9d1-1f3ff-200d-1f91d-200d-1f9d1-1f3fe.png',
          sheet_x: 47,
          sheet_y: 5,
          added_in: '12.1',
          has_img_apple: true,
          has_img_google: true,
          has_img_twitter: true,
          has_img_facebook: true,
          image_url: '1f9d1-1f3ff-200d-1f91d-200d-1f9d1-1f3fe.png'
        },
        '1F3FF-1F3FF': {
          unified: '1F9D1-1F3FF-200D-1F91D-200D-1F9D1-1F3FF',
          non_qualified: null,
          image: '1f9d1-1f3ff-200d-1f91d-200d-1f9d1-1f3ff.png',
          sheet_x: 47,
          sheet_y: 6,
          added_in: '12.1',
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
    expect(normalEmoji.getSkinInfo(emoji, 'skin-tone-6')).toEqual({
      sheet_x: 92.15686274509804,
      sheet_y: 11.76470588235294,
      unified: '1F9D1-200D-1F91D-200D-1F9D1',
      short_name: 'skin-tone-6',
      image_url: '1f9d1-1f3ff-200d-1f91d-200d-1f9d1-1f3ff.png'
    })
  })

  it('getSkinInfo returns an emoji object with skintone', () => {
    const emoji = normalEmoji.getEmojiByName('smile')
    if (emoji != null) {
      expect(normalEmoji.getSkinInfo(emoji, 'skin-tone-5')).toEqual({
        image_url: '1f604.png',
        sheet_x: 58.8235294117647,
        sheet_y: 76.47058823529412,
        short_name: 'skin-tone-5',
        unified: '1F604'
      })
      return
    }
    fail()
  })
})
