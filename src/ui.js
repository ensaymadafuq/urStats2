// UI functions
import { getSavedCourses, setSavedCourses } from "./storage.js";

export function displayEnrolledCourses(enrolledBox, handleEnrolledHover, handleHoverLeave) {
  const savedCourses = getSavedCourses();
  enrolledBox.innerHTML = savedCourses
    .map(
      (book) =>
        `<div class="book-enrolled"><img src="assets/MAIN PAGE/${book.book}.png" alt="" /></div>`
    )
    .join("");

  const addCourseButton = `<div class="add-course"><a href="addcourse.html"><img src="assets/MAIN PAGE/addcourse.png" alt="" /></a></div>`;
  enrolledBox.insertAdjacentHTML("beforeend", addCourseButton);

  document.querySelectorAll(".book-enrolled").forEach((book) => {
    book.addEventListener("mouseenter", handleEnrolledHover);
    book.addEventListener("mouseleave", handleHoverLeave);
  });
}

export function removeEnrolledCourse(book, enrolledBox, displayEnrolledCourses, handleEnrolledHover, handleHoverLeave) {
  const bookName = book.querySelector("img").src.split("/").pop().split(".")[0];
  let savedCourses = getSavedCourses();
  savedCourses = savedCourses.filter((c) => c.book !== bookName);
  setSavedCourses(savedCourses);
  displayEnrolledCourses(enrolledBox, handleEnrolledHover, handleHoverLeave);
}
