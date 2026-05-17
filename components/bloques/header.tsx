  "use client"

  import Link from "next/link"
  import { Button } from "@/components/ui/button"
  import { useEffect, useState } from "react"
  import { cn } from "@/lib/utils"
  import { Menu, X, ChevronDown } from "lucide-react"
  import { Geist, Inter, Montserrat, Lato, Open_Sans, Roboto, Playfair_Display } from "next/font/google"
  import { usePathname } from "next/navigation"

  const geist = Geist({ subsets: ["latin"] })
  const inter = Inter({ subsets: ["latin"] })
  const montserrat = Montserrat({ subsets: ["latin"] })
  const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"] })
  const openSans = Open_Sans({ subsets: ["latin"] })
  const roboto = Roboto({ weight: ["300", "400", "500", "700"], subsets: ["latin"] })
  const playfair = Playfair_Display({ subsets: ["latin"] })

  function getContrastColor(hexColor: string) {
      if (!hexColor) return null;
      const hex = hexColor.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
      return yiq >= 128 ? '#0f172a' : '#ffffff';
  }

  interface NavItemProps {
      href: string;
      children: React.ReactNode;
      subLinks?: { nombre: string; url: string }[];
      className?: string;
      variant?: string;
      onClick?: () => void;
      fontClass?: string;
      isBold?: boolean;
      hoverColor?: string; 
      dropdownColors: { bg: string; text: string; border: string };
  }

  const NavItem = ({ href, children, subLinks, className, variant = "default", onClick, fontClass, isBold, hoverColor, dropdownColors }: NavItemProps) => {
    const [isHovered, setIsHovered] = useState(false)
    const isModern = variant === "modern"
    const weightClass = isBold ? "font-bold" : (isModern ? "font-medium" : "font-medium")

    const dropdownContainerClasses = cn(
        "absolute top-full left-0 w-56 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 ease-out z-50",
        isModern ? "pt-4" : "pt-1"
    )

    const dropdownContentClasses = cn(
        "overflow-hidden flex flex-col min-w-[200px]",
        isModern ? "rounded-2xl shadow-2xl" : "rounded-md shadow-lg border"
    )

    const itemStyle = {
        backgroundColor: isModern && isHovered ? "color-mix(in srgb, var(--color-primario), transparent 90%)" : "transparent",
        color: isHovered && hoverColor ? hoverColor : undefined
    }

    const linkClasses = cn(
        "transition-all duration-200 flex items-center gap-1 cursor-pointer h-full",
        isModern ? "px-5 py-2 rounded-full text-sm" : "text-base px-1",
        "text-(--color-texto)",
        !hoverColor && "hover:text-(--color-primario)", 
        fontClass,
        weightClass,
        className
    )

    if (subLinks && subLinks.length > 0) {
        return (
          <div 
              className="relative group h-full flex items-center"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
          >
              <Link
                  href={href}
                  onClick={onClick}
                  className={linkClasses}
                  style={itemStyle}
              >
                  {children}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 opacity-70" />
              </Link>

              <div className={dropdownContainerClasses}>
                  <div 
                      className={dropdownContentClasses}
                      style={{ 
                          backgroundColor: dropdownColors.bg, 
                          borderColor: dropdownColors.border,
                          padding: isModern ? "8px" : "4px 0"
                      }}
                  >
                      {subLinks.map((sub, idx) => (
                          <Link 
                              key={idx} 
                              href={sub.url}
                              className={cn(
                                  "block px-4 py-2.5 text-sm transition-all relative overflow-hidden group/item",
                                  fontClass,
                                  isModern ? "rounded-xl hover:translate-x-1" : "hover:bg-black/5"
                              )}
                              style={{ color: dropdownColors.text }}
                          >
                              {isModern && (
                                  <span className="absolute inset-0 bg-current opacity-0 group-hover/item:opacity-5 transition-opacity pointer-events-none" />
                              )}
                              <span className="relative z-10 flex items-center justify-between">
                                  {sub.nombre}
                                  {isModern && <span className="opacity-0 group-hover/item:opacity-100 transition-opacity text-[10px] transform translate-x-1">→</span>}
                              </span>
                          </Link>
                      ))}
                  </div>
              </div>
          </div>
        )
    }

    return (
      <Link
        href={href}
        onClick={onClick}
        className={linkClasses}
        style={itemStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </Link>
    )
  }

  interface BloqueHeaderProps {
    data: any
    navLinks?: Array<{ nombre: string; url: string }>
    variant?: "default" | "modern" | "centered"
  }

  export function BloqueHeader({ data, navLinks, variant = "default" }: BloqueHeaderProps) {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    
    const nombreEmpresa = data.nombreEmpresa || "Mi Empresa"
    const logoImagen = data.logoImagen
    const navegacion = navLinks || data.navegacion || []
    const botonTexto = data.botonTexto
    const botonUrl = data.botonUrl || "#"
    
    const esTransparente = data.transparente || false
    const enableCustomBg = data.enableCustomBg || false
    const customBgColor = data.customBgColor || "#ffffff"
    
    const menuAlign = data.alineacionMenu || "right"
    const isBold = data.isBold || false
    const selectedFont = data.fuente || "geist" 
    const pathname = usePathname()
    
    const getFontClassName = () => {
        switch (selectedFont) {
            case "geist": return geist.className
            case "inter": return inter.className
            case "montserrat": return montserrat.className
            case "lato": return lato.className
            case "open_sans": return openSans.className
            case "roboto": return roboto.className
            case "playfair": return playfair.className
            default: return ""
        }
    }
    const fontClassName = getFontClassName()

    useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 20)
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const isTransparentOnTop = esTransparente && !scrolled

    const effectiveBgColor = (enableCustomBg && !isTransparentOnTop) 
          ? customBgColor 
          : (esTransparente ? "transparent" : (variant === "modern" ? "color-mix(in srgb, var(--color-fondo), transparent 5%)" : "var(--color-fondo)"))

    const contrastTextColor = (enableCustomBg && !isTransparentOnTop) 
          ? getContrastColor(customBgColor) 
          : null

    const hoverContrastColor = contrastTextColor === '#ffffff' ? '#ffffff' : undefined

    const dropdownBg = enableCustomBg ? customBgColor : "var(--color-fondo)"
    const dropdownText = contrastTextColor ? contrastTextColor : "var(--color-texto)"
    const dropdownBorder = contrastTextColor ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"
    
    const dropdownColors = {
        bg: dropdownBg,
        text: dropdownText,
        border: dropdownBorder
    }

    const headerClass = cn(
      "top-0 left-0 right-0 z-40 transition-all duration-300 w-full",
      esTransparente ? "fixed" : "sticky",
      (!esTransparente && scrolled) && "shadow-sm",
      esTransparente ? "py-4" : (scrolled ? "py-2" : "py-4"),
      variant === "centered" && "py-4"
    )

    const containerStyle = {
      backgroundColor: effectiveBgColor,
      color: "var(--color-texto)", 
      borderBottom: (!isTransparentOnTop && variant === "centered" && !esTransparente) ? "1px solid rgba(0,0,0,0.05)" : "none",
      ...(contrastTextColor ? { '--color-texto': contrastTextColor } : {})
    } as React.CSSProperties

    const renderLogo = () => (
    <Link
      href="/"
      onClick={() => {
        if (pathname === "/") {
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
        setMobileMenuOpen(false)
      }}
      className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity shrink-0"
    >
      {logoImagen ? (
        <img 
          src={logoImagen} 
          alt={nombreEmpresa} 
          className="h-auto max-h-12 md:max-h-16 w-auto object-contain" 
        />
      ) : (
        <span 
          className={`text-xl md:text-2xl ${fontClassName} ${isBold ? 'font-bold' : 'font-semibold'}`} 
          style={{ color: "var(--color-texto)" }}
        >
          {nombreEmpresa}
        </span>
      )}
    </Link>
  )

    const getNavContainerClass = () => {
      if (menuAlign === "center") return "flex-1 flex justify-center"
      if (menuAlign === "left") return "flex justify-start ml-8 mr-auto"
      return "flex-1 flex justify-end mr-8"
    }

    const mainButtonStyle = { 
      backgroundColor: contrastTextColor === '#ffffff' ? '#ffffff' : "var(--color-primario)", 
      color: contrastTextColor === '#ffffff' ? (enableCustomBg ? customBgColor : '#000000') : "#ffffff",
      border: contrastTextColor === '#ffffff' ? "none" : "1px solid rgba(255,255,255,0.1)"
    }

    const mobileMenuBg = enableCustomBg ? customBgColor : "var(--color-fondo)"

    if (variant === "centered") {
      return (
        <header className={headerClass} style={containerStyle}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center gap-4">
              <div className="w-full flex justify-between items-center relative">
                <div className="md:hidden">
                  <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                      className="text-(--color-primario) hover:bg-transparent hover:text-(--color-primario)/80"
                  >
                      <Menu />
                  </Button>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  {renderLogo()}
                </div>
                <div className="w-10 md:hidden" />
                <div className="hidden md:block ml-auto">
                  {botonTexto && (
                    <Button asChild size="sm" className={`rounded-none px-8 uppercase tracking-wider text-xs h-10 ${fontClassName} ${isBold ? 'font-bold' : 'font-semibold'}`} style={mainButtonStyle}>
                        <Link href={botonUrl}>{botonTexto}</Link>
                    </Button>
                  )}
                </div>
              </div>
              <div className="hidden md:block w-full border-t border-black/5 pt-4 mt-1" style={{ borderColor: contrastTextColor ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)" }}>
                <nav className="flex items-center justify-center gap-12">
                  {navegacion.map((item: any, idx: number) => (
                    <NavItem 
                      key={idx} 
                      href={item.url} 
                      subLinks={item.subLinks} 
                      className="uppercase text-xs tracking-[0.15em]" 
                      variant="centered" 
                      fontClass={fontClassName} 
                      isBold={isBold}
                      hoverColor={hoverContrastColor}
                      dropdownColors={dropdownColors}
                    >
                      {item.nombre}
                    </NavItem>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden fixed inset-0 z-40 pt-24 px-8 flex flex-col items-center gap-6 overflow-y-auto" style={{ backgroundColor: mobileMenuBg, color: "var(--color-texto)", '--color-texto': contrastTextColor || "inherit" } as React.CSSProperties}>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="absolute top-6 left-4 text-(--color-texto) hover:bg-transparent"><X /></Button>
                {navegacion.map((item: any, idx: number) => (
                    <div key={idx} className="flex flex-col items-center gap-2 w-full text-center">
                          <Link 
                              href={item.url} 
                              className={`text-2xl transition-colors duration-200 text-(--color-texto) hover:text-(--color-primario) ${fontClassName} ${isBold ? 'font-bold' : 'font-normal'}`} 
                              onClick={() => setMobileMenuOpen(false)}
                          >
                              {item.nombre}
                          </Link>
                          {item.subLinks && item.subLinks.length > 0 && (
                              <div className="flex flex-col gap-3 items-center mt-2 mb-4 w-full py-2">
                                  {item.subLinks.map((sub: any, subIdx: number) => (
                                      <Link 
                                          key={subIdx} 
                                          href={sub.url} 
                                          className={`text-lg opacity-80 transition-colors duration-200 text-(--color-texto) hover:text-(--color-primario) hover:opacity-100 ${fontClassName}`} 
                                          onClick={() => setMobileMenuOpen(false)}
                                      >
                                              {sub.nombre}
                                      </Link>
                                  ))}
                              </div>
                          )}
                    </div>
                ))}
            </div>
          )}
        </header>
      )
    }

    const isModern = variant === "modern"
    return (
      <header className={headerClass} style={containerStyle}>
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-full">
          
          <div className="flex items-center shrink-0">{renderLogo()}</div>
          
          <div className={`hidden md:flex ${getNavContainerClass()} h-full`}>
              <nav className={cn("flex items-center h-full", isModern ? "gap-2" : "gap-8")}>
                  {navegacion.map((item: any, idx: number) => (
                      <NavItem 
                          key={idx} 
                          href={item.url} 
                          subLinks={item.subLinks} 
                          variant={isModern ? "modern" : "default"} 
                          fontClass={fontClassName} 
                          isBold={isBold}
                          hoverColor={hoverContrastColor}
                          dropdownColors={dropdownColors}
                      >
                          {item.nombre}
                      </NavItem>
                  ))}
              </nav>
          </div>

          <div className={cn("flex items-center gap-4 shrink-0")}>
              {botonTexto && (
                  <Button asChild className={cn("hidden md:inline-flex shadow-sm", isModern ? "rounded-full px-6 h-10" : "rounded-md h-11 px-6", fontClassName, isBold ? 'font-bold' : 'font-semibold')} style={mainButtonStyle}>
                      <Link href={botonUrl}>{botonTexto}</Link>
                  </Button>
              )}
              <div className="md:hidden">
                  <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                      className="text-(--color-primario) hover:bg-transparent hover:text-(--color-primario)/80"
                  >
                      <Menu />
                  </Button>
              </div>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 border-t shadow-xl p-4 flex flex-col gap-0 max-h-[80vh] overflow-y-auto" style={{ backgroundColor: mobileMenuBg, color: "var(--color-texto)", '--color-texto': contrastTextColor || "inherit" } as React.CSSProperties}>
              <div className="flex justify-end mb-2">
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="text-(--color-texto) hover:bg-transparent opacity-70"><X /></Button>
              </div>
              
              {navegacion.map((item: any, idx: number) => (
                  <div key={idx} className="border-b border-black/5 last:border-0" style={{ borderColor: contrastTextColor ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)" }}>
                      <Link 
                          href={item.url} 
                          onClick={() => !item.subLinks?.length && setMobileMenuOpen(false)}
                          className={`block py-4 px-2 text-lg transition-colors duration-200 text-(--color-texto) hover:text-(--color-primario) ${fontClassName} ${isBold ? 'font-bold' : 'font-medium'}`} 
                      >
                          {item.nombre}
                      </Link>
                      
                      {item.subLinks && item.subLinks.length > 0 && (
                          <div className="pl-6 pb-4 space-y-3 border-l-2 ml-2" style={{ borderColor: "var(--color-primario)" }}>
                              {item.subLinks.map((sub: any, subIdx: number) => (
                                  <Link 
                                      key={subIdx} 
                                      href={sub.url} 
                                      className={`block text-base opacity-70 transition-all duration-200 text-(--color-texto) hover:text-(--color-primario) hover:opacity-100 ${fontClassName}`}
                                      onClick={() => setMobileMenuOpen(false)}
                                  >
                                      {sub.nombre}
                                  </Link>
                              ))}
                          </div>
                      )}
                  </div>
              ))}
          </div>
        )}
      </header>
    )
  }