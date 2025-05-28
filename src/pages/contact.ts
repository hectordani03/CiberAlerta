
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const subject = data.get('subject') as string;
    const message = data.get('message') as string;

    // Validación básica
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Todos los campos son obligatorios'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Email no válido'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Validación de longitud de campos
    if (name.length > 100 || subject.length > 200 || message.length > 2000) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Uno o más campos exceden la longitud máxima permitida'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Con EmailJS, la lógica de envío se maneja en el frontend
    // Este endpoint solo valida y responde exitosamente
    // El envío real se hace con EmailJS desde el cliente

    return new Response(JSON.stringify({
      success: true,
      message: 'Datos validados correctamente'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error en la validación:', error);
    
    return new Response(JSON.stringify({
      success: false,
      message: 'Error interno del servidor. Inténtalo más tarde.'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};