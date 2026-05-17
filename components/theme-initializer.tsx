"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ThemeInitializer() {
  const pathname = usePathname()

  // EFECTO REACT: Gestiona la navegación y las actualizaciones en vivo
  useEffect(() => {
    const applyTheme = () => {
       const isAdmin = window.location.pathname.startsWith("/admin")
       
       // Si estamos en admin, buscamos el contenedor de preview (#theme-scope)
       // Si estamos en la web pública, aplicamos a todo el documento (documentElement)
       const target = isAdmin ? document.getElementById("theme-scope") : document.documentElement
       
       // Si estamos en admin pero no existe el contenedor de preview (ej: dashboard principal), no hacemos nada
       if (isAdmin && !target) return 
       
       try {
           const saved = localStorage.getItem("site-builder-config-v3")
           if (saved) {
               const parsed = JSON.parse(saved)
               const { estilos } = parsed
               if (estilos) {
                   const element = target as HTMLElement
                   const colores = estilos.colores || {}
                   const tipografia = estilos.tipografia || {}

                   // 1. Aplicar variables de tus componentes
                   if (colores.primario) element.style.setProperty('--color-primario', colores.primario)
                   if (colores.fondo) element.style.setProperty('--color-fondo', colores.fondo)
                   if (colores.texto) element.style.setProperty('--color-texto', colores.texto)
                   if (tipografia.fuente) element.style.setProperty('--fuente-base', tipografia.fuente)
                   
                   // 2. Overrides de sistema (Solo si NO es admin, o si estamos dentro del scope)
                   // Esto evita que shadcn/ui en el admin se rompa
                   if (colores.fondo) element.style.setProperty('--background', colores.fondo)
                   if (colores.texto) element.style.setProperty('--foreground', colores.texto)
               }
           }
       } catch(e) { console.error(e) }
    }
    
    // Aplicar al cargar y al navegar
    applyTheme()
    
    // LÓGICA ESPECÍFICA PARA ADMIN
    let interval: NodeJS.Timeout
    if (pathname?.startsWith("/admin")) {
        // A. Limpiar estilos globales para que la UI del admin sea siempre limpia
        document.documentElement.style.removeProperty("--color-primario")
        document.documentElement.style.removeProperty("--color-fondo")
        document.documentElement.style.removeProperty("--color-texto")
        document.documentElement.style.removeProperty("--fuente-base")
        document.documentElement.style.removeProperty("--background")
        document.documentElement.style.removeProperty("--foreground")

        // B. Intervalo para actualizar la previsualización mientras editas
        // (Revisa cambios en localStorage cada 500ms)
        interval = setInterval(applyTheme, 500)
    }

    return () => {
        if (interval) clearInterval(interval)
    }
  }, [pathname])

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              // PROTECCIÓN ADMIN: Si la URL empieza por /admin, NO ejecutar estilos globales
              if (window.location.pathname.startsWith("/admin")) return;

              var storageKey = "site-builder-config-v3";
              var savedData = localStorage.getItem(storageKey);
              
              if (savedData) {
                var parsed = JSON.parse(savedData);
                var estilos = parsed.estilos || {};
                var colores = estilos.colores || {};
                var tipografia = estilos.tipografia || {};
                var root = document.documentElement;

                // 1. Aplicar variables personalizadas
                if (colores.primario) root.style.setProperty('--color-primario', colores.primario);
                if (colores.fondo) root.style.setProperty('--color-fondo', colores.fondo);
                if (colores.texto) root.style.setProperty('--color-texto', colores.texto);

                // 2. Overrides sistema (Solo web pública)
                if (colores.fondo) root.style.setProperty('--background', colores.fondo);
                if (colores.texto) root.style.setProperty('--foreground', colores.texto);
                
                // 3. Tipografía
                if (tipografia.fuente) root.style.setProperty('--fuente-base', tipografia.fuente);
              }
            } catch (e) { }
          })()
        `,
      }}
    />
  )
}