import { getUsername } from "./storage.js";

export function loadFeed() {
  const logDatas = JSON.parse(localStorage.getItem("logData"));

  const feedContainer = document.querySelector(".feed-container");
  const userName = getUsername();

  if (logDatas) {

      const logsArray = Array.isArray(logDatas) ? logDatas : [logDatas];


    logsArray.forEach((log) => {
      const feed1 = document.createElement("div");
      feed1.className = "feed1";

      feed1.innerHTML = `
     <img
              src="assets/MAIN PAGE/Sample profile.png"
              alt=""
              class="fsample-profile"
            />
            <img
              src="${log.poster}"
              alt=""
              class="fsample-book"
            />

            <div class="f-details">
              <div class="ftop">
                <p>@${userName}</p>
                <p>| ${log.date}</p>
              </div>
              <div class="fmid">
                ${log.types
                  .map((type) => `<img src="${type}" class="type-icon" />`)
                  .join("")}

                

                <div class="fstars">
                  <img src="assets/scv/stars_filled.png" alt="" />
                  <img src="assets/scv/stars_filled.png" alt="" />
                  <img src="assets/scv/stars_filled.png" alt="" />
                  <img src="assets/scv/stars_filled.png" alt="" />
                </div>

                <img src="assets/feed/Icon.png" alt="" class="mid-heart" />
              </div>

              <div class="fmain-content">
                <h3 class="content-title">|${log.title}</h3>

                <p class="fsample-book-description">
                 ${log.review}
                </p>
              </div>

              <div class="bot-btns">
                <div class="btn-heart">
                  <img src="assets/feed/Icon.png" alt="" />
                  <p>Like&nbsp;log</p>
                </div>

                <div class="btn-comment">
                  <p>1</p>
                  <img src="assets/feed/Message square.png" alt="" />
                </div>
              </div>
            </div>
    `;

      feedContainer.append(feed1);
    });
  }
}
