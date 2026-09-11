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
    <div className="relative z-50 overflow-hidden bg-foreground/95 text-background">
      <div className="flex w-max topbar-marquee">
        {loop.map((message, index) => {
          const Icon = message.icon
          return (
            <div
              key={index}
              className="flex shrink-0 items-center gap-2.5 border-r border-background/10 px-8 py-2.5 text-xs font-medium"
              aria-hidden={index >= messages.length}
            >
              <Icon className="h-4 w-4 shrink-0 opacity-80" />
              <span>{message.text}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
