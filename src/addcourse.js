export function ilikeu(
  getLikes,
  setLikes,
  toAdd,
  likeButton,
  userBody,
  enrollMsgs
) {
  const savedLikes = getLikes();
  if (!Array.isArray(savedLikes)) savedLikes = [];
  const isLiked = savedLikes.some((x) => x.like === toAdd.like);


  if (!isLiked) {
    likeButton.style.color = "red";
    savedLikes.push(toAdd);
    setLikes(savedLikes);
    enrollMsgs(
      "Course added to likes.",
      "#D4EDDA",
      "#155724",
      "#C3E6CB solid 2px",
      userBody
    );
  } else {
    likeButton.style.color = "";
    const toRemove = savedLikes.filter((x) => x.like !== toAdd.like);
    setLikes(toRemove);
    enrollMsgs(
      "Course removed from likes.",
      "#F8D7DA",
      "#721C24",
      "#F5C6CB solid 2px",
      userBody
    );
  }
}

export function displayLikes(getLikes) {
  const savedLikes = getLikes();
  if (!Array.isArray(savedLikes)) savedLikes = [];
  const likesBox = document.querySelector(".likes-box");
  if (savedLikes && likesBox) {
    likesBox.innerHTML = savedLikes.map(
      (course) =>
        `
   <div class="likedBook">
<img src="assets/MAIN PAGE/${course.like}.png" alt="" />
            </div>
`
    ).join("");
  } else {

  }
}
