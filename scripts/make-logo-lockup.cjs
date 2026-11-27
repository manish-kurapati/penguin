const sharp = require('sharp')
const source = 'C:/Users/manis/Downloads/7ad6d8c2-5ef9-4e01-a82b-96de0a1460ec.jpeg'

async function transparentCrop(left, top, width, height, outputWidth) {
  const { data, info } = await sharp(source).extract({ left, top, width, height }).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  for (let i = 0; i < data.length; i += 4) {
    const darkest = Math.min(data[i], data[i + 1], data[i + 2])
    data[i + 3] = Math.max(0, Math.min(255, (238 - darkest) * 13))
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).resize({ width: outputWidth }).png().toBuffer()
}

async function main() {
  const mark = await transparentCrop(565, 225, 275, 240, 69)
  const wordmark = await transparentCrop(240, 500, 930, 108, 265)
  const tagline = await transparentCrop(415, 636, 580, 46, 185)
  await sharp({ create: { width: 350, height: 78, channels: 4, background: '#00000000' } })
    .composite([
      { input: mark, left: 1, top: 5 },
      { input: wordmark, left: 75, top: 13 },
      { input: tagline, left: 105, top: 51 }
    ])
    .png().toFile('public/little-penguin-logo.png')
}
main().catch(error => { console.error(error); process.exitCode = 1 })
