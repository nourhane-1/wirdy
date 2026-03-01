// sidebar toggle logic (used on all pages now)
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("sidebarToggle");

if (sidebar && toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("show");
  });
}    
