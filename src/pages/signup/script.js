
import axios from "axios";
import { setCookie, getCookie } from "../../utils/cookie";

const token = getCookie("accessToken");

if (token) {
  window.location.href = "/";
}

const form = document.querySelector(".auth-form");

if (form) {
  form.onsubmit = async (e) => {
    e.preventDefault();

    const inputs = form.querySelectorAll("input");

    const name = inputs[0].value.trim();
    const surname = inputs[1].value.trim();
    const login = inputs[2].value.trim();
    const password = inputs[3].value.trim();
    const repeatPassword = inputs[4].value.trim();
    const email = inputs[5].value.trim();
    const checkbox1 = inputs[6];
    const checkbox2 = inputs[7];

    let hasError = false;

    form.querySelectorAll(".input-error-message").forEach(el => el.remove());
    inputs.forEach(input => input.classList.remove("input-error"));
    [checkbox1, checkbox2].forEach(cb => cb.parentElement.classList.remove("input-error"));

    function showError(input, message) {
      input.classList.add("input-error");
      const msg = document.createElement("div");
      msg.className = "input-error-message";
      msg.textContent = message;
      input.parentElement.appendChild(msg);
      hasError = true;
    }

    if (!name) showError(inputs[0], "Введите имя");
    if (!surname) showError(inputs[1], "Введите фамилию");
    if (!login) showError(inputs[2], "Введите логин");
    if (!password) showError(inputs[3], "Введите пароль");
    if (!repeatPassword) showError(inputs[4], "Повторите пароль");
    if (!email) showError(inputs[5], "Введите email");

    if (password && repeatPassword && password !== repeatPassword) {
      showError(inputs[3], "Пароли не совпадают");
      showError(inputs[4], "Пароли не совпадают");
    }

    if (!checkbox1.checked) {
      checkbox1.parentElement.classList.add("input-error");
      hasError = true;
    }
    if (!checkbox2.checked) {
      checkbox2.parentElement.classList.add("input-error");
      hasError = true;
    }

    if (hasError) return;

    const user = {
      fullName: name,
      email,
      password,
    };
    

    try {
      const res = await axios.post("https://blog-n7ue.onrender.com/users", user);
    
      setCookie("accessToken", res.data.accessToken, 1);
      setCookie("userName", name, 1);
    
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    
      if (error.response?.data?.message?.includes("exists")) {
        alert("Такой пользователь уже есть.");
        window.location.href = "/";
      } else {
        alert("Ошибка регистрации: " + (error.response?.data?.message || error.message));
      }
    }    
  };

}

