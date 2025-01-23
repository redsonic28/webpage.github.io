document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const notification = document.getElementById("notification");
  
    if (!form) {
      console.error("Formulario no encontrado en el DOM.");
      return;
    }
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Evitar recarga de la página
  
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
  
      if (!email) {
        showNotification("El campo de email está vacío.", "danger");
        return; // Detener la ejecución si no hay email
      }
      if (!message) {
        showNotification("El campo de mensaje está vacío.", "danger");
        return; // Detener la ejecución si no hay mensaje
      }
  
      try {
        // Insertar en la base de datos Supabase
        const { data, error } = await supabase
          .from("messages")
          .insert([{ email, message }]);
  
        if (error) {
          console.error("Error al enviar datos a Supabase:", error);
          showNotification("Error al enviar los datos. Revisa la consola para más detalles.", "danger");
          return;
        }
  
        // Si todo sale bien, mostrar el mensaje de éxito
        showNotification("¡Mensaje enviado con éxito!", "success");
  
        // Resetear el formulario
        form.reset();
  
        // Redirigir al usuario después de 3 segundos
        setTimeout(() => {
          window.location.href = href="/html/perfil.html"; // Cambia la URL según tu página
        }, 3000); // 3000 ms = 3 segundos
      } catch (err) {
        console.error("Error inesperado:", err);
        showNotification("Error inesperado. Por favor, intenta más tarde.", "danger");
      }
    });
  
    // Función para mostrar las notificaciones
    function showNotification(message, type) {
      notification.classList.remove("d-none"); // Mostrar la notificación
      notification.classList.add(`alert-${type}`); // Añadir el tipo de alerta (success/danger)
      notification.textContent = message; // Establecer el mensaje
  
      // Ocultar la notificación después de 5 segundos
      setTimeout(() => {
        notification.classList.add("d-none"); // Ocultar la notificación
      }, 5000);
    }
  });
  