/**
 * Global brand configuration. Anything a non-developer might need to update
 * (URLs, social channels, contact) lives here.
 */
export const site = {
  name: 'Systempunk',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://systempunk.space').replace(
    /\/$/,
    ''
  ),
  novaUrl: 'https://nova.systempunk.space',
  /** Set once the N.O.V.A. Steam page is live. `null` renders as "soon". */
  novaSteamUrl: null as string | null,
  contactEmail: 'contact@systempunk.space',
  pressEmail: 'press@systempunk.space',
  foundedYear: 2024
}

export type SocialKey = 'discord' | 'youtube' | 'steam' | 'tiktok'

export interface SocialChannel {
  key: SocialKey
  label: string
  /** `null` = channel not public yet; rendered as standby. */
  href: string | null
  handle?: string
}

// TODO: fill in the real channel URLs before launch.
export const socials: SocialChannel[] = [
  { key: 'discord', label: 'Discord', href: 'https://discord.gg/systempunk' },
  { key: 'youtube', label: 'YouTube', href: null },
  { key: 'steam', label: 'Steam', href: site.novaSteamUrl },
  { key: 'tiktok', label: 'TikTok', href: null }
]
