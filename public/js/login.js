import axios from "axios";
export const login = async (email, password, role) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/users/singin",
      data: {
        email,
        password
      }
    });
    // console.log(res.data.data.user.role, role);
    if (res.data.data.user.role !== role) {
      alert(
        `YOU ARE NOT ${role.toUpperCase()} USER PLEASE CLICK IN TO ${
          role == "customer" ? "HOTEL" : "CUSTOMER"
        } LOGIN`
      );
      await axios({
        method: "GET",
        url: "/users/logout"
      });
      return;
    }

    if (res.data.status === "success") {
      loginhtml(res.data.data.user);
      alert("Logged in successfully!");
    }
  } catch (err) {
    console.log(err);
    alert("User Not Registered With This Email");
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/users/logout"
    });
    if ((res.data.status = "success")) {
      logouthtml();
      alert("Logged Out Successfully");
    }
  } catch (err) {
    console.log(err);
    alert("Error loggin out! Try again");
  }
};

const loginhtml = user => {
  const markup = `
      <ul class="cred">
      <li class="Header_links--el Header_links--authentication--login">
        <a id="username" href="#">${user.firstname}</a>
      </li>
      <li class="Header_links--el Header_links--authentication--Register">
          <a id="logout" href="#">Log Out</a>
      </li>
      </ul>
    `;

  const filters = `
      <div class="filter-com">
    <div class="dropdown dropdown__state">
        <select id="slt-1" name="slt-1">
            <option>State</option>
            <option value="New Delhi" id="NweDelhi">New Delhi</option>
            <option value="Mumbai" id="Mumbai">Mumbai</option>
        </select>
    </div>
    <div class="dropdown dropdown__date">
        <select id="slt-2" name="slt-2">
            <option>Availeble Date</option>
            <option id="01-31-2020" value="January">January</option>
            <option id="02-31-2020" value="Feburary">Feburary</option>
            <option id="03-31-2020" value="March">March</option>
        </select>
    </div>
    <div class="searchBox">
        <form action="javascript:search()">
            <input type="text" placeholder="Search" name="search">
            <button type="submit"><i class="fa fa-search"></i>
            </button>
        </form>
    </div>
</div>`;

  const ch = document.querySelector(".cred");
  ch.parentNode.removeChild(ch);
  document
    .querySelector(".Header_links--authentication")
    .insertAdjacentHTML("beforeend", markup);

  document.querySelector(".filters").insertAdjacentHTML("beforeend", filters);
};

const logouthtml = () => {
  const markup = `
  <ul class="cred">
    <li class="Header_links--el Header_links--authentication--login">
    <a href="#" id="login">Login</a>
    </li>
    <li class="Header_links--el Header_links--authentication--Register">
    <a href="#" id="register">Register</a>
    </li>
  <ul`;

  const ch = document.querySelector(".cred");
  ch.parentNode.removeChild(ch);
  const dh = document.querySelector(".filter-com");
  dh.parentNode.removeChild(dh);
  document
    .querySelector(".Header_links--authentication")
    .insertAdjacentHTML("beforeend", markup);
};
