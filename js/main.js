/* ==========================================================
   ECONOMODA - LÓGICA DEL FRONT (maqueta)
   Solo interacciones básicas: menú activo y modal de suscripción.
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* --------------------------------------------------------
     1. MENÚ: marcar como activa la sección en la que se hace clic
     (quita la clase "activo" del anterior y se la pone al nuevo)
     -------------------------------------------------------- */
  const linksMenu = document.querySelectorAll(".menu__link");

  linksMenu.forEach((link) => {
    link.addEventListener("click", (evento) => {
      evento.preventDefault(); // es una maqueta: no navega a ninguna parte

      linksMenu.forEach((l) => l.classList.remove("menu__link--activo"));
      link.classList.add("menu__link--activo");
    });
  });


  /* --------------------------------------------------------
     2. MODAL DE SUSCRIPCIÓN
     Se abre desde: botón "Suscribite", ícono de usuario
     y notas marcadas como "Solo suscriptores".
     -------------------------------------------------------- */
  const modal = document.getElementById("modal");

  function abrirModal() {
    modal.hidden = false;
  }

  function cerrarModal() {
    modal.hidden = true;
  }

  // Elementos que abren el modal
  document.querySelectorAll("[data-abrir-modal]").forEach((boton) => {
    boton.addEventListener("click", abrirModal);
  });

  // Notas premium: en vez de abrir la nota, piden suscripción
  document.querySelectorAll("[data-nota-premium]").forEach((nota) => {
    nota.addEventListener("click", (evento) => {
      evento.preventDefault();
      abrirModal();
    });
  });

  // Elementos que cierran el modal (botón X y botón principal)
  document.querySelectorAll("[data-cerrar-modal]").forEach((boton) => {
    boton.addEventListener("click", cerrarModal);
  });

  // Cerrar al hacer clic en el fondo oscuro (fuera de la caja)
  modal.addEventListener("click", (evento) => {
    if (evento.target === modal) cerrarModal();
  });

  // Cerrar con la tecla Escape
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && !modal.hidden) cerrarModal();
  });


  /* --------------------------------------------------------
     3. LINKS DE NOTAS: como es una maqueta, evitamos que
     el "#" suba la página al inicio al hacer clic.
     -------------------------------------------------------- */
  document
    .querySelectorAll(".nota__enlace:not([data-nota-premium]), .portada__enlace, .logo")
    .forEach((enlace) => {
      enlace.addEventListener("click", (evento) => evento.preventDefault());
    });
});
