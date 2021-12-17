import { categoriesData, Emoji, EmojiData, EmojiImage } from 'emoji-data-ts'
import * as React from 'react'

enum Vendor {
  Apple = "apple",
  Google = "google",
  Twitter = "twitter",
  Facebook = "facebook"
};

class App extends React.Component<{}, { filteredEmojiData: Emoji[], vendor: Vendor }> {
  private emoji: EmojiData;
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      filteredEmojiData: [],
      vendor: Vendor.Apple
    }
    this.emoji = new EmojiData()
  }
  public componentDidMount() {
    this.setState({
      filteredEmojiData: []
    })
  }


  public render() {
    return (
      <div className="App">
        <div>
          Emoji version {this.emoji.currentVersion}
        </div>
        <div>
          Vendor
          <select onChange={this.onChangeVendor}>
            {
              Object.keys(Vendor).map(key => <option value={Vendor[key]} selected={this.state.vendor === Vendor[key]} key={key}>{key}</option>)
            }
          </select>
        </div>
        <div>
          Filter
        <input type="text" onChange={
            // tslint:disable-next-line:jsx-no-lambda
            (e) => this.onChangeFilter(e)
          } />
        </div>
        <div>
          {this.state.filteredEmojiData.map((a, i) => {
            const emojiImage = this.emoji.getImageData(a.short_name)

            if (emojiImage == null) {
              return <span />
            }
            return <EmojiImg key={i} emoji={emojiImage} tooltip={a.short_name} emojiVersion={this.emoji.currentVersion} vendor={this.state.vendor} />
          })}
        </div>
        <div className="emoji-picker">
          {categoriesData.map((value, index) => {
            return (
              <div key={index}>
                <h2>---{value}---</h2>
                {(() => {
                  const emojis = this.emoji.emojiCategoryLookUp.get(value)
                  if (emojis != null) {
                    return emojis.map((a, i) => {
                      const position = this.emoji.getImageData(a.short_name)
                      if (position == null) {
                        return <span />
                      }
                      return <EmojiImg key={i} emoji={position} tooltip={a.short_name} emojiVersion={this.emoji.currentVersion} vendor={this.state.vendor} />
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
  private onChangeFilter(e: React.FormEvent<HTMLInputElement>) {
    const emojis = e.currentTarget.value.length === 0 ? [] : this.emoji.searchEmoji(e.currentTarget.value, 10)
    this.setState({
      filteredEmojiData: emojis
    })
  }

  private onChangeVendor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ vendor: e.target.value as Vendor });
  }
}

function EmojiImg({ emoji, tooltip, emojiVersion, vendor }: { emoji: EmojiImage, tooltip: string, vendor: Vendor, emojiVersion: string }) {
  return (<span
    style={{
      backgroundImage:
        `url(https://unpkg.com/emoji-datasource-${vendor}@${emojiVersion}/img/${vendor}/sheets-256/64.png)`,
      backgroundPosition: `${emoji.x}% ${emoji.y}%`,
      backgroundSize: `${emoji.sheetSizeX}% ${emoji.sheetSizeY}%`,
      display: 'inline-block',
      height: '24px',
      width: '24px',
    }}
    title={tooltip}
  />)
}

export default App
