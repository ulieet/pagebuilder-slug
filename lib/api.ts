const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "cliente-demo";

export const api = {
  // Solo dejamos la lectura de la página (pública)
  getConfig: async (throwAuthError: boolean = true) => {
    const res = await fetch(`/api/${CLIENT_ID}/configPage`);
    
    if (!res.ok) {
        if (res.status === 404) return null; 
        throw new Error("Error cargando configuración");
    }
    return res.json();
  },

  // Dejamos el envío de mensajes por si la landing tiene un bloque de formulario de contacto
  enviarMensaje: async (formularioData: { nombre: string, apellido: string, email: string, mensaje: string }) => {
    const res = await fetch(`/api/${CLIENT_ID}/enviar-mensaje`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formularioData),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Error al enviar el mensaje. Intente nuevamente.");
    }
    return res.json();
  }
};