
  const totalPages = 604;
  const container = document.getElementById('book-container');

 
  for (let i = 1; i <= totalPages; i++) {
    const img = document.createElement('img');
    img.dataset.src = `images/${i}.jpg`;
   
 
    img.alt = `صفحة ${i}`;
    img.className = 'page';
    container.appendChild(img);
  }


  const lazyImages = document.querySelectorAll('img[data-src]');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, { rootMargin: "200px 0px" }); 

  lazyImages.forEach(img => observer.observe(img));
  const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("sidebarToggle");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("show");
});

