const colorPickerBtn = document.querySelector("#color-picker");
const colorList = document.querySelector(".all-colors");
const pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");

const showColors = () => {
  colorList.innerHTML = pickedColors
    .map(
      (color) =>
        `<li class="color">
            <span class="rect"></span>
            <span class="value">${color}</span>
          </li>`
    )
    .join("");
};

const activateEyeDropper = async () => {
  try {
    //Open eyeDropper and get the selected color
    const eyeDropper = new window.EyeDropper();
    const { sRGBHex } = await eyeDropper.open();
    navigator.clipboard.writeText(sRGBHex);
    pickedColors.push(sRGBHex);
    localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
  } catch (error) {
    console.log(error);
  }
};
colorPickerBtn.addEventListener("click", activateEyeDropper);
