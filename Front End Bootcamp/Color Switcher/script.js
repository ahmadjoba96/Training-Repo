const red = document.getElementById("red");
const blue = document.getElementById("blue");
const green = document.getElementById("green");

function changeRed() {
    document.body.style.backgroundColor = "red";
    localStorage.setItem("col", "red");
}

function changeBlue() {
    document.body.style.backgroundColor = "blue";
    localStorage.setItem("col", "blue");
}

function changeGreen() {
    document.body.style.backgroundColor = "green";
    localStorage.setItem("col", "green");
}

red.addEventListener("click", changeRed);
blue.addEventListener("click", changeBlue);
green.addEventListener("click", changeGreen);

window.addEventListener("load", () => {
    const saveCol = localStorage.getItem("col");
    if (saveCol) {
        document.body.style.backgroundColor = saveCol;
    }
});