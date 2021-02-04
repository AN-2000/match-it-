let colors = ["#fa8231", "#eb3b5a", "#2bcbba", "#4b6584", "#8854d0"];
let score = 0;
let negScore = 0;
let allAns = document.querySelectorAll(".options .ans");
let allChoices = document.querySelectorAll(".choices");
let scoreText = document.querySelector("p");
let cNum = 0;

for (let i = 0; i < allAns.length; i++) {
  allAns[i].style.background = colors[i];
  allAns[i].addEventListener("dragover", function (e) {
    e.preventDefault();
  });

  allAns[i].addEventListener("drop", function (e) {
    let data = e.dataTransfer.getData("text").split("/");
    if (data[1] === "none") return;
    if (data[1] == e.target.style.background) {
      score++;
    } else {
      negScore++;
    }
    scoreText.innerText = `SCORE : ${score - negScore}`;
    document.getElementById(data[0]).style.background = "none";
    document.getElementById(data[0]).draggable = false;
    if (negScore + score == cNum) {
        alert(`SCORE : ${score - negScore}`);
        history.go()
    }
  });
}

for (let j = 0; j < allChoices.length; j++) {
  if (Math.random() > 0.5) {
    allChoices[j].style.background = colors[Math.floor(Math.random() * 5)];
    allChoices[j].draggable = true;
    cNum++;
    allChoices[j].addEventListener("dragstart", function (e) {
      let id = uid();
      e.target.id = id;
      e.dataTransfer.setData("text", id + "/" + e.target.style.background);
    });
  }
}

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
