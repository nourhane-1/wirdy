
const checks = document.querySelectorAll('.part-check');
const newKhatmaBtn = document.getElementById('newKhatmaBtn');
const khatmaNumberEl = document.getElementById('khatmaNumber');
const badge = document.getElementById('completedBadge');
const titleBox = document.querySelector('.title-box');


let khatmaNumber = localStorage.getItem('khatmaNumber')
  ? parseInt(localStorage.getItem('khatmaNumber'))
  : 1;

khatmaNumberEl.textContent = khatmaNumber;


checks.forEach((check, index) => {
  check.checked = localStorage.getItem('part-' + index) === 'true';

  check.addEventListener('change', () => {
    localStorage.setItem('part-' + index, check.checked);
    checkAllParts();
  });
});


function checkAllParts() {
  const allChecked = Array.from(checks).every(ch => ch.checked);

  if (allChecked) {
    newKhatmaBtn.classList.add('active');
    badge.style.display = 'block';
  } else {
    newKhatmaBtn.classList.remove('active');
    badge.style.display = 'none';
  }
}


newKhatmaBtn.addEventListener('click', () => {
  const allChecked = Array.from(checks).every(ch => ch.checked);
  if (!allChecked) return;

  khatmaNumber++;
  localStorage.setItem('khatmaNumber', khatmaNumber);
  khatmaNumberEl.textContent = khatmaNumber;

  
  checks.forEach((ch, index) => {
    ch.checked = false;
    localStorage.setItem('part-' + index, false);
  });


  badge.style.display = 'none';

  titleBox.classList.remove('khatma-animate');
  void titleBox.offsetWidth; 
  titleBox.classList.add('khatma-animate');
});


checkAllParts();
