/*
  - Calculator (https://github.com/leonardomeza87/calculator)
  - Author: Leonardo Meza (https://github.com/leonardomeza87)
  - Twitter: (https://twitter.com/leonardomeza87)
*/

import inputs from "./inputs.js";
import correctHeight from "./correct-height.js";
import info from "./info.js";
import switchTheme from "./switch-theme.js";
import SWinstaller from "./sw-installer.js";

correctHeight();

const d = document,
  w = window,
  $record = d.getElementById("record"),
  $display = d.getElementById("display"),
  E = 2.71828;

window.onload = displayFocus();

export function displayFocus() {
  $display.focus();
}

w.addEventListener("DOMContentLoaded", () => {
  inputs();
  info();
  switchTheme();
  SWinstaller();
});

let operation = "";
let symbol = false;
let mode = "normal";
let dot = false;
let savedOperation = "";

//Testing zone

function refine(Value) {
  let float = parseFloat(Value).toFixed(4);
  let integral = "";
  let decimal = "";
  let div = false;
  let exponecial = false;

  for (let i = 0; i < float.length; i++) {
    if (div) {
      decimal += float[i];
    } else {
      if (float[i] === ".") {
        div = true;
      } else {
        integral += float[i];
      }
    }
    if (float[i] === "e") {
      exponecial = true;
    }
  }

  if (!exponecial) {
    for (let i = 0; i < 4; i++) {
      if (decimal[decimal.length - 1] === "0") {
        decimal = decimal.slice(0, -1);
      }
    }
  }

  if (decimal.length > 0) {
    return integral + "." + decimal;
  } else {
    return integral;
  }
}

//Clean everything when recharging
clearAll();

export function calculateAll() {
  let rebuild = "",
    result = "",
    exclusiveOperation = "";

  //Rebuilding the operation for its transformation into an array
  //Normal mode
  if (mode !== "sqrt") {
    //If the length of the operation is longer than one
    if (operation.length !== 1) {
      //The penultimate element is a symbol
      if (isNaN(operation[operation.length - 2])) {
        if (operation[operation.length - 2] === ".") {
          rebuild = operation + " ";
        }
        //The penultimate element is an "e"
        else if (operation[operation.length - 2] === "e") {
          for (let i = 0; i < operation.length - 2; i++) {
            rebuild += operation[i];
          }
          exclusiveOperation = operation + " ";

          rebuild *= E;
          rebuild += " ";
          symbol = false;
          dot = false;
        } else if (operation[operation.length - 3] === "e") {
          for (let i = 0; i < operation.length - 3; i++) {
            rebuild += operation[i];
          }
          exclusiveOperation = operation + " ";

          rebuild *= Math.pow(10, Number(operation[operation.length - 1]));
          rebuild += " ";
          symbol = false;
          dot = false;
        } else {
          for (let i = 0; i < operation.length - 2; i++) {
            rebuild += operation[i];
          }
          symbol = false;
          dot = false;
        }
      }
      //The last element is a dot or an "e"
      else if (isNaN(operation[operation.length - 1])) {
        //The last element is a dot
        if (operation[operation.length - 1] === ".") {
          for (let i = 0; i < operation.length - 1; i++) {
            rebuild += operation[i];
          }
          rebuild += " ";
          symbol = false;
          dot = false;
        }
        //The last element is an "e"
        else if (operation[operation.length - 1] === "e") {
          for (let i = 0; i < operation.length - 1; i++) {
            rebuild += operation[i];
          }
          exclusiveOperation = operation + " ";

          rebuild = rebuild * E;
          rebuild += " ";
          symbol = false;
          dot = false;
        }
      }
      //The last element is a number
      else {
        rebuild = operation + " ";
      }
    }
    //Is a number
    else {
      rebuild = operation + " ";
    }
  }
  //Root mode
  else {
    if (isNaN(operation[operation.length - 1])) {
      for (let i = 0; i < operation.length - 1; i++) {
        rebuild += operation[i];
      }
      rebuild += " ";
    } else {
      rebuild = operation + " ";
    }
  }
  console.log("Rebuild: <" + rebuild + ">");

  //Convert operation to array
  result = rebuild.split(" ");
  //Remove excess
  result.pop();
  console.log(result);

  let numbers = [];
  let temp = 0;
  let waiting = false;
  let newArray = [];
  let j = 0;

  //Save operation in history
  savedOperation = exclusiveOperation.split(" ").join(" ") || result.join(" ");
  let recordValue = exclusiveOperation.split(" ").join("") || result.join("");

  //Normal mode
  if (mode === "normal") {
    function clearValues() {
      numbers = [];
      temp = 0;
      waiting = false;
      newArray = [];
      j = 0;
    }

    operations("^");
    operations("*/");
    operations("+-");

    function operations(mode) {
      //Clear things
      clearValues();
      let tempSign = "";

      //Main process
      for (let i = 0; i < result.length; i++) {
        let element = result[i];

        //What operation to do
        let modeSign1 = "";
        let modeSign2 = "";

        if (mode === "^") {
          modeSign1 = "^";
          modeSign2 = "^";
        } else if (mode === "*/") {
          modeSign1 = "x";
          modeSign2 = "/";
        } else if (mode === "+-") {
          modeSign1 = "+";
          modeSign2 = "-";
        }

        //If an operation is not waiting
        if (!waiting) {
          //Is a number
          if (!isNaN(element)) {
            numbers[i] = element;
            newArray[j] = element;
            j++;
            console.log(numbers[i]);
          }
          //Is a symbol
          else if (element === modeSign1 || element === modeSign2) {
            temp = parseFloat(numbers[i - 1]);
            tempSign = element;
            console.log(tempSign);
            waiting = true;
          }
          //Is a dot
          else {
            numbers[i] = element;
            newArray[j] = element;
            j++;
            console.log(numbers[i]);
          }
        }
        //Operations
        else {
          numbers[i] = element;
          console.log(numbers[i]);

          //Selecting operation
          if (mode === "^") {
            temp **= parseFloat(numbers[i]);
          } else if (mode === "*/") {
            if (tempSign === "x") {
              temp *= parseFloat(numbers[i]);
            } else {
              temp /= parseFloat(numbers[i]);
            }
          } else if (mode === "+-") {
            if (tempSign === "+") {
              temp += parseFloat(numbers[i]);
            } else {
              temp -= parseFloat(numbers[i]);
            }
          }

          //Writing result
          console.log("Result: <" + temp + ">");
          newArray[--j] = temp;
          j++;
          numbers[i] = temp;
          waiting = false;
        }
      }
      console.log(newArray);
      result = newArray;
    }
  }

  //Root mode
  else if (mode === "sqrt") {
    //Remove root
    result.shift();
    console.log("Root of: <" + result + ">");

    //Calculate root
    result = Math.sqrt(parseFloat(result));
    console.log("Result: <" + result + ">");

    //Return to normal mode
    mode = "normal";
  }

  clearAll();

  //If the result is empty
  if (result.length === 0) {
    result = 0;
  }

  console.log("Refining: " + result);
  setValue(refine(result));
  $record.value = recordValue;

  //Check if the result contains a dot
  for (let i = 0; i < operation.length; i++) {
    if (operation[i] === ".") {
      //Prevent another dot from being placed
      dot = true;
    }
  }
}

//Get input value
export function enterEntry(btn) {
  let input = btn.trim();
  // console.log(operation.length);

  //If it is the first entry
  if (operation.length === 0) {
    //If it's a number
    if (!isNaN(input)) {
      setValue(input);
    }
    //If the symbol is a root
    else if (input === "√") {
      mode = "sqrt";
      setValue(input);
    } else if (input === "-") {
      symbol = true;
      setValue("0");
      setValue(input);
    }
  }
  //If it is not the first entry
  else {
    //If a symbol has already been entered
    if (symbol) {
      //Only numbers
      if (!isNaN(input)) {
        symbol = false;
        setValue(input);
      }
    } else {
      //Is a symbol, the mode is normal and it is not a root
      if (isNaN(input) && mode === "normal") {
        //Is not a root
        if (input !== "√") {
          //If it is a dot
          if (input === ".") {
            if (dot === false) {
              symbol = true;
              setValue(input);
            }
          } else {
            symbol = true;
            setValue(input);
          }
        }
      }
      //Is a number, the mode is normal
      else if (mode === "normal") {
        if (operation[0] === "0" && operation.length === 1 && input !== 0) {
          // console.log("aaa");
          operation = "";
          $display.value = "";
          setValue(input);
        } else {
          setValue(input);
        }
      }
      //Mode root
      else {
        //Is a symbol
        if (isNaN(input)) {
          if (input === ".") {
            setValue(input);
          }
        }
        //Is a number
        else {
          setValue(input);
        }
      }
    }
  }
}

//Checks before adding entry
function setValue(value) {
  //If it is not the first entry
  if (operation.length !== 0) {
    //It's a number
    if (!isNaN(value)) {
      addValue(value);
    }
    //Is a dot
    else if (value === ".") {
      if (mode === "sqrt") {
        if (operation.length !== 2) {
          if (dot === false) {
            dot = true;
            addValue(value);
          }
        }
      } else {
        if (dot === false) {
          dot = true;
          addValue(value);
        }
      }
    }
    //Is a symbol
    else {
      dot = false;
      addValue(value, true);
    }
  } else {
    addValue(value);
  }
}

//Add entry
function addValue(entry, isSymbol) {
  if (isSymbol) {
    operation += " " + entry + " ";
  } else {
    if (entry === "√") {
      operation += entry + " ";
    } else {
      operation += entry;
    }
  }
  $display.value += entry;
  console.log("Adding: <" + operation + ">");
}

//Clean everything
export function clearAll(deleteHistory) {
  $record.value = "";
  $display.value = "";
  operation = "";
  if (deleteHistory) {
    savedOperation = "";
  }
  symbol = false;
  mode = "normal";
  dot = false;
  //console.clear();
}

//Clean only one entry
export function clear() {
  let rebuild = "";

  //If the operation is not empty
  if (operation.length !== 0) {
    //If the last character is a space
    if (operation[operation.length - 1] === " ") {
      console.log("Cleaning symbol...");
      if (operation.length === 2) {
        mode = "normal";
      }
      for (let i = 0; i < operation.length - 3; i++) {
        rebuild += operation[i];
      }
      symbol = false;
    }
    //If the last character is a dot
    else if (operation[operation.length - 1] === ".") {
      console.log("Cleaning dot...");
      for (let i = 0; i < operation.length - 1; i++) {
        rebuild += operation[i];
      }
      symbol = false;
      dot = false;
    }
    //If the last character is a number
    else {
      console.log("Cleaning number...");
      if (mode === "sqrt") {
        for (let i = 0; i < operation.length - 1; i++) {
          rebuild += operation[i];
        }
      } else {
        for (let i = 0; i < operation.length - 1; i++) {
          rebuild += operation[i];
        }

        let preCheck = rebuild[rebuild.length - 2];
        let lastCheck = rebuild[rebuild.length - 1];

        if (
          preCheck === "+" ||
          preCheck === "-" ||
          preCheck === "x" ||
          preCheck === "/"
        ) {
          //There is a symbol
          symbol = true;
        } else if (lastCheck === ".") {
          //There is a dot
          symbol = true;
        }
      }
    }
    operation = rebuild;

    //Clean spaces
    rebuild = "";
    for (let i = 0; i < operation.length; i++) {
      if (operation[i] !== " ") {
        rebuild += operation[i];
      } else {
        continue;
        console.log("Cleaning space");
      }
    }
    $display.value = rebuild;

    console.log("Result: <" + operation + ">");
  } else {
    console.log("Empty");
  }
}

$record.addEventListener("click", function () {
  if (savedOperation !== "") {
    let recordTemp = savedOperation;
    savedOperation = "";
    clearAll();
    for (let i = 0; i < recordTemp.length; i++) {
      if (recordTemp[i] === "√") {
        mode = "sqrt";
      } else if (recordTemp[i] === ".") {
        dot = true;
      }
    }
    addValue(recordTemp);
    recordTemp += " ";
    $display.value = recordTemp.split(" ").join("");
  }
});
