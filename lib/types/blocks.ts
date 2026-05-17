export type BlockType =
  | "header"
  | "hero"
  | "footer"
  | "banner"
  | "cards-3"
  | "text-image"
  | "form"
  | "gallery"
  | "logo-marquee"
  | "image-card-list"
  | "titulo-parrafos"
  | "features"
  | "cta"
  | "stats"
  | "faq"
  | "announcement"
  | "testimonials" 
  | "full-image" 

// =====================
// CONFIGURACIÓN GLOBAL
// =====================

export interface StyleConfig {
  colores: {
    primario: string
    fondo: string
    texto: string
  }
  tipografia: {
    fuente: string
    tamanoBase: string
    tamanoTitulo: string
    tamanoSubtitulo: string
  }
}

export type BlockVariant =
  | "default"
  | "modern"
  | "minimal"
  | "bold"
  | "centered"

// =====================
// BLOQUE BASE
// =====================

export interface BaseBlock {
  id: string
  tipo: BlockType
  orden: number
  activo: boolean
  variant?: BlockVariant
  locked?: boolean
}

// =====================
// BLOQUES ESTRUCTURALES
// =====================

export interface HeaderBlock extends BaseBlock {
  tipo: "header"
  datos: {
    sectionId?: string
    logoImagen?: string
    logoTexto?: string
    nombreEmpresa: string
    navegacion: Array<{ nombre: string; url: string; subLinks?: Array<{ nombre: string; url: string }> }>
    botonTexto: string
    botonUrl: string
    alineacion?: "izquierda" | "centro" | "derecha"
    transparente?: boolean
    enableCustomBg?: boolean
    customBgColor?: string
    isBold?: boolean
    fuente?: string
  }
}

export interface HeroBlock extends BaseBlock {
  tipo: "hero"
  datos: {
    sectionId?: string
    titulo: string
    subtitulo: string
    imagenes: string[]
    botonPrimarioTexto: string
    botonPrimarioUrl: string
    botonSecundarioTexto: string
    botonSecundarioUrl: string
  }
}

export interface FooterBlock extends BaseBlock {
  tipo: "footer"
  datos: {
    sectionId?: string
    nombreEmpresa: string
    descripcion: string
    email: string
    telefono: string
    direccion: string

    lat?: number
    lng?: number

    imagenMapa?: string
    redesSociales: {
      linkedin: string
      facebook: string
      instagram: string
      twitter: string
      whatsapp: string
    }
    estiloVisual?: "simple" | "con-mapa" | "completo"
    personalizacion?: {
      tipoFondo: "default" | "custom" | "transparente"
      colorPersonalizado?: string
      textoOscuro?: boolean
    }
  }
}

// =====================
// BLOQUES DE CONTENIDO
// =====================

export interface BannerBlock extends BaseBlock {
  tipo: "banner"
  datos: {
    sectionId?: string
    titulo: string
    subtitulo: string
    imagen: string
    botonTexto: string
    botonUrl: string
    alineacion: "izquierda" | "centro" | "derecha"
  }
}

export interface TextImageBlock extends BaseBlock {
  tipo: "text-image"
  datos: {
    sectionId?: string
    titulo: string
    texto: string
    imagen: string
    imagenDerecha: boolean
    posicionImagen?: "izquierda" | "derecha"
    puntos?: string[]
  }
}

export interface TituloParrafosBlock extends BaseBlock {
  tipo: "titulo-parrafos"
  datos: {
    sectionId?: string
    titulo: string
    parrafoIzquierda: string
    parrafoDerecha: string
    alineacion: "centrado" | "dividido"
    colorFondo: string
  }
}

export interface StatsBlock extends BaseBlock {
  tipo: "stats"
  datos: {
    sectionId?: string
    fondoOscuro?: boolean
    estadisticas: Array<{ numero: string; etiqueta: string }>
  }
}

export interface FaqBlock extends BaseBlock {
  tipo: "faq"
  datos: {
    sectionId?: string
    titulo: string
    descripcion?: string
    items: Array<{
      pregunta: string
      respuesta: string
    }>
  }
}

export interface AnnouncementBlock extends BaseBlock {
  tipo: "announcement"
  datos: {
    sectionId?: string
    texto: string
    enlace?: string
    bgColor: string
    textColor: string
    animado: boolean
  }
}

// =====================
// TARJETAS Y LISTAS
// =====================

export interface Cards3Block extends BaseBlock {
  tipo: "cards-3"
  datos: {
    sectionId?: string
    titulo?: string
    description?: string
    forceWhiteBackground?: boolean
    items: Array<{
      icono: string
      titulo: string
      descripcion: string
      botonTexto?: string
      botonUrl?: string
      link?: string
    }>
  }
}

export interface FeaturesBlock extends BaseBlock {
  tipo: "features"
  datos: {
    sectionId?: string
    caracteristicas: Array<{
      icono: string
      titulo: string
      descripcion: string
      botonTexto?: string
    }>
  }
}

// =====================
// IMAGE CARD LIST
// =====================

export interface ImageCardData {
  imagenUrl: string
  altTexto: string
  etiqueta: string
  titulo: string
  descripcion: string
  linkTexto: string
  linkUrl: string
}

export interface ImageCardListBlock extends BaseBlock {
  tipo: "image-card-list"
  datos: {
    sectionId?: string
    titulo: string
    subtitulo: string
    columnas: 2 | 3 | 4
    cards: ImageCardData[]
    forceWhiteBackground?: boolean
  }
}

// =====================
// FORMULARIOS Y CTA
// =====================

export interface FormBlock extends BaseBlock {
  tipo: "form"
  datos: {
    sectionId?: string
    titulo: string
    descripcion: string
    campos: Array<{
      nombre: string
      tipo: "text" | "email" | "tel" | "textarea"
      requerido: boolean
      placeholder: string
    }>
    botonTexto: string
    infoContacto?: {
      telefono: string
      email: string
      horario: string
    }
    alineacion?: "izquierda" | "centro" | "derecha"
    estiloVisual?: "clasico" | "tarjeta" | "minimal"
  }
}

export interface CtaBlock extends BaseBlock {
  tipo: "cta"
  datos: {
    sectionId?: string
    titulo: string
    subtitulo: string
    botonPrimarioTexto: string
    botonPrimarioUrl: string
    botonSecundarioTexto: string
    botonSecundarioUrl: string
    textoInferior?: string
  }
}

// =====================
// GALERÍAS Y CLIENTES
// =====================

export interface LogoMarqueeBlock extends BaseBlock {
  tipo: "logo-marquee"
  datos: {
    sectionId?: string
    titulo?: string
    subtitulo?: string
    estilo?: 'marquee' | 'estatico'
    empresas: Array<{
      nombre: string
      logo: string
    }>
  }
}

export interface GalleryBlock extends BaseBlock {
  tipo: "gallery"
  datos: {
    sectionId?: string
    titulo?: string
    imagenes: Array<{
      url: string
      alt: string
      link?: string
    }>
    columnas: 2 | 3 | 4
  }
}

export interface TestimonialsBlock extends BaseBlock {
  tipo: "testimonials"
  datos: {
    sectionId?: string
    title: string
    description: string
    forceWhiteBackground?: boolean
    items: Array<{
      name: string
      role: string
      review: string
      rating: string
      avatar: string
    }>
  }
}

export interface FullImageBlock extends BaseBlock {
  tipo: "full-image"
  datos: {
    sectionId?: string
    imagen: string
    titulo?: string
    subtitulo?: string
    textoBoton?: string
    urlBoton?: string
    overlay?: boolean 
    alineacion?: "center" | "left" | "right"
  }
}

// =====================
// UNIÓN DE BLOQUES
// =====================

export type Block =
  | HeaderBlock
  | HeroBlock
  | FooterBlock
  | BannerBlock
  | TextImageBlock
  | TituloParrafosBlock
  | StatsBlock
  | FaqBlock 
  | Cards3Block
  | FeaturesBlock
  | ImageCardListBlock
  | FormBlock
  | CtaBlock
  | LogoMarqueeBlock
  | GalleryBlock
  | AnnouncementBlock
  | TestimonialsBlock 
  | FullImageBlock 

// =====================
// MULTI PAGE
// =====================

export interface PageData {
  id: string
  slug: string
  title: string
  seoTitle?: string
  seoDescription?: string
  blocks: Block[]
}

export interface SiteConfig {
  header: HeaderBlock
  footer: FooterBlock
  pages: PageData[]
  estilos: StyleConfig
  
  tipoAnimacion?: "none" | "fade" | "slide" | "scale"
  
  empresa: {
    nombre: string
    logo?: string
    whatsapp?: string
    favicon:string
    emailContacto?: string; 
  }
}