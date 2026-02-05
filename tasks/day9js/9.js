/* DC SLIDER */
let dcImages = [
  "images/dc1.jpeg",
  "images/dc2.jpeg",
  "images/dc3.jpeg",
  "images/dc4.jpeg",
  "images/dc5.jpeg",
];
let dcIndex = 0;

function nextDC() {
  dcIndex = (dcIndex + 1) % dcImages.length;
  dcImg.src = dcImages[dcIndex];
}

function prevDC() {
  dcIndex = (dcIndex - 1 + dcImages.length) % dcImages.length;
  dcImg.src = dcImages[dcIndex];
}

/* RCB SLIDER */
let rcbImages = [
  "images/rcb1.jpeg",
  "images/rcb2.jpeg",
  "images/rcb3.jpeg",
  "images/rcb4.jpeg",
  "images/rcb5.jpeg",
];
let rcbIndex = 0;

function nextRCB() {
  rcbIndex = (rcbIndex + 1) % rcbImages.length;
  rcbImg.src = rcbImages[rcbIndex];
}

function prevRCB() {
  rcbIndex = (rcbIndex - 1 + rcbImages.length) % rcbImages.length;
  rcbImg.src = rcbImages[rcbIndex];
}

/* TOGGLE */
function toggleBox(id) {
  let box = document.getElementById(id);
  box.style.display = box.style.display === "none" ? "block" : "none";
}

/* COUNTER */
let count = 0;

function increment() {
  count++;
  countSpan();
}

function decrement() {
  count--;
  countSpan();
}

function countSpan() {
  document.getElementById("count").innerText = count;
}
