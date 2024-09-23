// declear the main color theme
const mainColor = "#9e78cf";
const secColor = "#3e1671";
const bgColor = "#0d0714";
const secBgColor = "#15101c";
const greenColor = "#78cfb0";
// declear the main element
let ongoingnumber = 0;
let finishednumber = 0;
const toDoText = document.getElementById("toDoText");
const add = document.getElementById("add");
const ongoingTasks = document.querySelector(".tasks");
const ulOngoingTasks = document.querySelector(".ulTask");
const finished = document.querySelector(".finished");
const ulFinished = document.querySelector(".ulFinished");
// on going task blueprint
const li = document.createElement("li");
const div = document.createElement("div");
const icon = document.createElement("i");
icon.classList.add("fa-solid");
const divText = div.cloneNode();
divText.classList.add("text");
const divIcons = div.cloneNode();
divIcons.classList.add("icons");
const checkedIcon = icon.cloneNode(true);
checkedIcon.classList.add("fa-check");
const trashIcon = icon.cloneNode(true);
trashIcon.classList.add("fa-trash");
const undoIcon = icon.cloneNode(true);
undoIcon.classList.add("fa-undo");
li.append(divText);
li.append(divIcons);
//
function ongoingCount() {
  if (ongoingnumber) {
    ongoingTasks.children[0].textContent = `Tasks : ${ongoingnumber}`;
  } else ongoingTasks.children[0].textContent = "";
}
function finishedCount() {
  if (finishednumber) {
    finished.children[0].textContent = `Finished : ${finishednumber}`;
  } else finished.children[0].textContent = "";
}
function creatOngoing() {
  if (toDoText.value) {
    let text = document.createTextNode(toDoText.value);
    let ongoingLi = li.cloneNode(true);
    let chIcon = checkedIcon.cloneNode(true);
    let trIcon = trashIcon.cloneNode(true);
    ongoingLi.childNodes[0].appendChild(text);
    ongoingLi.childNodes[1].appendChild(chIcon);
    ongoingLi.childNodes[1].appendChild(trIcon);
    ulOngoingTasks.appendChild(ongoingLi);
    ongoingnumber++;
    ongoingCount();
    toDoText.value = "";
  }
}
function creatFinished(e) {
  let text = e.children[0].textContent;
  let finishedLi = li.cloneNode(true);
  let unIcon = undoIcon.cloneNode(true);
  finishedLi.childNodes[0].append(text);
  finishedLi.childNodes[1].appendChild(unIcon);
  ulFinished.appendChild(finishedLi);
  finishednumber++;
  finishedCount();
  ongoingnumber--;
  ongoingCount();
  e.remove();
}
//
toDoText.addEventListener("input", () => (toDoText.style.borderColor = "#fff"));
toDoText.addEventListener(
  "blur",
  () => (toDoText.style.borderColor = mainColor)
);
add.addEventListener("click", creatOngoing);
document.addEventListener("click", function (e) {
  if (e.target.classList[1] === "fa-trash") {
    e.target.parentElement.parentElement.remove();
    ongoingnumber--;
    ongoingCount();
  }
});
// console.log(creatOngoing);
document.addEventListener("click", function (e) {
  if (e.target.classList[1] === "fa-check") {
    creatFinished(e.target.parentElement.parentElement);
  }
});
document.addEventListener("click", function (e) {
  if (e.target.classList[1] === "fa-undo") {
    e.target.parentElement.appendChild(checkedIcon.cloneNode(true));
    e.target.parentElement.appendChild(trashIcon.cloneNode(true));
    ongoingTasks.children[1].appendChild(e.target.parentElement.parentElement);
    ongoingnumber++;
    ongoingCount();
    finishednumber--;
    finishedCount();
    e.target.remove();
  }
});
