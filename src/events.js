// Event handler functions
import {
  getSavedCourses,
  setSavedCourses,
  setUsername,
  setBio,
  getLikes,
  setLikes,
} from "./storage.js";
import { displayEnrolledCourses, removeEnrolledCourse } from "./ui.js";
import { ilikeu } from "./addcourse.js";

// banat
export function handleAddCourseHover(
  userBody,
  enrolledBox,
  handleEnrolledHover,
  handleHoverLeave
) {
  return function () {
    let popOption = this.querySelector(".img-option");

    const fileName =
      this.querySelector("img")?.src.split("/").pop().split(".")[0] || "";

    if (!popOption) {
      popOption = document.createElement("div");
      popOption.className = "img-option";
      popOption.innerHTML = `<img src="assets/addcourse/icon.png" alt="" class='addthiscourse'>\n   
            <i class="fa-solid fa-heart like-button"></i>\n                
                      <img src="assets/addcourse/Frame.png" alt="">`;
      this.appendChild(popOption);
    }

    popOption.style.display = "flex";

    const likeButton = popOption.querySelector(".like-button");
    const savedLikes = getLikes();
    if (!Array.isArray(savedLikes)) savedLikes = [];

    const checkLikesList = savedLikes.some((x) => x.like === fileName);
    likeButton.style.color = checkLikesList ? "red" : "";

    const toAdd = {
      like: fileName,
    };
    if (!likeButton.dataset.clicked) {
      likeButton.addEventListener("click", () => {
        ilikeu(getLikes, setLikes, toAdd, likeButton);
      });

      likeButton.dataset.clicked = true;
    }

    popOption.querySelector(".addthiscourse").addEventListener("click", () => {
      const addCourseModalExist = document.querySelector(".addCourseModal");
      if (addCourseModalExist) addCourseModalExist.remove();

      const addCourseModal = document.createElement("div");
      addCourseModal.className = "addCourseModal";
      addCourseModal.style.display = "flex";

      const text = document.createElement("p");
      text.innerText = "Do you want to add this course?";
      text.className = "confText";

      const addCourseActions = document.createElement("div");
      addCourseActions.className = "removeActions";

      const confYes = document.createElement("button");
      confYes.className = "removeYes";
      confYes.textContent = "Yes";
      const confNo = document.createElement("button");
      confNo.className = "removeNo";
      confNo.textContent = "No";

      addCourseActions.append(confYes, confNo);
      addCourseModal.append(text, addCourseActions);
      userBody.append(addCourseModal);

      confYes.addEventListener("click", () => {
        addCourseModal.remove();
        const toAdd = { book: fileName };
        let savedCourses = getSavedCourses();
        if (!savedCourses.some((c) => c.book === toAdd.book)) {
          savedCourses.push(toAdd);
          setSavedCourses(savedCourses);

          enrollMsgs(
            "Course added.",
            "#D4EDDA",
            "#155724",
            "#C3E6CB solid 2px",
            userBody
          );
        } else {
          enrollMsgs(
            "You are already enrolled in this course!",
            "#F8D7DA",
            "#721C24",
            "#F5C6CB solid 2px",
            userBody
          );
        }
      });

      confNo.addEventListener("click", () => {
        addCourseModal.remove();
      });
    });
  };
}

export function handleEnrolledHover(
  userBody,
  enrolledBox,
  displayEnrolledCourses,
  handleEnrolledHover,
  handleHoverLeave
) {
  return function () {
    let popOption = this.querySelector(".enrolled-pop-option");
    const fileName =
      this.querySelector("img")?.src.split("/").pop().split(".")[0] || "";

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
      confText.className = "confText";

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
      const enrollMsg = document.createElement("div");
      enrollMsg.className = "enrollMsg";

      confYes.addEventListener("click", () => {
        unenrollConf.remove();
        this.remove();
        removeEnrolledCourse(this);

        enrollMsgs(
          "Course removed.",
          "#F8D7DA",
          "#721C24",
          "#F5C6CB solid 2px",
          userBody
        );
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

export function enrollMsgs(message, bgColor, color, border, userBody) {
  const enrollMsg = document.createElement("div");
  enrollMsg.className = "enrollMsg";
  enrollMsg.innerHTML = `
          <p>${message}</p>
          `;
  enrollMsg.style.background = `${bgColor}`;
  enrollMsg.style.color = `${color}`;
  enrollMsg.style.border = `${border}`;

  userBody.append(enrollMsg);
  enrollMsg.style.display = "flex";
  setTimeout(() => {
    enrollMsg.remove();
  }, 3000);
}
