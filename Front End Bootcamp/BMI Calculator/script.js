document.getElementById("calc").addEventListener("click", function (e) {
   e.preventDefault()
    const height = document.getElementById("height").valueAsNumber;
    const weight = document.getElementById("weight").valueAsNumber;
    const message = document.getElementById("ans");
    const message2 = document.getElementById("res");

    const ans = weight / ((height * height) / 10000);
    message.innerText = `Your BMI is ${ans.toFixed(2)}`;

    if (ans < 18.5) {
        message2.innerText = "Underweight";
        message2.style.color = "red";
    } else if (ans >= 18.5 && ans <= 24.9) {
        message2.innerText = "Normal weight";
        message2.style.color = "green";
    } else if (ans >= 25 && ans <= 29.9) {
        message2.innerText = "Overweight";
        message2.style.color = "blue";
    } else {
        message2.innerText = "Obese";
        message2.style.color = "orange";
    }
});