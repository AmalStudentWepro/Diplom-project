import axios from "axios";
import { getCookie } from "../../utils/cookie";
import { redirect } from "../../utils/helpers";
import { header } from "../../components/header.js";
import { footer } from "../../components/footer";

const app = document.querySelector("#app3");
app.prepend(header());
document.body.append(footer());

const token = getCookie("accessToken");

if (!token) {
  alert("Вы не авторизованы!");
  redirect("/signin");
}

axios
  .get("https://blog-n7ue.onrender.com/users", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then((res) => {
    const user = res.data.data[0];
    console.log("Пользователь:", user);

    if (!user) {
      alert("Пользователь не найден");
      redirect("/signin");
      return;
    }

    showUser(user);
  })
  .catch((err) => {
    console.error(err);
    alert("Ошибка при получении данных пользователя");
  });

function showUser(user) {
  const name = user.fullName || "Неизвестно";
  const email = user.email || "Неизвестно";
  const id = user._id || "Неизвестно";

  document.querySelector(".profile-info h3").textContent = name;
  document.querySelector(".name").textContent = name;
  document.querySelector(".email").textContent = email;
  document.querySelector(".ID").textContent = id;

  if (user.image) {
    document.querySelector(".avatar").src = user.image;
  }
}
