// Storage helper functions

export function getSavedCourses() {
  return JSON.parse(localStorage.getItem("courses")) || [];
}
export function setSavedCourses(courses) {
  localStorage.setItem("courses", JSON.stringify(courses));
}

export function getBio() {
  return JSON.parse(localStorage.getItem("bio")) || "";
}
export function setBio(bio) {
  localStorage.setItem("bio", JSON.stringify(bio));
}

export function getUsername() {
  return JSON.parse(localStorage.getItem("username")) || "";
}
export function setUsername(name) {
  localStorage.setItem("username", JSON.stringify(name));
}

export function getLikes() {
  return JSON.parse(localStorage.getItem("likes")) || [];
}
export function setLikes(likes) {
  localStorage.setItem("likes", JSON.stringify(likes));
}

