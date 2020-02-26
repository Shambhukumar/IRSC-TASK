import axios from "axios";

export const searchres = async (date, state) => {
  let res;
  if (!date && !state) {
    res = await axios({
      method: "GET",
      url: `/hotel`
    });
    if (res.data.status === "success") {
      cardhtml(res.data.data.doc);
    }
  }
  if (date && !(date && state)) {
    res = await axios({
      method: "GET",
      url: `/hotel/Date/${date}`
    });

    if (res.data.status === "success") {
      cardhtml(res.data.data.doc);
    }
  }

  if (state && !(date && state)) {
    res = await axios({
      method: "GET",
      url: `/hotel/${state}`
    });

    if (res.data.status === "success") {
      cardhtml(res.data.data.doc);
    }
  }

  if (date && state) {
    res = await axios({
      method: "GET",
      url: `/hotel/Date/${date}/city/${state}`
    });

    if (res.data.status === "success") {
      cardhtml(res.data.data.doc);
    }
  }
};

const cardCreation = card => {
  const markup = `
      <div class="card">
      <div class="location-details">
        <h2>${card.name}</h2>
        <h3>${card.city}</h3>
      </div>
      <div class="logo"><img src="./img/hotel-logo-design-png-2.png" alt=""></div>
      <div class="date">
        <h2>${card.date.slice(0, 10)}<h2>
      </div>
      <div class="price">
        <h2>Starts @ ${card.price}/-<h2>
      </div>
      <button class="button--login">Book Now <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i></button>
    </div>
  `;

  document
    .querySelector(".hotel__cards")
    .insertAdjacentHTML("afterbegin", markup);
};

const cardhtml = card => {
  removeCard();
  card.forEach(el => {
    cardCreation(el);
  });

  const empty = `
    <div class="empty">
        <h1>SORRY NO RESULT FOUND</h1>
      </div>`;
  if (card.length === 0) {
    document
      .querySelector(".hotel__cards")
      .insertAdjacentHTML("afterbegin", empty);
  }
};

const removeCard = () => {
  document.querySelector(".hotel__cards").innerHTML = "";
};
