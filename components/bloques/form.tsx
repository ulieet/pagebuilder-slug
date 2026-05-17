"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { MapPin, Clock, Phone, Mail, Send, CheckCircle2, AlertCircle } from "lucide-react"
import { api } from "@/lib/api"

interface BloqueFormProps {
  data: any
  variant?: string
}

export function BloqueForm({ data, variant = "default" }: BloqueFormProps) {
  const title = data.title || "CONTACTANOS"
  const description = data.description || "Realice su consulta y nos pondremos en contacto a la brevedad."
  const buttonText = data.buttonText || "ENVIAR"
  
  const address = data.address || "Dirección comercial aquí"
  const hours = data.hours || "Lunes a viernes de 9:00 a 18:00 hs"
  const phone = data.phone
  const emailDisplay = data.emailDisplay

  const primaryColor = "var(--color-primario)"
  const bgColor = "var(--color-fondo)"
  const textColor = "var(--color-texto)"

  const [formData, setFormData] = useState({ nombre: "", apellido: "", email: "", mensaje: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFeedback(null)

    try {
      await api.enviarMensaje(formData)
      setFeedback({ type: 'success', msg: "¡Mensaje enviado correctamente! Nos pondremos en contacto pronto." })
      setFormData({ nombre: "", apellido: "", email: "", mensaje: "" })
    } catch (error: any) {
      setFeedback({ type: 'error', msg: error.message || "Ocurrió un error al enviar tu mensaje." })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (variant === "modern") {
    return (
      <section className="py-24 px-4 bg-slate-100">
        <div className="container mx-auto">
          <Card className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border-0">
             <div className="p-10 md:p-14">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">{title}</h2>
                    <p className="text-slate-500">{description}</p>
                </div>

                {feedback && (
                  <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${feedback.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {feedback.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    <p className="text-sm font-medium">{feedback.msg}</p>
                  </div>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label>Nombre</Label>
                            <Input name="nombre" value={formData.nombre} onChange={handleChange} required minLength={2} className="bg-slate-50 border-slate-200" style={{ caretColor: primaryColor }} />
                        </div>
                        <div className="space-y-2">
                            <Label>Apellido</Label>
                            <Input name="apellido" value={formData.apellido} onChange={handleChange} required minLength={2} className="bg-slate-50 border-slate-200" style={{ caretColor: primaryColor }} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input type="email" name="email" value={formData.email} onChange={handleChange} required className="bg-slate-50 border-slate-200" style={{ caretColor: primaryColor }} />
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Mensaje</Label>
                        <Textarea 
                            name="mensaje" value={formData.mensaje} onChange={handleChange} required minLength={10}
                            className="bg-slate-50 border-slate-200" 
                            style={{ caretColor: primaryColor, minHeight: "120px" }} 
                        />
                    </div>
                    
                    <Button disabled={isSubmitting} className="w-full h-12 text-base font-medium rounded-xl text-white shadow-lg transition-all hover:opacity-90 disabled:opacity-50" 
                            style={{ backgroundColor: primaryColor }}>
                        {isSubmitting ? "Enviando..." : buttonText}
                    </Button>
                </form>
             </div>
          </Card>
        </div>
      </section>
    )
  }

  if (variant === "minimal") {
    return (
      <section className="py-24 px-4" style={{ backgroundColor: bgColor, color: textColor }}>
        <div className="container mx-auto max-w-xl">
           <div className="text-left mb-10">
                <h2 className="text-4xl font-bold mb-4" style={{ color: primaryColor }}>{title}</h2>
                <p className="text-lg opacity-70">{description}</p>
           </div>

           {feedback && (
              <div className={`mb-6 p-4 border-l-4 ${feedback.type === 'success' ? 'border-green-500 bg-green-500/10 text-green-700' : 'border-red-500 bg-red-500/10 text-red-700'}`}>
                <p className="text-sm font-bold">{feedback.msg}</p>
              </div>
            )}

           <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1"><Input name="nombre" value={formData.nombre} onChange={handleChange} required placeholder="Nombre" className="h-12 border-x-0 border-t-0 border-b-2 rounded-none px-0 focus-visible:ring-0 text-lg shadow-none bg-transparent" /></div>
                    <div className="space-y-1"><Input name="apellido" value={formData.apellido} onChange={handleChange} required placeholder="Apellido" className="h-12 border-x-0 border-t-0 border-b-2 rounded-none px-0 focus-visible:ring-0 text-lg shadow-none bg-transparent" /></div>
                </div>
                <div className="space-y-1"><Input name="email" value={formData.email} onChange={handleChange} required type="email" placeholder="Correo electrónico" className="h-12 border-x-0 border-t-0 border-b-2 rounded-none px-0 focus-visible:ring-0 text-lg shadow-none bg-transparent" /></div>
                
                <div className="space-y-1">
                    <Textarea 
                        name="mensaje" value={formData.mensaje} onChange={handleChange} required minLength={10}
                        placeholder="Escribe tu mensaje..." 
                        className="border-x-0 border-t-0 border-b-2 rounded-none px-0 focus-visible:ring-0 resize-none text-lg shadow-none bg-transparent" 
                        style={{ minHeight: "100px" }}
                    />
                </div>
                
                <div className="pt-4">
                    <Button disabled={isSubmitting} variant="outline" className="h-12 px-8 border-2 font-bold tracking-wide bg-transparent hover:bg-transparent transition-opacity hover:opacity-70 disabled:opacity-50" 
                            style={{ borderColor: primaryColor, color: primaryColor }}>
                        {isSubmitting ? "ENVIANDO..." : buttonText} {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
                    </Button>
                </div>
           </form>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        
        <div className="mb-12 border-l-4 pl-6" style={{ borderColor: primaryColor }}>
             <h2 className="text-3xl md:text-4xl font-bold text-black uppercase tracking-tight mb-2">
                {title}
             </h2>
             <p className="text-slate-500 max-w-2xl text-lg">
                {description}
             </p>
        </div>

        <div className="grid md:grid-cols-[1.2fr_2fr] gap-8 md:gap-16 items-start">
            
            <div className="space-y-8 h-full pt-2">
                <div className="space-y-2">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">Oficina</h3>
                    <div className="flex items-start gap-3 text-slate-800 font-medium">
                        <MapPin className="w-5 h-5 shrink-0" style={{ color: primaryColor }} />
                        <p>{address}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">Horario</h3>
                    <div className="flex items-start gap-3 text-slate-800 font-medium">
                        <Clock className="w-5 h-5 shrink-0" style={{ color: primaryColor }} />
                        <p>{hours}</p>
                    </div>
                </div>

                {(phone || emailDisplay) && (
                    <div className="space-y-2">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">Contacto</h3>
                        {phone && <div className="flex items-center gap-3 text-slate-800 font-medium"><Phone className="w-5 h-5 shrink-0" style={{ color: primaryColor }} /><p>{phone}</p></div>}
                        {emailDisplay && <div className="flex items-center gap-3 text-slate-800 font-medium"><Mail className="w-5 h-5 shrink-0" style={{ color: primaryColor }} /><p>{emailDisplay}</p></div>}
                    </div>
                )}
            </div>

            <div className="space-y-6">
              {feedback && (
                <div className={`p-4 rounded-none border-l-4 flex items-center gap-3 ${feedback.type === 'success' ? 'bg-green-50 border-green-500 text-green-800' : 'bg-red-50 border-red-500 text-red-800'}`}>
                  {feedback.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  <p className="text-sm font-bold">{feedback.msg}</p>
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-1">
                          <Label className="font-bold text-slate-900 text-xs uppercase">Nombre</Label>
                          <Input name="nombre" value={formData.nombre} onChange={handleChange} required minLength={2} className="bg-slate-50 border-slate-200 h-12 rounded-none focus-visible:ring-1 focus-visible:ring-slate-400" />
                      </div>
                      <div className="space-y-1">
                          <Label className="font-bold text-slate-900 text-xs uppercase">Apellido</Label>
                          <Input name="apellido" value={formData.apellido} onChange={handleChange} required minLength={2} className="bg-slate-50 border-slate-200 h-12 rounded-none focus-visible:ring-1 focus-visible:ring-slate-400" />
                      </div>
                  </div>
                  
                  <div className="space-y-1">
                      <Label className="font-bold text-slate-900 text-xs uppercase">Email</Label>
                      <Input type="email" name="email" value={formData.email} onChange={handleChange} required className="bg-slate-50 border-slate-200 h-12 rounded-none focus-visible:ring-1 focus-visible:ring-slate-400" />
                  </div>

                  <div className="space-y-1">
                      <Label className="font-bold text-slate-900 text-xs uppercase">Consulta</Label>
                      <Textarea 
                          name="mensaje" value={formData.mensaje} onChange={handleChange} required minLength={10}
                          className="bg-slate-50 border-slate-200 rounded-none focus-visible:ring-1 focus-visible:ring-slate-400 resize-none" 
                          style={{ minHeight: "160px" }}
                      />
                  </div>

                  <div className="pt-2 flex justify-end">
                      <Button 
                          disabled={isSubmitting}
                          className="w-full md:w-auto text-white rounded-none h-12 px-12 text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
                          style={{ backgroundColor: primaryColor }}
                      >
                          {isSubmitting ? "Enviando..." : buttonText}
                      </Button>
                  </div>
              </form>
            </div>

        </div>
      </div>
    </section>
  )
}