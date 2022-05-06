import { readFile } from 'fs/promises'
import { contentType } from 'mime-types'
import { join, dirname } from 'path'
import { findUp } from 'find-up'

const root = await findUp('sst.json')

export async function handler(event) {
  const {
    pathParameters: { proxy },
  } = event

  const type = contentType(proxy)
  const body = await readFile(join(dirname(root), 'backend', 'components', proxy))
  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': type,
    },
    body: body.toString(),
  }
}
