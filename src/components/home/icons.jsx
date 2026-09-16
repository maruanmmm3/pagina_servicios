import { Clock, RefreshCw, Code, TrendingUp, Megaphone, Settings, Zap, Users } from 'lucide-react'

export const ICONS = {
  clock: Clock,
  'refresh-cw': RefreshCw,
  code: Code,
  'trending-up': TrendingUp,
  megaphone: Megaphone,
  settings: Settings,
  zap: Zap,
  users: Users,
}

export const ICON_OPTIONS = Object.keys(ICONS)

export function DynamicIcon({ name, ...props }) {
  const IconComponent = ICONS[name] ?? Clock
  return <IconComponent {...props} />
}
