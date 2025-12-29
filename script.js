// module imports
import {
  getBio,
  getUsername,
  setBio,
  setUsername,
  setLikes,
  getLikes
} from "./src/storage.js";
import { displayEnrolledCourses } from "./src/ui.js";
import {
  handleAddCourseHover,
  handleEnrolledHover,
  handleHoverLeave,
  handleLogin,
  handleBioBlur,
} from "./src/events.js";

// kuya doms
const enrolledBox = document.querySelector(".courses-box");
const bioInput = document.querySelector(".user-input");
const userUsername = document.querySelector(".user-details h1");
const myUsername = document.querySelector(".enterMyuser");
const loginBtn = document.querySelector(
  '.signin-login-buttons a[href="user.html"]'
);
const userBody = document.querySelector("body");
const addBody = document.querySelector("body .add-body");

// Banat

// Bio input event
if (bioInput) {
  bioInput.addEventListener("blur", handleBioBlur(bioInput, setBio));
}

// User page initialization
if (enrolledBox) {
  displayEnrolledCourses(
    enrolledBox,
    handleEnrolledHover(
      userBody,
      enrolledBox,
      displayEnrolledCourses,
      handleEnrolledHover,
      handleHoverLeave
    ),
    handleHoverLeave
  );
  bioInput.value = getBio();
  userUsername.innerText = getUsername();
}



// Add course controls
document.querySelectorAll(".book1").forEach((book) => {
  book.addEventListener(
    "mouseenter",
    handleAddCourseHover(userBody, enrolledBox, handleHoverLeave)
  );

  book.addEventListener("mouseleave", handleHoverLeave);
});

document.querySelectorAll(".book-enrolled").forEach((book) => {
  book.addEventListener(
    "mouseenter",
    handleEnrolledHover(userBody, enrolledBox, handleHoverLeave)
  );

  book.addEventListener("mouseleave", handleHoverLeave);
});

// Login handler
if (loginBtn) {
  loginBtn.addEventListener("click", handleLogin(myUsername, setUsername));
}
