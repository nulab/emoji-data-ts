import { categoriesData, EmojiData } from 'emoji-data-ts'
import * as React from 'react'

class App extends React.Component {
  public render() {
    const emoji = new EmojiData()
    return (
      <div className="App">
        <div className="emoji-picker">
          {categoriesData.map((value, index) => {
            return (
              <div key={index}>
                <h2>---{value}---</h2>
                {(() => {
                  const emojis = emoji.emojiCategoryLookUp.get(value)
                  if (emojis != null) {
                    return emojis.map((a, i) => {
                      const position = emoji.getImageData(a.short_name)
                      if(position == null) {
                        return <span/>
                      }
                      console.log(position)
                      return (
                        <span
                          key={i}
                          style={{
                            backgroundImage:
                              'url(https://unpkg.com/emoji-datasource-apple@4.1.0/img/apple/sheets-256/64.png)',
                            backgroundPosition: `${position.x}% ${position.y}%`,
                            backgroundSize: `${position.sheetSizeX}% ${position.sheetSizeY}%`,
                            display: 'inline-block',
                            height: '24px',
                            width: '24px'
                          }}
                        />
                      )
                    })
                  }
                  return <span />
                })()}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default App
