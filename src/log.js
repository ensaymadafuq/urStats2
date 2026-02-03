import { getSavedCourses } from "./storage.js";

export function addLogType(logBody, logTypesHidden, addTypeButton) {
  addTypeButton.addEventListener("click", function () {
    if (logTypesHidden.children.length !== 0) {
      logTypesHidden.classList.toggle("active");
    }
  });

  const allLogTypes = logBody.querySelectorAll(".showLogTypes");
  const typeContainer = logBody.querySelector(".typeOfThisLog");
  const allTypeAdded = logBody.querySelectorAll(".typeOfThisLog");

  allLogTypes.forEach((x) => {
    x.addEventListener("click", function (e) {
      const clickedImg = e.target.closest("img");
      if (clickedImg) {
        typeContainer.prepend(clickedImg);
        logTypesHidden.classList.toggle("active");
      }
    });
  });

  allTypeAdded.forEach((x) => {
    x.addEventListener("click", function (e) {
      const typeToDelete = e.target.closest("img");
      if (typeToDelete) {
        logTypesHidden.append(typeToDelete);
      }
    });
  });
}

export function whatToLog(logBody) {
  const courseToLog = logBody.querySelector(".posterimg");
  const getCourses = getSavedCourses();
  const enrolledCourses = logBody.querySelector(".showEnrolledCourses");
  const coursesContainer = logBody.querySelector(".courseToEnrollPop");

  courseToLog.addEventListener("click", function () {
    enrolledCourses.innerHTML = getCourses
      .map(
        (x) => `
      <img src="assets/MAIN PAGE/${x.book}.png" alt="" />
      `,
      )
      .join("");
    coursesContainer.style.display = "flex";
  });

  const selectAllEnrolledCourses = logBody.querySelectorAll(
    ".showEnrolledCourses",
  );

  selectAllEnrolledCourses.forEach((x) => {
    x.addEventListener("click", function (e) {
      const clickedCourse =
        e.target.closest("img")?.src.split("/").pop().split(".")[0] || "";
      if (clickedCourse) {
        courseToLog.src = `assets/MAIN PAGE/${clickedCourse}.png`;
        coursesContainer.style.display = "none";
      }
    });
  });
}

export function starRating() {
  const stars = document.querySelectorAll(".log-y-stars .fa-star");
  let myCurrentRate = 0;

  stars.forEach((star, idx) => {
    star.addEventListener("mouseenter", () => {
      execStarboy(idx + 1, "hovered");
    });

    star.addEventListener("mouseleave", () => {
      execStarboy(myCurrentRate, "selected");
    });

    star.addEventListener("click", () => {
      myCurrentRate = idx + 1;
      execStarboy(myCurrentRate, "selected");
    });
  });

  function execStarboy(rate, classname) {
    stars.forEach((star, idx) => {
      star.classList.remove("selected", "hovered");

      if (idx < rate) {
        star.classList.add(classname);
      }
    });
  }
}

//main log function

export function logThis() {
  const myReview = document.querySelector(".add-log-review");
  const myReviewTitle = document.querySelector(".add-log-title");
  const myLogDate = document.querySelector(".log-date1");
  const myLogPoster = document.querySelector(".posterimg");



  const saveButton = document.querySelector(".saveButton");

  saveButton.addEventListener("click", () => {
    const myLogTypes = document.querySelectorAll(".typeOfThisLog img");
    const logData = {
      review: myReview.value,
      title: myReviewTitle.value,
      date: myLogDate.value,
      poster: myLogPoster.src,
      types: Array.from(myLogTypes).map((x) => x.src),
    };

    const logs = JSON.parse(localStorage.getItem("logData")) || [];

    if (Array.isArray(logs)) {
      logs.push(logData);
    } else {
      localStorage.setItem("logData", JSON.stringify([logData]));
      window.location.href = "user.html";
      return;
    }
    localStorage.setItem("logData", JSON.stringify(logs));
    window.location.href = "user.html";
  });
}
