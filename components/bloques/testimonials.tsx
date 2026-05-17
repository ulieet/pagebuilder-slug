"use client"

import { Quote, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface TestimonialItem {
  name: string
  role: string
  review: string
  rating: string | number
  avatar?: string
}

interface BloqueTestimonialsProps {
  data: any
  variant?: "default" | "modern" | "minimal"
}

export function BloqueTestimonials({ data, variant = "default" }: BloqueTestimonialsProps) {
  const title = data.title
  const subtitle = data.description
  const items: TestimonialItem[] = data.items || []

  const bgColor = data.forceWhiteBackground ? "#ffffff" : "var(--color-fondo)"
  const textColor = data.forceWhiteBackground ? "#0f172a" : "var(--color-texto)"
  
  const cardBg = data.forceWhiteBackground ? "#f8fafc" : "rgba(0,0,0,0.03)" 
  const cardBorder = data.forceWhiteBackground ? "transparent" : "rgba(255,255,255,0.1)"

  const renderStars = (rating: string | number) => {
    const count = Number(rating) || 5
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={cn(
              "w-4 h-4", 
              i < count ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
            )} 
          />
        ))}
      </div>
    )
  }

  if (items.length === 0 && !title && !subtitle) return null

  return (
    <section 
        className="py-20 px-4 transition-colors relative overflow-hidden" 
        style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="container mx-auto max-w-6xl">
        
        {(title || subtitle) && (
            <div className={cn("mb-16 text-center max-w-3xl mx-auto space-y-4", variant === "minimal" && "mb-12 text-left md:text-center")}>
                {title && (
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "var(--color-primario)" }}>
                        {title}
                    </h2>
                )}
                {subtitle && (
                    <p className="text-lg opacity-80 leading-relaxed">
                        {subtitle}
                    </p>
                )}
            </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, idx) => {
                
                if (variant === "minimal") {
                    return (
                        <div 
                            key={idx}
                            className="p-8 border flex flex-col h-full rounded-none bg-white transition-colors"
                            style={{ 
                                backgroundColor: data.forceWhiteBackground ? "#ffffff" : "transparent",
                                borderColor: data.forceWhiteBackground ? "#e2e8f0" : "rgba(255,255,255,0.15)", 
                                color: textColor
                            }}
                        >
                            <div className="mb-4 opacity-100">{renderStars(item.rating)}</div>
                            
                            <p className="mb-6 text-sm leading-7 opacity-80 flex-1 font-normal">
                                "{item.review}"
                            </p>
                            
                            <div className="flex items-center gap-3 pt-4 border-t border-dashed" style={{ borderColor: data.forceWhiteBackground ? "#e2e8f0" : "rgba(255,255,255,0.1)" }}>
                                <div className="w-10 h-10 shrink-0 bg-slate-100 overflow-hidden">
                                     {item.avatar ? (
                                        <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-500 font-bold">
                                            {item.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className="font-bold text-sm">{item.name}</div>
                                    <div className="text-xs opacity-60 uppercase tracking-wider">{item.role}</div>
                                </div>
                            </div>
                        </div>
                    )
                }

                if (variant === "modern") {
                    return (
                        <div 
                            key={idx}
                            className="relative p-8 pt-12 rounded-xl transition-all duration-300 hover:scale-[1.02] flex flex-col items-center text-center shadow-md hover:shadow-xl bg-white"
                            style={{ 
                                backgroundColor: cardBg,
                                color: textColor
                            }}
                        >
                           <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border-4 border-white dark:border-slate-800 shadow-sm overflow-hidden bg-slate-200">
                                {item.avatar ? (
                                    <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-300 text-slate-500 font-bold">
                                        {item.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            
                            <div className="mt-4 mb-4">{renderStars(item.rating)}</div>
                            <p className="italic opacity-80 mb-6 flex-1">"{item.review}"</p>
                            
                            <div className="border-t w-full pt-4 border-dashed border-slate-200 dark:border-slate-700">
                                <div className="font-bold text-lg">{item.name}</div>
                                <div className="text-sm opacity-60 font-medium text-primary">{item.role}</div>
                            </div>
                        </div>
                    )
                }

                return (
                    <div 
                        key={idx}
                        className="relative p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col h-full border-t-4 bg-white"
                        style={{ 
                            backgroundColor: cardBg,
                            borderColor: "var(--color-primario)",
                            borderLeft: `1px solid ${cardBorder}`,
                            borderRight: `1px solid ${cardBorder}`,
                            borderBottom: `1px solid ${cardBorder}`,
                        }}
                    >
                        <Quote className="absolute top-4 right-6 w-16 h-16 opacity-5 rotate-180 pointer-events-none" />
                        <div className="mb-6">{renderStars(item.rating)}</div>
                        <blockquote className="flex-1 mb-6 relative z-10">
                            <p className="text-base leading-relaxed italic opacity-90">"{item.review}"</p>
                        </blockquote>
                        <div className="flex items-center gap-4 mt-auto pt-6 border-t border-black/5 dark:border-white/5">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 shrink-0">
                                {item.avatar ? (
                                    <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-300 text-slate-500 font-bold">
                                        {item.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="font-bold text-sm">{item.name}</div>
                                {item.role && (
                                    <div className="text-xs opacity-60 font-medium uppercase tracking-wider">{item.role}</div>
                                )}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    </section>
  )
}