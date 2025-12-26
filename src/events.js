// Event handler functions
import { getSavedCourses, setSavedCourses, setUsername, setBio } from "./storage.js";
import { displayEnrolledCourses, removeEnrolledCourse } from "./ui.js";

export function handleAddCourseHover(enrolledBox, handleEnrolledHover, handleHoverLeave) {
  return function () {
    let popOption = this.querySelector(".img-option");
    const fileName = this.querySelector("img")?.src.split("/").pop().split(".")[0] || "";

    if (!popOption) {
      popOption = document.createElement("div");
      popOption.className = "img-option";
      popOption.innerHTML = `<img src="assets/addcourse/icon.png" alt="" class='addthiscourse'>\n                          <img src="assets/addcourse/Vector.png" alt="">\n                          <img src="assets/addcourse/Frame.png" alt="">`;
      this.appendChild(popOption);
    }

    popOption.style.display = "flex";

    popOption.querySelector(".addthiscourse").addEventListener("click", () => {
      const toAdd = { book: fileName };
      let savedCourses = getSavedCourses();
      if (!savedCourses.some((c) => c.book === toAdd.book)) {
        savedCourses.push(toAdd);
        setSavedCourses(savedCourses);
        displayEnrolledCourses(enrolledBox, handleEnrolledHover, handleHoverLeave);
      }
    });
  };
}

export function handleEnrolledHover(userBody, enrolledBox, displayEnrolledCourses, handleEnrolledHover, handleHoverLeave) {
  return function () {
    let popOption = this.querySelector(".enrolled-pop-option");
    const fileName = this.querySelector("img")?.src.split("/").pop().split(".")[0] || "";

    if (!popOption) {
      popOption = document.createElement("div");
      popOption.className = "enrolled-pop-option";
      popOption.innerHTML = `<a href="bookspage/${fileName}book.html"><i class="fa-solid fa-eye"></i></a>\n                          <i class="fa-solid fa-circle-minus remove-icon"></i>`;
      this.appendChild(popOption);
    }

    popOption.style.display = "flex";

    popOption.querySelector(".remove-icon").addEventListener("click", () => {
      const confExist = document.querySelector(".unenrollConf");
      if (confExist) confExist.remove();

      const unenrollConf = document.createElement("div");
      unenrollConf.className = "unenrollConf";
      unenrollConf.style.display = "flex";

      const confText = document.createElement("p");
      confText.innerText = "Are you sure you want to unenroll this?";

      const unenrollActions = document.createElement("div");
      unenrollActions.className = "removeActions";

      const confYes = document.createElement("button");
      confYes.className = "removeYes";
      confYes.textContent = "Yes";
      const confNo = document.createElement("button");
      confNo.className = "removeNo";
      confNo.textContent = "No";

      unenrollActions.append(confYes, confNo);
      unenrollConf.append(confText, unenrollActions);

      userBody.append(unenrollConf);

      confYes.addEventListener("click", () => {
        unenrollConf.remove();
        this.remove();
        removeEnrolledCourse(this, enrolledBox, displayEnrolledCourses, handleEnrolledHover, handleHoverLeave);
      });

      confNo.addEventListener("click", () => {
        unenrollConf.remove();
      });
    });
  };
}

export function handleHoverLeave() {
  const popOption =
    this.querySelector(".img-option") ||
    this.querySelector(".enrolled-pop-option");
  if (popOption) popOption.style.display = "none";
}

export function handleLogin(myUsername, setUsername) {
  return function (e) {
    const inputVal = myUsername.value.trim();
    if (!inputVal) {
      e.preventDefault();
      myUsername.focus();
    } else {
      setUsername(inputVal);
    }
  };
}

export function handleBioBlur(bioInput, setBio) {
  return function () {
    setBio(bioInput.value);
  };
}
