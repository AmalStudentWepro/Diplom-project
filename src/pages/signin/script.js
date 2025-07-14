import axios from "axios";
import { redirect } from "../../utils/helpers";
import { setCookie } from "../../utils/cookie";

const signup = document.querySelector("#signup");

if (signup) {
  signup.onclick = (e) => {
    e.preventDefault();
    redirect("/src/pages/signup/index.html");
  };
}

const form = document.querySelector(".auth-form");

if (form) {
  form.onsubmit = async function (e) {
    e.preventDefault();

    const fn = new FormData(form);
    const email = fn.get("email").trim();
    const password = fn.get("password").trim();

    if (!email || !password) {
      alert("Введите e-mail и пароль");
      return;
    }

    const user = {
      email,
      password,
      strategy: "local",
    };

    try {
      const res = await axios.post("https://blog-n7ue.onrender.com/authentication", user);

      setCookie("accessToken", res.data.accessToken, 1);
      setCookie("userName", res.data.user.fullName, 1);

      window.location.href = "/";
    } catch (error) {
      console.error("Ошибка при входе:", error);

      if (error.response) {
        const msg = error.response.data.message || "Неизвестная ошибка";
        alert("Ошибка входа: " + msg);
      } else {
        alert("Ошибка соединения с сервером: " + error.message);
      }
    }
  };
}
