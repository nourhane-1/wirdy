document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".zekr").forEach(zekr => {

    const key = zekr.dataset.key;
    const max = parseInt(zekr.dataset.max);

    let count = parseInt(localStorage.getItem(key)) || 0;
    update();

    zekr.querySelector(".btn-inc").onclick = () => {
      if (count < max) {
        count++;
        localStorage.setItem(key, count);
        update();
      }
    };

    zekr.querySelector(".btn-reset").onclick = () => {
      count = 0;
      localStorage.setItem(key, 0);
      update();
    };

    function update(){
      zekr.querySelector(".count").innerText = count;
      zekr.querySelector(".progress-bar").style.width =
        (count / max) * 100 + "%";
    }

  });

});

// sidebar toggle (same as index.js; binding immediately since script loaded after DOM)
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("sidebarToggle");
if (sidebar && toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("show");
  });
}