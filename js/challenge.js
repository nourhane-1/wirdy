const challengeInput = document.getElementById("challengeInput");
const addBtn = document.getElementById("addBtn");
const challengeList = document.getElementById("challengeList");

const today = new Date().toLocaleDateString("ar-EG");


// the list that will actually be saved in localStorage. we initialize
// it with defaults if nothing was stored before. later we treat every
// challenge the same way, whether it was "built‑in" or user added.
// starting list shown the first time the user opens the page. once a
// value is saved under the "allChallenges" key we always read from that
// instead, so the array below is just a fallback.
const defaultChallenges = [
     { text: "الصلوات الخمس ", done: false },
  { text: "قراءة قرآن", done: false },
    { text: "السنن الرواتب ", done: false },
  { text: "أذكار الصباح والمساء", done: false },
  { text: "صلاة الضحى", done: false },
    { text: "قيام الليل ", done: false },
];

// load the full array of items from storage or fall back to the defaults
// note: this array contains both the default items and any tasks the
// user has added. keeping a single list makes it easy to persist the
// "done" state for every task.
let allChallenges = JSON.parse(localStorage.getItem("allChallenges")) || defaultChallenges.slice();

let lastDate = localStorage.getItem("lastDate");

if (lastDate !== today) {
  // reset the done flag for every challenge, but keep the text
  allChallenges = allChallenges.map(ch => ({ ...ch, done: false }));
  localStorage.setItem("lastDate", today);
  localStorage.setItem("allChallenges", JSON.stringify(allChallenges));
}

// helper to return the array we keep in memory; the old getAllChallenges
// is now just a thin wrapper around the single list.
function getAllChallenges() {
  return allChallenges;
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
      // update the in-memory array and persist immediately
      allChallenges[index].done = checkbox.checked;
      saveAllChallenges();
      renderChallenges();
    });

    const span = document.createElement("span");
    span.textContent = challenge.text;

    li.appendChild(checkbox);
    li.appendChild(span);
    challengeList.appendChild(li);
  });
}


function saveAllChallenges() {
  localStorage.setItem("allChallenges", JSON.stringify(allChallenges));
}

addBtn.addEventListener("click", () => {
  const text = challengeInput.value.trim();
  if (!text) return;

  allChallenges.push({ text, done: false });
  challengeInput.value = "";
  saveAllChallenges();
  renderChallenges();
});

// let the user hit Enter instead of clicking the button
challengeInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});


renderChallenges();
