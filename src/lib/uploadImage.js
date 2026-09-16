import imageCompression from 'browser-image-compression'
import { supabase } from './supabaseClient'

const BUCKET = 'sp-site-assets'

export async function uploadImage(file, path) {
  const compressed = await imageCompression(file, {
    maxWidthOrHeight: 640,
    maxSizeMB: 0.3,
    useWebWorker: true,
    fileType: 'image/webp',
  })

  const { error } = await supabase.storage.from(BUCKET).upload(path, compressed, {
    upsert: true,
    contentType: 'image/webp',
  })

  if (error) return { error }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return { url: `${data.publicUrl}?v=${Date.now()}` }
}
