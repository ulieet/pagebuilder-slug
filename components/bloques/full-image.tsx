// components/bloques/full-image.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { FullImageBlock } from "@/lib/types/blocks"
import { ArrowRight } from "lucide-react"

interface FullImageProps {
  data: FullImageBlock["datos"]
}

export function BloqueFullImage({ data }: FullImageProps) {
  const { 
    imagen, 
    titulo, 
    subtitulo, 
    textoBoton, 
    urlBoton, 
    overlay = true,
    alineacion = "center" 
  } = data

  const alignClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right"
  }

  return (
    <section className="relative w-full h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={imagen || "/placeholder.svg"}
          alt={titulo || "Full screen image"}
          fill
          className="object-cover"
          priority 
        />
        {overlay && <div className="absolute inset-0 bg-black/40" />}
      </div>

      {(titulo || subtitulo) && (
        <div className="relative z-10 container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`max-w-4xl mx-auto flex flex-col gap-6 text-white ${alignClasses[alineacion]}`}
          >
            {titulo && (
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-balance">
                {titulo}
              </h2>
            )}
            
            {subtitulo && (
              <p className="text-lg md:text-2xl text-white/90 max-w-2xl text-balance font-light">
                {subtitulo}
              </p>
            )}

            {textoBoton && (
              <Button asChild size="lg" className="mt-4 text-lg h-12 px-8 bg-white text-black hover:bg-white/90">
                <Link href={urlBoton || "#"}>
                  {textoBoton} <ArrowRight className="ml-2 w-5 h-5"/>
                </Link>
              </Button>
            )}
          </motion.div>
        </div>
      )}
    </section>
  )
}