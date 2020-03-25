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

# Upgrade npm module

You should add the dist files which you make it build in local.

```ts
yarn build
```

```ts
git tag -a vx.x.x
git push origin tags/vx.x.x
npm publish ./
```