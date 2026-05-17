"use client"

import { useEffect, useState } from "react"
import type { SiteConfig } from "@/lib/types/blocks"
import { RenderBlocks } from "@/components/page-builder/render-blocks"
import { BloqueHeader } from "@/components/bloques/header"
import { BloqueFooter } from "@/components/bloques/footer"
import { WhatsappFloatingButton } from "@/components/bloques/whatsapp-button"
import { api } from "@/lib/api" 

export default function HomePage() {
  const [config, setConfig] = useState<SiteConfig | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const data = await api.getConfig(false)
        if (data) {
          setConfig(data)
        } else {
          console.warn("No se encontró configuración para este cliente en la base de datos.")
        }
      } catch (error) {
        console.error("Error al cargar la configuración de la nube:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchConfig()
  }, [])

  useEffect(() => {
    if (!config?.estilos) return
    const root = document.documentElement
    root.style.setProperty("--color-primario", config.estilos.colores.primario)
    root.style.setProperty("--color-fondo", config.estilos.colores.fondo)
    root.style.setProperty("--color-texto", config.estilos.colores.texto)
    root.style.setProperty("--fuente-base", config.estilos.tipografia.fuente)
    root.style.setProperty("--tamano-base", config.estilos.tipografia.tamanoBase)
    root.style.setProperty("--tamano-titulo", config.estilos.tipografia.tamanoTitulo)
    root.style.setProperty("--tamano-subtitulo", config.estilos.tipografia.tamanoSubtitulo)
  }, [config])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>
  }

  // Si la API no devolvió datos y no hay configuración cargada, mostramos un aviso elegante y limpio
  if (!config) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900 p-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Sitio en Mantenimiento</h1>
        <p className="text-sm text-slate-500 max-w-sm">
          La plataforma se encuentra configurando los últimos detalles de este espacio. Por favor, vuelva a intentarlo más tarde.
        </p>
      </div>
    )
  }

  const homePage = config.pages.find(p => p.slug === "home")
  const headerData = { ...config.header.datos, nombreEmpresa: config.empresa?.nombre || "Mi Empresa" }
  const footerData = { ...config.footer.datos, nombreEmpresa: config.empresa?.nombre || "Mi Empresa" }

  const announcementBlocks = homePage?.blocks.filter(b => b.tipo === "announcement" && b.activo) || []
  const contentBlocks = homePage?.blocks.filter(b => b.tipo !== "announcement") || []

  return (
    <div 
      className="min-h-screen flex flex-col w-full"
      style={{ 
        fontFamily: 'var(--fuente-base)',
        backgroundColor: 'var(--color-fondo)',
        color: 'var(--color-texto)'
      }}
    >
      
      {announcementBlocks.length > 0 && (
        <div className="relative w-full" style={{ zIndex: 100 }}>
          <RenderBlocks blocks={announcementBlocks} />
        </div>
      )}

      {config.header.activo && (
        <BloqueHeader
          data={headerData}
          navLinks={config.header.datos.navegacion}
          variant={config.header.variant as any}
        />
      )}

      <main className="flex-1 flex flex-col w-full">
        {!homePage || homePage.blocks.length === 0 ? (
          <div className="py-20 text-center space-y-2 pt-32 px-4">
             <h1 className="text-3xl font-bold">¡Próximamente!</h1>
             <p className="text-slate-500 text-sm max-w-sm mx-auto">Esta página aún no contiene bloques publicados. Muy pronto vas a poder ver todo el contenido disponible acá.</p>
          </div>
        ) : (
          <RenderBlocks blocks={contentBlocks} />
        )}
      </main>

      {config.footer.activo && (
        <BloqueFooter
          data={footerData as any}
          navLinks={config.header.datos.navegacion} 
          estilos={config.estilos}
        />
      )}

      <WhatsappFloatingButton numero={config.empresa.whatsapp} />
    </div>
  )
}