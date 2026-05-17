"use client"

import { useEffect } from "react"
import { cargarConfiguracion } from "@/lib/blocks-storage"

export default function DynamicFavicon() {
  useEffect(() => {
    const updateFavicon = () => {
      const config = cargarConfiguracion()
      // Si hay config usamos esa, si no, usamos el default estático
      const faviconUrl = config?.empresa?.favicon || "/favicon.png"
      
      if (!faviconUrl) return

      // Buscamos cualquier link de icono existente
      const oldLink = document.querySelector("link[rel*='icon']")
      
      // Creamos el nuevo
      const link = document.createElement('link')
      link.type = 'image/x-icon' 
      link.rel = 'shortcut icon'
      link.href = `${faviconUrl}?v=${Date.now()}` // Timestamp para romper caché

      // Reemplazo atómico manual
      if (oldLink) {
        // Como quitamos 'icons' de layout.tsx, React ya no controla este nodo,
        // así que podemos borrarlo sin miedo a errores.
        document.head.removeChild(oldLink)
      }
      document.head.appendChild(link)
    }

    updateFavicon()

    window.addEventListener("storage-update", updateFavicon)
    window.addEventListener("storage", updateFavicon)

    return () => {
      window.removeEventListener("storage-update", updateFavicon)
      window.removeEventListener("storage", updateFavicon)
    }
  }, [])

  return null
} 