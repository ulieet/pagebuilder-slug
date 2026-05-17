"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Shield, Zap, BarChart3, Users, Globe, Lock, Smartphone, Mail, Star, FileText } from "lucide-react"
import Link from "next/link"

const ICON_MAP: Record<string, any> = {
  shield: Shield, zap: Zap, chart: BarChart3, users: Users, globe: Globe,
  lock: Lock, phone: Smartphone, mail: Mail, file: FileText, star: Star,
}

interface BloqueCards3Props {
  data: any
  variant?: string
}

export function BloqueCards3({ data, variant = "corporate" }: BloqueCards3Props) {
  const title = data.title 
  const subtitle = data.description
  const rawItems = data.items || [] 
  const primaryColor = "var(--color-primario)"
  const bgColor = data.forceWhiteBackground ? "#ffffff" : "var(--color-fondo)"
  const textColor = data.forceWhiteBackground ? "#0f172a" : "var(--color-texto)"
  const borderColor = data.forceWhiteBackground ? "rgba(0,0,0,0.1)" : "var(--color-borde, rgba(0,0,0,0.1))"

  const renderIcon = (item: any, className: string) => {
    if (item.image && item.image.trim() !== "") {
        return <img src={item.image} alt={item.title || "Imagen de tarjeta"} className="w-full h-full object-cover" />
    }
    if (typeof item.icon === 'string' && ICON_MAP[item.icon]) {
        const IconComponent = ICON_MAP[item.icon]
        return <IconComponent className={className} />
    }
    return <span className="text-3xl leading-none select-none">{item.icon || "⭐"}</span>
  }

  const getLink = (link?: string) => link && link.trim() !== "" ? link : "#"

  if (variant === "minimal") {
    return (
      <section 
        className="py-20 px-4 transition-colors" 
        style={{ backgroundColor: bgColor, color: textColor }} 
      >
        <div className="container mx-auto max-w-5xl">
          {(title || subtitle) && (
             <div className="mb-12 max-w-2xl">
               {title && <h2 className="text-3xl font-bold mb-4" style={{ color: primaryColor }}>{title}</h2>}
               {subtitle && <p className="text-lg opacity-70">{subtitle}</p>}
             </div>
          )}
          
          <div className="grid md:grid-cols-3 gap-8">
            {rawItems.map((item: any, idx: number) => (
              <div 
                key={idx} 
                className="group flex flex-col items-start gap-3 h-full border rounded-2xl p-6 transition-colors hover:shadow-sm"
                style={{ borderColor: borderColor }}
              >
                <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-1 transition-colors bg-slate-100 overflow-hidden" 
                    style={{ color: primaryColor }}
                >
                  {renderIcon(item, "w-6 h-6")}
                </div>
                
                {item.title && <h3 className="text-lg font-bold">{item.title}</h3>}
                {item.description && <p className="text-sm leading-relaxed opacity-70">{item.description}</p>}
                
                {item.buttonText && (
                    <div className="mt-auto pt-2">
                    <Button asChild variant="link" className="p-0 h-auto text-sm font-semibold group-hover:translate-x-1 transition-transform" style={{ color: primaryColor }}>
                        <Link href={getLink(item.link)}>
                        {item.buttonText} <ArrowRight className="w-3 h-3 ml-2" />
                        </Link>
                    </Button>
                    </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (variant === "interactive") {
    return (
      <section 
        className="py-20 px-4 transition-colors" 
        style={{ backgroundColor: bgColor, color: textColor }} 
      >
        {(title || subtitle) && (
            <div className="container mx-auto max-w-5xl text-center mb-12">
                {title && <h2 className="text-3xl font-black mb-4" style={{ color: primaryColor }}>{title}</h2>}
                {subtitle && <p className="text-base opacity-70 max-w-2xl mx-auto">{subtitle}</p>}
            </div>
        )}
        <div className="container mx-auto max-w-5xl grid md:grid-cols-3 gap-5">
          {rawItems.map((item: any, idx: number) => (
            <Link 
                href={getLink(item.link)} 
                key={idx} 
                className="group relative p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full text-left"
            >
              <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-300 bg-slate-50 overflow-hidden shrink-0">
                 <div style={{ color: primaryColor }} className="w-full h-full flex items-center justify-center">
                    {renderIcon(item, "w-6 h-6")}
                 </div>
              </div>
              
              {item.title && <h3 className="text-lg font-bold mb-2 text-slate-900">{item.title}</h3>}
              {item.description && <p className="text-sm mb-6 opacity-70 text-slate-600">{item.description}</p>}
              
              <div className="mt-auto w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-0 group-hover:w-full transition-all duration-500 ease-out" style={{ backgroundColor: primaryColor }} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section 
        className="py-20 px-4 transition-colors" 
        style={{ backgroundColor: bgColor }} 
    >
      {(title || subtitle) && (
          <div className="container mx-auto max-w-5xl text-center mb-12">
            {title && <h2 className="text-3xl font-bold mb-3 tracking-tight" style={{ color: primaryColor }}>{title}</h2>}
            {subtitle && <p className="text-lg opacity-70 max-w-2xl mx-auto" style={{ color: textColor }}>{subtitle}</p>}
          </div>
      )}

      <div className="container mx-auto max-w-5xl grid md:grid-cols-3 gap-6">
        {rawItems.map((item: any, idx: number) => (
          <Card 
            key={idx} 
            className="border border-slate-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center text-center rounded-xl h-full group"
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-sm shrink-0 transition-transform group-hover:scale-110 bg-slate-100 overflow-hidden"
              style={{ color: primaryColor }}
            >
              {renderIcon(item, "w-8 h-8")}
            </div>
            
            {item.title && (
                <h3 className="text-xl font-bold mb-3 text-slate-900">
                    {item.title}
                </h3>
            )}
            
            {item.description && (
                <p className="mb-8 leading-relaxed text-sm text-slate-600 flex-1">
                {item.description}
                </p>
            )}

            {item.buttonText && (
                <Button 
                asChild 
                variant="outline"
                className="mt-auto rounded-full px-6 h-10 font-bold text-xs tracking-wide hover:-translate-y-0.5 transition-all border-2 bg-transparent hover:bg-slate-50"
                style={{ borderColor: primaryColor, color: primaryColor }}
                >
                <Link href={getLink(item.link)}>
                    {item.buttonText.toUpperCase()}
                </Link>
                </Button>
            )}
          </Card>
        ))}
      </div>
    </section>
  )
}