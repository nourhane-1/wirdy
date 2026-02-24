const challengeInput = document.getElementById("challengeInput");
const addBtn = document.getElementById("addBtn");
const challengeList = document.getElementById("challengeList");

const today = new Date().toLocaleDateString("ar-EG");


const defaultChallenges = [
     { text: "الصلوات الخمس ", done: false },
  { text: "قراءة قرآن", done: false },
    { text: "السنن الرواتب ", done: false },
  { text: "أذكار الصباح والمساء", done: false },
  { text: "صلاة الضحى", done: false },
    { text: "قيام الليل ", done: false },
];

let userChallenges = JSON.parse(localStorage.getItem("userChallenges")) || [];


let lastDate = localStorage.getItem("lastDate");


if (lastDate !== today) {
  userChallenges = userChallenges.map(ch => ({ ...ch, done: false }));
  localStorage.setItem("lastDate", today);
  localStorage.setItem("userChallenges", JSON.stringify(userChallenges));
}


function getAllChallenges() {
  return [...defaultChallenges, ...userChallenges];
}


function renderChallenges() {
  challengeList.innerHTML = "";

  getAllChallenges().forEach((challenge, index) => {
    const li = document.createElement("li");
    if (challenge.done) li.classList.add("done");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = challenge.done;

    checkbox.addEventListener("change", () => {
      if (index >= defaultChallenges.length) {
        userChallenges[index - defaultChallenges.length].done = checkbox.checked;
        saveUserChallenges();
      } else {
        defaultChallenges[index].done = checkbox.checked;
      }
      renderChallenges();
    });

    const span = document.createElement("span");
    span.textContent = challenge.text;

    li.appendChild(checkbox);
    li.appendChild(span);
    challengeList.appendChild(li);
  });
}


function saveUserChallenges() {
  localStorage.setItem("userChallenges", JSON.stringify(userChallenges));
}

addBtn.addEventListener("click", () => {
  const text = challengeInput.value.trim();
  if (!text) return;

  userChallenges.push({ text, done: false });
  challengeInput.value = "";
  saveUserChallenges();
  renderChallenges();
});


renderChallenges();
