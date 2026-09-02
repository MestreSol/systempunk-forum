#!/usr/bin/env node
// One-off image optimization pass — NOT part of the build pipeline, just run
// once to shrink a handful of oversized source images that are served
// unoptimized (raw CSS background-image / plain <img>, no next/image).
//
// Usage: node scripts/optimize-images.mjs

import sharp from 'sharp'
import { readdir, stat, unlink, rename, mkdir, rmdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url)) + '/..'
const publicDir = path.join(root, 'public')

async function sizeOf(file) {
  try {
    return (await stat(file)).size
  } catch {
    return 0
  }
}

function fmt(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// A dev server watching public/ (Next.js file watcher, antivirus, search
// indexer) can hold a brief lock on a file right after it changes — retry
// the swap a few times with backoff instead of failing the whole run.
async function withRetry(fn, attempts = 5, delayMs = 300) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn()
    } catch (err) {
      if (i === attempts - 1) throw err
      await sleep(delayMs * (i + 1))
    }
  }
}

async function convertToWebp(srcName, destName, maxWidth, quality) {
  const src = path.join(publicDir, srcName)
  const dest = path.join(publicDir, destName)
  const before = await sizeOf(src)

  await sharp(src)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality })
    .toFile(dest)

  const after = await sizeOf(dest)
  console.log(`  ${srcName} -> ${destName}: ${fmt(before)} -> ${fmt(after)}`)
}

// Renders every file's optimized version into a scratch subfolder first
// (never reading and writing the same path at once), then — once sharp has
// fully finished with all of them and released its file handles — swaps
// each one into place. Doing the swap as a separate final pass avoids
// Windows EBUSY/EPERM errors from trying to unlink/rename a file sharp (or
// its native decoder) still has a handle open on.
async function recompressDirInPlace(dir, maxWidth, quality) {
  const files = (await readdir(dir)).filter((f) => f.toLowerCase().endsWith('.webp'))
  const scratchDir = path.join(dir, '.optimize-tmp')
  await mkdir(scratchDir, { recursive: true })

  const results = []
  for (const file of files) {
    const original = path.join(dir, file)
    const before = await sizeOf(original)
    const scratchPath = path.join(scratchDir, file)

    await sharp(original)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality })
      .toFile(scratchPath)

    const after = await sizeOf(scratchPath)
    results.push({ file, original, scratchPath, before, after })
  }

  const failed = []
  for (const r of results) {
    if (r.after > 0 && r.after < r.before) {
      try {
        await withRetry(async () => {
          await unlink(r.original)
          await rename(r.scratchPath, r.original)
        }, 8, 400)
        console.log(`  ${r.file}: ${fmt(r.before)} -> ${fmt(r.after)}`)
      } catch (err) {
        // A dev server watching public/ can hold a file locked longer than
        // any reasonable retry budget — don't let one stuck file abort the
        // other 50+. Leaves the scratch copy behind so this file can be
        // swapped in by hand or by re-running the script.
        console.log(`  ${r.file}: SKIPPED (still locked: ${err.code || err.message})`)
        failed.push(r.file)
      }
    } else {
      await unlink(r.scratchPath).catch(() => {})
      console.log(`  ${r.file}: already optimal (${fmt(r.before)}), skipped`)
    }
  }

  await rmdir(scratchDir).catch(() => {})
  return failed
}

async function main() {
  console.log('Toolbar / hero images (PNG -> WebP, resized):')
  await convertToWebp('systempunkBrand.png', 'systempunkBrand.webp', 800, 82)
  await convertToWebp('MON.png', 'MON.webp', 1000, 82)
  await convertToWebp('RR.png', 'RR.webp', 1000, 82)
  await convertToWebp('Trailer.png', 'Trailer.webp', 1920, 78)

  // Corrupted/truncated pre-existing file, unreferenced anywhere — remove it
  // instead of leaving stale dead weight now that Trailer.webp exists.
  const brokenAvif = path.join(publicDir, 'Trailer.avif')
  if (await sizeOf(brokenAvif)) {
    await unlink(brokenAvif)
    console.log('  removed corrupted, unused Trailer.avif')
  }

  console.log('\nTimeline era backgrounds (WebP, recompressed in place):')
  const failed = await recompressDirInPlace(path.join(publicDir, 'eras'), 1920, 78)

  if (failed.length > 0) {
    console.log(`\n⚠ ${failed.length} file(s) stayed locked and were skipped: ${failed.join(', ')}`)
    console.log('  Re-run this script (idempotent) to pick them up once nothing else has them open.')
  }

  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
