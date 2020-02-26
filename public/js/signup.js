import axios from "axios";

export const signup = async (
  firstname,
  lastname,
  email,
  password,
  passwordConfirm,
  role
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/users/singup",
      data: {
        firstname,
        lastname,
        email,
        password,
        passwordConfirm,
        role
      }
    });
    if (res.data.status === "success") {
      alert("Account Created Successfully!!");
      // window.setTimeout(() => {
      //   location.assign('/');
      // }, 1500);
    }
  } catch (err) {
    alert("Not Able to Sign Up Something Happend");
    console.log(err);
  }
};
