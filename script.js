const colorPickerBtn = document.querySelector("#color-picker");
const colorList = document.querySelector(".all-colors");
const pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");
const copyColor = (elem) => {
  navigator.clipboard.writeText(elem.dataset.color);
};
const showColors = () => {
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
    .join(""); //Generate li for the picked color and add to the colorList
};

//Add a click eventlistener to each color element to copy the color code

document.querySelectorAll(".color").forEach((li) => {
  li.addEventListener("click", (e) =>
    copyColor(e.currentTarget.lastElementChild)
  );
});

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
colorPickerBtn.addEventListener("click", activateEyeDropper);
