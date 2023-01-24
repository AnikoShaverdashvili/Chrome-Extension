const colorPickerBtn = document.querySelector("#color-picker");
const colorList = document.querySelector(".all-colors");
const clearAll = document.querySelector(".clear-all");
const pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");
const copyColor = (elem) => {
  navigator.clipboard.writeText(elem.dataset.color);
  elem.innerText = "Copied";
  1;
  setTimeout(() => (elem.innerText = elem.dataset.color), 1000);
};

//Generate li for the picked color and add to the colorList
const showColors = () => {
  if (!pickedColors.length) return;
  colorList.innerHTML = pickedColors
    .map(
      (color) =>
        `<li class="color">
            <span class="rect"style="background:${color};border:1px solid${
          color == "#ffffff" ? "#cccccc" : color
        }"></span>
            <span class="value"data-color=${color}>${color}</span>
          </li>`
    )
    .join("");

  document.querySelector(".picked-colors").classList.remove("hide");

  //Add click event listener to copy color code
  document.querySelectorAll(".color").forEach((li) => {
    li.addEventListener("click", (e) =>
      copyColor(e.currentTarget.lastElementChild)
    );
  });
};

showColors();
const activateEyeDropper = async () => {
  try {
    //Open eyeDropper and get the selected color
    const eyeDropper = new window.EyeDropper();
    const { sRGBHex } = await eyeDropper.open();
    navigator.clipboard.writeText(sRGBHex);

    //Only add the colors that doesnt already exists
    if (!pickedColors.includes(sRGBHex)) {
      pickedColors.push(sRGBHex);
      localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
      showColors();
    }
  } catch (error) {
    console.log(error);
  }
};

//Clear all colors and update local storage
const clearAllColors = () => {
  pickedColors.length = 0;
  localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
  document.querySelector(".picked-colors").classList.add("hide");
};
colorPickerBtn.addEventListener("click", activateEyeDropper);
clearAll.addEventListener("click", clearAllColors);
