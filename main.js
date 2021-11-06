import './style.css'
import Split from 'split-grid' // Split Grid
import { encode, decode } from 'js-base64' // Codificar Base64 para que no peten los emojis

/* Recuperar elementos del HTML con querySelector */
const $ = selector => document.querySelector(selector)

Split({
  columnGutters: [{
      track: 1,
      element: $('.gutter-col-1'),
  }],
  rowGutters: [{
      track: 1,
      element: $('.gutter-row-1'),
  }]
})

const $js = $('#js')
const $css = $('#css')
const $html = $('#html')

$js.addEventListener('input', update)
$css.addEventListener('input', update)
$html.addEventListener('input', update)

function init(){
  const { pathname } = window.location
  
  const [rawHtml, rawCss, rawJs] = pathname.slice(1).split('%7C')

  const html = decode(rawHtml)
  const css = decode(rawCss)
  const js = decode(rawJs)

  // Decode Base64
  $html.value = html
  $css.value = css
  $js.value = js

  const htmlForPreview = createHtml({html,css,js})
  $('iframe').setAttribute('srcdoc', htmlForPreview)
}

function update() {
  const html = $html.value
  const css = $css.value
  const js = $js.value

  // Code Base 64
  const hashedCode = `${encode(html)}|${encode(css)}|${encode(js)}`
  window.history.replaceState(null, null, `${hashedCode}`)

  const htmlForPreview = createHtml({html,css,js})
  $('iframe').setAttribute('srcdoc', htmlForPreview)
}

const createHtml = ({html, js, css}) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script>
        ${js}
        </script>
      </body>
    </html>
  `
}

init()