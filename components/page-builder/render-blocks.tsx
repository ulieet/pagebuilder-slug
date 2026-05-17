"use client"

import { useEffect } from "react" 
import type { Block } from "@/lib/types/blocks"
import { BloqueHero } from "@/components/bloques/hero"
import { BloqueBanner } from "@/components/bloques/banner"
import { BloqueFeatures } from "@/components/bloques/features"
import { BloqueTituloParrafos } from "@/components/bloques/TitulosParrafos"
import { BloqueGallery } from "@/components/bloques/gallery"
import { BloqueCTA } from "@/components/bloques/cta"
import { BloqueStats } from "@/components/bloques/stats"
import { BloqueImageCardList } from "@/components/bloques/ImageCardList"
import { BloqueCards3 } from "@/components/bloques/cards-3"
import { BloqueForm } from "@/components/bloques/form"
import { BloqueLogoMarquee } from "@/components/bloques/logo-marquee"
import { BloqueTextoImagen } from "@/components/bloques/texto-imagen"
import { BloqueFaq } from "@/components/bloques/faq"
import { BloqueAnnouncement } from "@/components/bloques/announcement"
import { BloqueTestimonials } from "@/components/bloques/testimonials"
import { BloqueFullImage } from "@/components/bloques/full-image"

interface RenderBlocksProps { 
  blocks: Block[]
}

export function RenderBlocks({ blocks }: RenderBlocksProps) {
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        
        if (element) {
          
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 150);
        }
      }
    };

    handleHashScroll();

    
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, [blocks]); 

  if (!Array.isArray(blocks) || blocks.length === 0) return null

  return (
    <div className="flex flex-col w-full">
      {blocks
        .filter(block => block && block.activo !== false)
        .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))
        .map((block, index) => {
          const key = block.id ? block.id : `bloque-sin-id-${index}`
          const sectionId = block.datos?.sectionId || undefined

          let BlockComponent = null;

          switch (block.tipo) {
            case "hero": 
                BlockComponent = <BloqueHero data={block.datos} variant={block.variant as any} />
                break
            case "banner": 
                BlockComponent = <BloqueBanner data={block.datos} />
                break
            case "features": 
                BlockComponent = <BloqueFeatures data={block.datos as any} />
                break
            case "titulo-parrafos": 
                BlockComponent = <BloqueTituloParrafos data={block.datos} />
                break
            case "image-card-list": 
                BlockComponent = <BloqueImageCardList data={block.datos} />
                break
            case "cards-3": 
                BlockComponent = <BloqueCards3 data={block.datos} variant={block.variant as any} />            
                break
            case "gallery": 
                BlockComponent = <BloqueGallery data={block.datos} />
                break
            case "logo-marquee": 
                BlockComponent = <BloqueLogoMarquee data={block.datos} />
                break
            case "stats": 
                BlockComponent = <BloqueStats data={block.datos} />
                break
            case "cta": 
                BlockComponent = <BloqueCTA data={block.datos as any} />
                break
            case "form": 
                BlockComponent = <BloqueForm data={block.datos} variant={block.variant as any} />
                break
            case "text-image": 
                BlockComponent = <BloqueTextoImagen data={block.datos} />
                break
            case "faq": 
                BlockComponent = <BloqueFaq data={block.datos} />
                break
            case "announcement": 
                BlockComponent = <BloqueAnnouncement data={block.datos} />
                break
            case "testimonials": 
                BlockComponent = <BloqueTestimonials data={block.datos} variant={block.variant as any} />
                break
            case "full-image":
                BlockComponent = <BloqueFullImage data={block.datos} />
                break
            default: 
                return null
          }

          if (!BlockComponent) return null

          return (
            <div 
              key={key} 
              id={sectionId} 
              className="w-full scroll-mt-24" 
            >
              {BlockComponent}
            </div>
          )
        })}
    </div>
  )
}