import { Truck, Sparkles, Tag, Star } from 'lucide-react'

const messages = [
  { icon: Truck, text: 'Free shipping on orders over €50' },
  { icon: Tag, text: '20% off with code SUMMER20' },
  { icon: Sparkles, text: 'New arrivals every week' },
  { icon: Star, text: 'Active loyalty program — 1 pt per €1 spent' },
]

export function Topbar() {
  // Duplicate the list so the marquee can loop seamlessly (translateX -50%).
  const loop = [...messages, ...messages]

  return (
    <div className="relative z-50 overflow-hidden bg-primary text-primary-foreground">
      <div className="flex w-max topbar-marquee">
        {loop.map((message, index) => {
          const Icon = message.icon
          return (
            <div
              key={index}
              className="flex shrink-0 items-center gap-2 px-6 py-2 text-xs font-medium uppercase tracking-wider"
              aria-hidden={index >= messages.length}
            >
              <Icon className="h-3.5 w-3.5 shrink-0 opacity-90" />
              <span>{message.text}</span>
              <span className="ml-6 opacity-40">•</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
