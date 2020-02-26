import "@babel/polyfill";

import { signup } from "./signup";
import { login, logout } from "./login";
import { searchres } from "./search";

document.addEventListener("click", e => {
  const bgmodel = document.querySelector(".bg-modal").classList;
  const bgmodelreg = document.querySelector(".bg-modal--register").classList;
  const customer = document.getElementById("customer").classList;
  const hotel = document.getElementById("hotel").classList;
  const customerreg = document.querySelector(".customer").classList;
  const hotelreg = document.querySelector(".hotel").classList;

  if (e.target.id == "logout") {
    searchres(false, false);
    logout();
  }

  if (e.target.classList.value === "close") {
    bgmodel.remove("closepopup");
    bgmodelreg.remove("closepopup");
  }

  if (e.target.id === "login") {
    bgmodel.add("closepopup");
  }
  if (e.target.id === "register") {
    bgmodelreg.toggle("closepopup");
  }

  if (e.target.id === "login") {
    bgmodelreg.remove("closepopup");
  }

  if (e.target.id == "hotel") {
    hotel.add("selected");
    customer.remove("selected");
  }

  if (e.target.classList.value == "hotel") {
    hotelreg.add("selected--reg");
    customerreg.remove("selected--reg");
  }

  if (e.target.id == "customer") {
    hotel.remove("selected");
    customer.add("selected");
  }

  if (e.target.classList.value == "customer") {
    hotelreg.remove("selected--reg");
    customerreg.add("selected--reg");
  }
});

//Sign Up Funtion
window.signUP = () => {
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;
  const conpass = document.getElementById("con-pass").value;
  const role = document.querySelector(".selected--reg").classList[0];
  if (!(pass === conpass)) {
    return alert(
      "Please Enter Same Password For Password And Confirm Password"
    );
  }
  // console.log(fname,role);
  signup(fname, lname, email, pass, conpass, role);
  document.querySelector(".bg-modal--register").classList.remove("closepopup");
};

//login function
window.login = () => {
  const email = document.getElementById("log-email").value;
  const pass = document.getElementById("log-pass").value;
  const role = document.querySelector(".selected").id;
  login(email, pass, role);
  document.querySelector(".bg-modal").classList.remove("closepopup");
};

//Filter function
window.search = () => {
  const x = document.getElementById("slt-1");
  const i = x.selectedIndex;
  const date = document.getElementById("slt-2");
  const datei = date.selectedIndex;
  let hotelDate = date.options[datei].id;
  let hotelState = x.options[i].value;

  if (hotelState == "State") hotelState = false;
  if (hotelDate == "Availeble Date") hotelDate = false;
  searchres(hotelDate, hotelState);
  // console.log(hotelDate, hotelState);
};
