// UI functions
import {
  getGoals,
  getSavedCourses,
  setGoal,
  setSavedCourses,
} from "./storage.js";

// banat
// display enrolled courses
export function displayEnrolledCourses(
  enrolledBox,
  handleEnrolledHover,
  handleHoverLeave
) {
  const savedCourses = getSavedCourses();
  enrolledBox.innerHTML = savedCourses
    .map(
      (book) =>
        `<div class="book-enrolled"><img src="../public/assets/MAIN PAGE/${book.book}.png" alt="" /></div>`
    )
    .join("");

  const addCourseButton = `<div class="add-course"><a href="addcourse.html"><img src="../public/assets/MAIN PAGE/addcourse.png" alt="" /></a></div>`;
  enrolledBox.insertAdjacentHTML("beforeend", addCourseButton);

  document.querySelectorAll(".book-enrolled").forEach((book) => {
    book.addEventListener("mouseenter", handleEnrolledHover);
    book.addEventListener("mouseleave", handleHoverLeave);
  });
}

export function removeEnrolledCourse(book) {
  const bookName = book.querySelector("img").src.split("/").pop().split(".")[0];
  let savedCourses = getSavedCourses();
  savedCourses = savedCourses.filter((c) => c.book !== bookName);
  setSavedCourses(savedCourses);
}

// setgoal

export function initGoals(goalsBox, userBody, enrollMsgs) {
  displayGoals(goalsBox);

  //remove goal
  goalsBox.addEventListener("click", (e) => {
    if (e.target.classList.contains("myGoal")) {
      const savedGoals = getGoals();
      const toRemove = savedGoals.filter(
        (x) => x.goal !== e.target.textContent
      );
      setGoal(toRemove);
      displayGoals(goalsBox);
    }

    //add goal / show pop up
    if (e.target.classList.contains("addGoalBtn")) {
      showAddGoalPopUp(goalsBox, userBody, enrollMsgs);
    }
  });
}

function displayGoals(goalsBox) {
  const savedGoals = getGoals();
  if (!Array.isArray(savedGoals)) savedGoals = [];

  goalsBox.innerHTML = "";
  if (savedGoals.length !== 0) {
    goalsBox.innerHTML = savedGoals
      .map(
        (x) =>
          `
  <p class="myGoal">${x.goal}</p>
  `
      )
      .join("");
  }

  const addGoalbtnhtml = `
<i class="fas fa-plus addGoalBtn"></i>
`;
  goalsBox.insertAdjacentHTML("beforeend", addGoalbtnhtml);
}

function showAddGoalPopUp(goalsBox, userBody, enrollMsgs) {
  const userPageBody = document.querySelector(".user-page-body");
  const goalPopUp = `
       <div class="addGoalPopUp">
        <div class="addGoalPopContainer">
          <div class="addGoalPopTop">
            <h1>What's your Goal?</h1>
            <i class="fas fa-times goalClose"></i>
          </div>
          <hr class="goalDivider"/>
          <input placeholder="Enter your goal here.." type="text" class="inputGoal" size="40" />
          <p class="setGoalBtn">Set Goal</p>
        </div>
      </div>
      `;
  userPageBody.insertAdjacentHTML("beforeend", goalPopUp);
  const addGoalPopUp = document.querySelector(".addGoalPopUp");
  const closeAddGoalPop = addGoalPopUp.querySelector(".goalClose");
  const goalInput = addGoalPopUp.querySelector(".inputGoal");
  const printGoal = addGoalPopUp.querySelector(".setGoalBtn");
  addGoalPopUp.style.display = "flex";

  goalInput.focus();
  closeAddGoalPop.addEventListener("click", () => {
    addGoalPopUp.remove();
  });

  printGoal.addEventListener("click", () => {
    setGoalHandler(goalInput, addGoalPopUp, goalsBox, userBody, enrollMsgs);
  });

  goalInput.addEventListener("keydown" , (e) => {
    if (e.key == "Enter") {
    setGoalHandler(goalInput, addGoalPopUp, goalsBox,userBody, enrollMsgs)
    }
  });
}

function setGoalHandler(goalInput, addGoalPopUp, goalsBox,userBody, enrollMsgs) {
  const savedGoals = getGoals();
  const myGoalToadd = goalInput.value.trim();

  if (
    goalInput.value.trim() === "" ||
    savedGoals.some((x) => x.goal === myGoalToadd)
  ) {
    if (goalInput.value === "") {
      enrollMsgs(
        "Please enter a goal.",
        "#F8D7DA",
        "#721C24",
        "#F5C6CB solid 2px",
        userBody
      );
    } else {
      enrollMsgs(
        "You already added this goal.",
        "#F8D7DA",
        "#721C24",
        "#F5C6CB solid 2px",
        userBody
      );
    }
  } else {
    const toAdd = { goal: myGoalToadd };
    const updated = [...savedGoals, toAdd];
    setGoal(updated);

    addGoalPopUp.remove();
    displayGoals(goalsBox);
  }
}
