import { UniverseEra } from '../types/Timeline.type'

export function mapEras(rawEras: any[], Icons: any, Cpu: any): UniverseEra[] {
  return (rawEras || []).map((e: any) => ({
    ...e,
    icon: (Icons as any)[e.icon] || Cpu
  })) as UniverseEra[]
}
