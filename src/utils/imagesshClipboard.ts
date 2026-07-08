import { readFileSync } from 'fs'
import { homedir } from 'os'
import { join } from 'path'

/**
 * Client for an imagessh clipboard tunnel (https://github.com/neonn0d/imagessh).
 *
 * When you ssh into a box, the clipboard with your screenshot lives on your
 * LOCAL computer. imagessh runs a small HTTP server there and forwards it to
 * 127.0.0.1:8377 on the remote via `ssh -R`, so this machine can read the
 * image you just copied. This client lets twin paste images over ssh natively
 * — no xclip/wl-paste shims needed on the server.
 *
 * Endpoints: GET /types (mime list), GET /data?type=MIME (raw bytes).
 * Auth: token from ~/.imagessh/token, sent as X-Imagessh-Token.
 * Everything degrades to null fast when no tunnel is up (connection refused
 * on localhost is immediate).
 */

const DEFAULT_PORT = 8377

function baseUrl(): string {
  const port = Number(process.env.IMAGESSH_PORT) || DEFAULT_PORT
  return `http://127.0.0.1:${port}`
}

function readToken(): string {
  try {
    return readFileSync(join(homedir(), '.imagessh', 'token'), 'utf8').trim()
  } catch {
    return ''
  }
}

async function get(path: string, timeoutMs: number): Promise<Response | null> {
  try {
    const res = await fetch(`${baseUrl()}${path}`, {
      headers: { 'X-Imagessh-Token': readToken() },
      signal: AbortSignal.timeout(timeoutMs),
    })
    return res.ok ? res : null
  } catch {
    return null
  }
}

export type ImagesshClipboardImage = {
  buffer: Buffer
  mimeType: string
}

/**
 * Fetch the image on the local computer's clipboard through the tunnel.
 * Returns null when there is no tunnel, no image, or on any error.
 */
export async function getImagesshClipboardImage(
  imageMimeTypes: string[],
): Promise<ImagesshClipboardImage | null> {
  const typesRes = await get('/types', 1500)
  if (!typesRes) {
    return null
  }
  const types = (await typesRes.text()).split(/\s+/).filter(Boolean)
  const mimeType = imageMimeTypes.find(m => types.includes(m))
  if (!mimeType) {
    return null
  }
  // Images can be several MB over a forwarded connection — allow more time.
  const dataRes = await get(`/data?type=${encodeURIComponent(mimeType)}`, 15000)
  if (!dataRes) {
    return null
  }
  const buffer = Buffer.from(await dataRes.arrayBuffer())
  return buffer.length > 0 ? { buffer, mimeType } : null
}
