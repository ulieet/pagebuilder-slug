"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import type { SiteConfig } from "@/lib/types/blocks"
import { RenderBlocks } from "@/components/page-builder/render-blocks"
import { BloqueHeader } from "@/components/bloques/header"
import { BloqueFooter } from "@/components/bloques/footer"
import { WhatsappFloatingButton } from "@/components/bloques/whatsapp-button"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api" 

export default function DynamicPage() {
  const params = useParams()
  const [config, setConfig] = useState<SiteConfig | null>(null)
  const [loading, setLoading] = useState(true)

  const slug = params?.slug as string

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const data = await api.getConfig(false)
        if (data) {
          setConfig(data)
          if (data.empresa?.nombre) {
            document.title = `${data.empresa.nombre} - ${slug}` 
          }
        } else {
          console.warn("No se encontró configuración para este cliente en la base de datos.")
        }
      } catch (error) {
        console.error("Error al cargar la configuración de la nube:", error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchConfig()
    }
  }, [slug])

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

  // Si hubo un problema de conexión con la API o la base de datos del cliente está vacía
  if (!config) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900 p-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Sitio en Mantenimiento</h1>
        <p className="text-sm text-slate-500 max-w-sm">
          La plataforma se encuentra sincronizando los datos de este espacio. Por favor, volvé a intentarlo más tarde.
        </p>
      </div>
    )
  }

  const currentPage = config.pages.find(p => p.slug === slug)

  if (!currentPage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4 pt-24">
        <h1 className="text-4xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600">Página no encontrada</p>
        <div className="flex gap-4 mt-4">
             <Link href="/"><Button>Ir al Inicio</Button></Link>
        </div>
      </div>
    )
  }

  const headerData = { ...config.header.datos, nombreEmpresa: config.header.datos.nombreEmpresa || config.empresa.nombre }
  const footerData = { ...config.footer.datos, nombreEmpresa: config.footer.datos.nombreEmpresa || config.empresa.nombre }

  const announcementBlocks = currentPage.blocks.filter(b => b.tipo === "announcement" && b.activo)
  const contentBlocks = currentPage.blocks.filter(b => b.tipo !== "announcement")

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
        {contentBlocks.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground bg-muted/20 m-8 rounded-lg border border-dashed pt-32">
                <p>Esta página está vacía.</p>
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