"use client"

import type { FooterBlock } from "@/lib/types/blocks"
import {
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
  MessageCircle,
  MapPin,
  Mail,
  Phone
} from "lucide-react"
import Link from "next/link"

function getContrastColor(hexColor?: string) {
  if (!hexColor || !hexColor.startsWith("#")) return "#0f172a"
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? "#0f172a" : "#ffffff"
}

function normalizeCoord(value: unknown): number | null {
  if (value === null || value === undefined) return null
  if (typeof value === "string") {
    const n = Number(value.replace(",", "."))
    return Number.isFinite(n) ? n : null
  }
  return Number.isFinite(Number(value)) ? Number(value) : null
}

interface BloqueFooterProps {
  data?: FooterBlock["datos"]
  navLinks?: Array<{ nombre: string; url: string }>
  estilos?: any
}

export function BloqueFooter({
  data,
  navLinks = [],
  estilos,
}: BloqueFooterProps) {
  if (!data) return null

  const estiloVisual = data.estiloVisual || "simple"

  const personalizacion = data.personalizacion || { tipoFondo: "default" }
  const primaryVar = "var(--color-primario)"
  const globalBg = estilos?.colores?.fondo || "#ffffff"

  let bgToCheck = globalBg
  let finalBgStyle: string = "var(--color-fondo)"
  let hasBorderTop = true

  if (personalizacion.tipoFondo === "transparente") {
    finalBgStyle = "transparent"
    hasBorderTop = false
  } else if (
    personalizacion.tipoFondo === "custom" &&
    personalizacion.colorPersonalizado
  ) {
    bgToCheck = personalizacion.colorPersonalizado
    finalBgStyle = personalizacion.colorPersonalizado
  }

  const finalTextColor = getContrastColor(bgToCheck)
  const borderColor =
    finalTextColor === "#0f172a"
      ? "rgba(0,0,0,0.1)"
      : "rgba(255,255,255,0.2)"

  const lat = normalizeCoord(data.lat)
  const lng = normalizeCoord(data.lng)
  const hasMap = lat !== null && lng !== null
  
  const logoUrl = data.imagenMapa

  const renderSocialIcons = () => {
    const redes = data.redesSociales || {}
    const style = { color: primaryVar }

    return (
      <div className="flex gap-4 mt-2">
        {redes.linkedin && (
          <Link href={redes.linkedin} target="_blank" className="hover:opacity-80 transition-opacity">
            <Linkedin className="h-5 w-5" style={style} />
          </Link>
        )}
        {redes.facebook && (
          <Link href={redes.facebook} target="_blank" className="hover:opacity-80 transition-opacity">
            <Facebook className="h-5 w-5" style={style} />
          </Link>
        )}
        {redes.instagram && (
          <Link href={redes.instagram} target="_blank" className="hover:opacity-80 transition-opacity">
            <Instagram className="h-5 w-5" style={style} />
          </Link>
        )}
        {redes.twitter && (
          <Link href={redes.twitter} target="_blank" className="hover:opacity-80 transition-opacity">
            <Twitter className="h-5 w-5" style={style} />
          </Link>
        )}
        {redes.whatsapp && (
          <Link href={redes.whatsapp} target="_blank" className="hover:opacity-80 transition-opacity">
            <MessageCircle className="h-5 w-5" style={style} />
          </Link>
        )}
      </div>
    )
  }

  if (estiloVisual === "con-mapa") {
    return (
      <footer
        className={`${hasBorderTop ? "border-t" : ""} py-16`}
        style={{ backgroundColor: finalBgStyle, color: finalTextColor, borderColor }}
      >
        <div className="container mx-auto px-4 text-center flex flex-col items-center gap-6">
          {logoUrl ? (
            <img src={logoUrl} alt={data.nombreEmpresa} className="h-16 w-auto object-contain" />
          ) : (
            <h3 className="text-2xl font-bold" style={{ color: primaryVar }}>
              {data.nombreEmpresa}
            </h3>
          )}
           {data.descripcion && (
             <p className="max-w-md mx-auto opacity-70 leading-relaxed text-sm">
                {data.descripcion}
             </p>
          )}
          {renderSocialIcons()}
          
          <div className="text-sm mt-4 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <span className="opacity-60">© {new Date().getFullYear()} {data.nombreEmpresa}. Todos los derechos reservados.</span>
            <span className="hidden sm:inline opacity-60">|</span>
            <span className="text-black font-medium opacity-100">
              Desarrollado por{" "}
              <a href="https://ignatechgroup-final.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-black hover:underline transition-all">
                GrupoIgnatech
              </a>
            </span>
          </div>
        </div>
      </footer>
    )
  }

  if (estiloVisual === "completo") {
      return (
        <footer
            className={`${hasBorderTop ? "border-t" : ""} py-16`}
            style={{ backgroundColor: finalBgStyle, color: finalTextColor, borderColor }}
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">
                    
                    <div 
                        className="flex flex-col gap-8 lg:w-4/12 lg:pr-12 lg:border-r"
                        style={{ borderColor }}
                    >
                        <div>
                            {logoUrl ? (
                                <img src={logoUrl} alt={data.nombreEmpresa} className="h-10 md:h-12 w-auto object-contain" />
                            ) : (
                                <h3 className="text-2xl font-bold" style={{ color: primaryVar }}>
                                    {data.nombreEmpresa}
                                </h3>
                            )}
                            {data.descripcion && (
                                <p className="mt-4 opacity-70 leading-relaxed text-sm max-w-sm">
                                    {data.descripcion}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-4 text-sm opacity-90">
                            {data.telefono && (
                                <div className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-primary shrink-0" style={{ color: primaryVar }} />
                                    <a href={`tel:${data.telefono}`} className="hover:underline">{data.telefono}</a>
                                </div>
                            )}
                            {data.email && (
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-primary shrink-0" style={{ color: primaryVar }} />
                                    <a href={`mailto:${data.email}`} className="hover:underline">{data.email}</a>
                                </div>
                            )}
                            {data.direccion && (
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" style={{ color: primaryVar }} />
                                    <span>{data.direccion}</span>
                                </div>
                            )}
                        </div>

                        <div>
                            {renderSocialIcons()}
                        </div>
                    </div>

                    <div className="flex flex-col lg:w-8/12 lg:pl-12 gap-10">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8">
                             {navLinks.map((l, i) => (
                                <Link 
                                    key={i} 
                                    href={l.url} 
                                    className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    <span className="w-1 h-1 rounded-full bg-current opacity-50 group-hover:opacity-100 transition-opacity" />
                                    {l.nombre}
                                </Link>
                             ))}
                        </div>

                        {hasMap && (
                            <div className="mt-auto pt-8 border-t" style={{ borderColor }}>
                                <div className="w-full md:w-2/3 h-40 rounded-lg overflow-hidden border bg-slate-100" style={{ borderColor }}>
                                    <iframe
                                        className="w-full h-full"
                                        src={`https://maps.google.com/maps?q=${lat},${lng}&hl=es&z=14&output=embed`}
                                        loading="lazy"
                                        title="Mapa de ubicación"
                                    />
                                </div>
                            </div>
                        )}
                        
                        <div className="text-xs mt-4 flex flex-col sm:flex-row gap-1 sm:gap-2 items-start sm:items-center">
                             <span className="opacity-60">© {new Date().getFullYear()} {data.nombreEmpresa}. Todos los derechos reservados.</span>
                             <span className="hidden sm:inline opacity-60">|</span>
                             <span className="text-black font-medium opacity-100">
                                Desarrollado por{" "}
                                <a href="https://ignatechgroup-final.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-black hover:underline transition-all">
                                  GrupoIgnatech
                                </a>
                             </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
      )
  }

  return (
    <footer
      className={`${hasBorderTop ? "border-t" : ""} pt-16 pb-8`}
      style={{ backgroundColor: finalBgStyle, color: finalTextColor, borderColor }}
    >
      <div className="container mx-auto px-4 grid gap-12 lg:grid-cols-3">
        <div className="flex flex-col gap-6">
           {logoUrl ? (
            <img src={logoUrl} alt={data.nombreEmpresa} className="h-12 w-auto object-contain self-start" />
           ) : (
            <h3 className="text-3xl font-bold" style={{ color: primaryVar }}>
                {data.nombreEmpresa}
            </h3>
           )}
           {data.descripcion && (
             <p className="opacity-80 text-sm leading-relaxed max-w-sm">
               {data.descripcion}
             </p>
           )}
           {renderSocialIcons()}
        </div>

        <div>
          <h4 className="font-semibold mb-6 text-lg" style={{ color: primaryVar }}>
            Enlaces
          </h4>
          <ul className="space-y-3 opacity-80">
            {navLinks.map((l, i) => (
              <li key={i}>
                <Link href={l.url} className="hover:text-primary transition-colors">{l.nombre}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-semibold mb-2 text-lg" style={{ color: primaryVar }}>
            Ubicación
          </h4>
          
          <div className="space-y-2 opacity-80 text-sm mb-4">
             {data.direccion && <p>{data.direccion}</p>}
             {data.telefono && <p>Tel: {data.telefono}</p>}
             {data.email && <p>{data.email}</p>}
          </div>

          {hasMap ? (
            <iframe
              className="w-full h-56 rounded-lg border shadow-sm"
              src={`https://maps.google.com/maps?q=${lat},${lng}&hl=es&z=14&output=embed`}
              loading="lazy"
              title="Mapa de ubicación"
            />
          ) : (
            <p className="opacity-60 text-sm italic">Ubicación no disponible</p>
          )}
        </div>
      </div>
      
       <div className="container mx-auto px-4 mt-12 pt-8 border-t text-sm flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2" style={{ borderColor }}>
           <span className="opacity-60">© {new Date().getFullYear()} {data.nombreEmpresa}. Todos los derechos reservados.</span>
           <span className="hidden md:inline opacity-60">|</span>
           <span className="text-black font-medium opacity-100">
              Desarrollado por{" "}
              <a href="https://ignatechgroup-final.vercel.app" target="_blank" rel="noopener noreferrer" className="font-black hover:underline transition-all">
                GrupoIgnatech
              </a>
           </span>
       </div>
    </footer>
  )
}