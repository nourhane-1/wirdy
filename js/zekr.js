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