// like feature
export function ilikeu(
  getLikes,
  setLike,
  toAdd,
  likeButton,
  userBody,
  enrollMsgs,
  currentImage
) {
  const savedLikes = getLikes();
  if (!Array.isArray(savedLikes)) savedLikes = [];
  const isLiked = savedLikes.some((x) => x.like === toAdd.like);

  if (!isLiked) {
    likeButton.style.color = "red";
    savedLikes.push(toAdd);
    setLike(savedLikes);
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
    setLike(toRemove);
    enrollMsgs(
      "Course removed from likes.",
      "#F8D7DA",
      "#721C24",
      "#F5C6CB solid 2px",
      userBody
    );
  }
  currentImage.style.filter = isLiked ? "brightness(0.5)" : "";
}

export function displayLikes(getLikes) {
  const savedLikes = getLikes();
  if (!Array.isArray(savedLikes)) savedLikes = [];
  const likesBox = document.querySelector(".likes-box");
  if (savedLikes && likesBox) {
    likesBox.innerHTML = savedLikes
      .map(
        (course) =>
          `
   <div class="likedBook">
<img src="../public/assets/MAIN PAGE/${course.like}.png" alt="" class='book'/>
            </div>
`
      )
      .join("");
  } else {
  }
}

// search feature

export function searchBook() {
  const searchInput = document.querySelector(".text-wrapper input");
  const booksContainer = document.querySelectorAll(".cs-first-sem");

  booksContainer.forEach((container) => {
    const books = container.querySelectorAll(".book1");

    

    searchInput.addEventListener("input", function () {
      let isVisible = false;
      books.forEach((book) => {
        const bookName = book
          .querySelector(".course-name")
          .textContent.toLowerCase();
        const match = bookName.includes(searchInput.value.toLowerCase());
        book.style.display = match ? "" : "none";

        if (match) isVisible = true; 
       
       
      });

    container.style.display = isVisible ? '' : 'none'
    });

  });
}
