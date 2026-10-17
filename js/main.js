/* ==========================================================
   ECONOMODA - LÓGICA DEL FRONT (maqueta)
   Interacciones básicas: menú activo, modal de suscripción
   y modal de login.
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* --------------------------------------------------------
     1. MENÚ: marcar como activa la sección en la que se hace clic
     - Los links con href="#" son de la maqueta (todavía no tienen página):
       no navegan y solo cambian la sección activa.
     - Los links con una página real (ej: Quiénes somos) navegan normalmente;
       la sección activa de cada página ya viene marcada en su HTML.
     -------------------------------------------------------- */
  const linksMenu = document.querySelectorAll(".menu__link");

  linksMenu.forEach((link) => {
    link.addEventListener("click", (evento) => {
      if (link.getAttribute("href") !== "#") return; // página real: deja navegar

      evento.preventDefault();
      linksMenu.forEach((l) => l.classList.remove("menu__link--activo"));
      link.classList.add("menu__link--activo");
    });
  });

  // En mobile el menú se desplaza: mostramos la sección activa a la vista
  // (así "Quiénes somos", que está al final, no queda escondida)
  const linkActivo = document.querySelector(".menu__link--activo");
  if (linkActivo) {
    linkActivo.scrollIntoView({ inline: "center", block: "nearest" });
  }


  /* --------------------------------------------------------
     2. FUNCIONES COMUNES DE LOS MODALES
     Sirven para cualquier modal (suscripción y login).
     -------------------------------------------------------- */
  const modalSuscripcion = document.getElementById("modal");
  const modalLogin = document.getElementById("modal-login");

  function abrirModal(modal) {
    modal.hidden = false;
  }

  function cerrarModal(modal) {
    modal.hidden = true;
  }

  // Cierra cualquier modal que esté abierto
  function cerrarTodos() {
    document.querySelectorAll(".modal").forEach(cerrarModal);
  }

  // Botones X y botones de cierre: cierran el modal que los contiene
  document.querySelectorAll("[data-cerrar-modal]").forEach((boton) => {
    boton.addEventListener("click", () => cerrarModal(boton.closest(".modal")));
  });

  // Clic en el fondo oscuro (fuera de la caja): cierra ese modal
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (evento) => {
      if (evento.target === modal) cerrarModal(modal);
    });
  });

  // Tecla Escape: cierra el modal abierto
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") cerrarTodos();
  });


  /* --------------------------------------------------------
     3. MODAL DE SUSCRIPCIÓN
     Se abre desde: botón "Suscribite" y notas "Solo suscriptores".
     -------------------------------------------------------- */
  document.querySelectorAll("[data-abrir-modal]").forEach((boton) => {
    boton.addEventListener("click", () => abrirModal(modalSuscripcion));
  });

  // Notas premium: en vez de abrir la nota, piden suscripción
  document.querySelectorAll("[data-nota-premium]").forEach((nota) => {
    nota.addEventListener("click", (evento) => {
      evento.preventDefault();
      abrirModal(modalSuscripcion);
    });
  });


  /* --------------------------------------------------------
     4. MODAL DE LOGIN
     Se abre desde el ícono de usuario del header.
     -------------------------------------------------------- */
  const formLogin = document.getElementById("form-login");
  const inputCorreo = document.getElementById("login-correo");
  const errorLogin = document.getElementById("login-error");

  document.querySelectorAll("[data-abrir-login]").forEach((boton) => {
    boton.addEventListener("click", () => {
      abrirModal(modalLogin);
      inputCorreo.focus(); // el cursor queda listo para escribir
    });
  });

  // Al enviar el formulario: validamos el correo (maqueta, no se envía a ningún servidor)
  formLogin.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const correoValido = inputCorreo.checkValidity() && inputCorreo.value.trim() !== "";
    errorLogin.hidden = correoValido;

    if (correoValido) {
      formLogin.reset();
      cerrarModal(modalLogin);
    }
  });

  // Al volver a escribir se oculta el mensaje de error
  inputCorreo.addEventListener("input", () => {
    errorLogin.hidden = true;
  });

  // El link "Registrate" no navega a ningún lado (maqueta)
  document.querySelectorAll("[data-registro]").forEach((link) => {
    link.addEventListener("click", (evento) => evento.preventDefault());
  });


  /* --------------------------------------------------------
     5. LINKS DE LA MAQUETA: los que tienen href="#" no hacen nada
     (evita que la página suba al inicio al hacer clic).
     Los links a páginas reales (logo, menú) navegan normalmente.
     -------------------------------------------------------- */
  document.querySelectorAll('a[href="#"]').forEach((enlace) => {
    enlace.addEventListener("click", (evento) => evento.preventDefault());
  });
});
