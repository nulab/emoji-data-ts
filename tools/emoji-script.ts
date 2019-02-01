const fs = require("fs");
const path = require("path");
const pack = require("../package.json");
const emojiRawData = require("emoji-datasource-apple/emoji.json");

const emojiVersion = pack.devDependencies["emoji-datasource-apple"];

function findImage(vendorName: string, image: string): string {
    const emojiPath = path.resolve(__dirname, "..",  "node_modules", `emoji-datasource-${vendorName}`, "img", vendorName, "64", image);
    if (fs.existsSync(emojiPath)){
        return emojiPath;
    }

    return findImage("google", image);
}

function updateImage(emojis: any[]) {
    emojis.forEach((emoji: any) => {
        const emojiPath = findImage("apple", emoji.image);
        const inStr = fs.createReadStream(emojiPath);
        const dir = path.resolve(__dirname, "..", "src", "emoji", emojiVersion);
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        const outStr = fs.createWriteStream(path.resolve(dir, emoji.image));

        inStr.pipe(outStr);
	})
	
	const inStr = fs.createReadStream(path.resolve(__dirname, "..",  "node_modules", "emoji-datasource-apple", "img", "apple", "sheets-256", "64.png"));
	const dir = path.resolve(__dirname, "..", "src", "emoji", emojiVersion);

	const outStr = fs.createWriteStream(path.resolve(dir, "64.png"));
	inStr.pipe(outStr);
}

const convert = function(unicode: string) {
    if (unicode.indexOf("-") > -1) {
        const parts = [];
        const s = unicode.split("-");
        for (const str of s) {
			const part = parseInt(str, 16);
			let charCode = "";
            if (part >= 0x10000 && part <= 0x10ffff) {
                const hi = Math.floor((part - 0x10000) / 0x400) + 0xd800;
                const lo = ((part - 0x10000) % 0x400) + 0xdc00;
                charCode = String.fromCharCode(hi) + String.fromCharCode(lo);
            } else {
                charCode = String.fromCharCode(part);
            }
            parts.push(charCode);
        }
        return parts.join("");
    } else {
        const s = parseInt(unicode, 16);
        if (s >= 0x10000 && s <= 0x10ffff) {
            const hi = Math.floor((s - 0x10000) / 0x400) + 0xd800;
            const lo = ((s - 0x10000) % 0x400) + 0xdc00;
            return String.fromCharCode(hi) + String.fromCharCode(lo);
        } else {
            return String.fromCharCode(s);
        }
    }
};

const unnecessaryProperties = [
    "text",
    "texts",
    "sort_order",
    "added_in",
    "has_img_apple",
    "has_img_google",
    "has_img_twitter",
    "has_img_facebook",
    "has_img_messenger",
    "non_qualified",
    "docomo",
    "au",
    "softbank",
    "google"
];

function updateEmojiData() {
    const emojis: any[] = emojiRawData.map((a: any) => {
        a.char = convert(a.unified);
        for (const key in a) {
            if (unnecessaryProperties.indexOf(key) > -1) {
                a[key] = null;
                delete a[key];
            }
        }
        return a;
    });
	const dir = path.resolve(__dirname, "..", "src", "emoji", emojiVersion);

	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}

    fs.writeFileSync(`src/emoji/${emojiVersion}/emoji.json`, JSON.stringify(emojis, null, 2));

    return emojis;
}

function main() {
    const emojis = updateEmojiData();
    updateImage(emojis)
}

main()