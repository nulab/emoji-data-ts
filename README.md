# Emoji data helper written in TypeScript

This project is helper functions for [emoji-data](https://github.com/iamcal/emoji-data)

# Usage 

```
npm install -save emoji-data-ts
```

```ts
const emoji = new EmojiData()
emoji.getImageData("smile") 
=> {imageUrl: "1f34a.png", sheetSizeX: 5200, sheetSizeY: 5200, x: 13.72549019607843, y: 23.52941176470588}
```

Example is [here](https://nulab.github.io/emoji-data-ts/)

# How to upgrade emoji data

1. Upgrade package.json below part which is defined current emoji-datasource version

```
"dependencies": {
"emoji-datasource-apple": "7.0.2",
"emoji-datasource-google": "7.0.2"
}
```

2. Run `npm run emoji-build` which generates a new emoji.json used in emoji-data-ts
3. Change currentVersion in emoji-data-ts.ts corresponding to the emoji-datasource's version
```ts
const currentVersion = '7.0.2'
```

4. Adjust sheetColumns and sheetRows to fit the emoji-datasource's image

```
export const sheetColumns = 60
export const sheetRows = 60
```