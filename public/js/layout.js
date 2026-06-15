console.log("layout.js cargado");

window.addEventListener("DOMContentLoaded", () => {
  fetch("/sidebar.html")
    .then(r => r.text())
    .then(html => {
      const container = document.getElementById("sidebar-container");
      if (!container) {
        console.error("No existe sidebar-container");
        return;
      }
      container.innerHTML = html;
    });
});