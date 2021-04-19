import {
  enterEntry,
  displayFocus,
  calculateAll,
  clear,
  clearAll,
} from "./app.js";

const d = document,
  $zero = d.getElementById("zero"),
  $one = d.getElementById("one"),
  $two = d.getElementById("two"),
  $three = d.getElementById("three"),
  $four = d.getElementById("four"),
  $five = d.getElementById("five"),
  $six = d.getElementById("six"),
  $seven = d.getElementById("seven"),
  $eight = d.getElementById("eight"),
  $nine = d.getElementById("nine"),
  $clear = d.getElementById("clear"),
  $clearAll = d.getElementById("clearAll"),
  $add = d.getElementById("add"),
  $subtract = d.getElementById("subtract"),
  $multiply = d.getElementById("multiply"),
  $divide = d.getElementById("divide"),
  $decimal = d.getElementById("decimal"),
  $power = d.getElementById("power"),
  $root = d.getElementById("root"),
  $equals = d.getElementById("equals");

export default function inputs() {
  //Click
  d.addEventListener("click", (e) => {
    let $btn = e.target,
      btn = $btn.textContent;

    switch ($btn) {
      //Numbers
      case $zero:
        enterEntry(btn);
        break;
      case $one:
        enterEntry(btn);
        break;
      case $two:
        enterEntry(btn);
        break;
      case $three:
        enterEntry(btn);
        break;
      case $four:
        enterEntry(btn);
        break;
      case $five:
        enterEntry(btn);
        break;
      case $six:
        enterEntry(btn);
        break;
      case $seven:
        enterEntry(btn);
        break;
      case $eight:
        enterEntry(btn);
        break;
      case $nine:
        enterEntry(btn);
        break;

      //Operators
      case $clear:
        clear();
        break;
      case $clearAll:
        clearAll(true);
        break;
      case $add:
        enterEntry(btn);
        break;
      case $subtract:
        enterEntry(btn);
        break;
      case $multiply:
        enterEntry("x");
        break;
      case $divide:
        enterEntry(btn);
        break;
      case $decimal:
        enterEntry(btn);
        break;
      case $power:
        enterEntry(btn);
        break;
      case $root:
        enterEntry(btn);
        break;
      case $equals:
        calculateAll();
        break;
    }
  });

  //Keyboard
  d.addEventListener("keydown", (e) => {
    let key = e.key;

    switch (key) {
      //Numbers
      case "0":
        enterEntry(key);
        break;
      case "1":
        enterEntry(key);
        break;
      case "2":
        enterEntry(key);
        break;
      case "3":
        enterEntry(key);
        break;
      case "4":
        enterEntry(key);
        break;
      case "5":
        enterEntry(key);
        break;
      case "6":
        enterEntry(key);
        break;
      case "7":
        enterEntry(key);
        break;
      case "8":
        enterEntry(key);
        break;
      case "9":
        enterEntry(key);
        break;

      //Operators
      case "+":
        enterEntry(key);
        break;
      case "-":
        enterEntry(key);
        break;
      case "*":
      case "x":
        enterEntry("x");
        break;
      case "/":
        enterEntry(key);
        break;
      case ".":
        enterEntry(key);
        break;
      case "Enter":
        calculateAll();
        break;
      case "Backspace":
      case "Delete":
        if (e.ctrlKey || e.altKey) {
          clearAll(true);
        } else {
          clear();
        }
        break;

      default:
        //console.log(key);
        break;
    }
    displayFocus();
  });
}
