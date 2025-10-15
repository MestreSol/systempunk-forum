import { Technology } from '@/types/Technology.type'
import {
  Code,
  Database,
  Gamepad2,
  Headphones,
  Monitor,
  Palette
} from 'lucide-react'

export const technologies: Technology[] = [
  { name: 'React/Next.js', icon: Monitor, category: 'Frontend' },
  { name: 'Node.js', icon: Code, category: 'Backend' },
  { name: 'PostgreSQL', icon: Database, category: 'Database' },
  { name: 'Unity', icon: Gamepad2, category: 'Game Engine' },
  { name: 'Blender', icon: Palette, category: '3D/Art' },
  { name: 'FMOD', icon: Headphones, category: 'Audio' }
]
