import { Readable } from 'stream'
import { render } from '@lit-labs/ssr/lib/render-with-global-dom-shim.js'
import tpl from '../index.html.js'

const readStream = (stream, encoding = 'utf8') => {
  stream.setEncoding(encoding)
  return new Promise((resolve, reject) => {
    let data = ''
    stream.on('data', (chunk) => {
      data += chunk
    })
    stream.on('end', () => {
      resolve(data)
    })
    stream.on('error', (error) => reject(error))
  })
}

export async function handler(event) {
  const { name, count } = event?.queryStringParameters || {}
  const ssrResult = render(
    tpl({ name: name ?? 'SST Demo', count: count ?? '100' })
  )
  const stream = Readable.from(ssrResult)
  const body = await readStream(stream)

  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8',
    },
    body,
  }
}