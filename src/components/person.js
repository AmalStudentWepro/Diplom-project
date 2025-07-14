import { api } from "../utils/api";

export async function loadPopularPersons(containerSelector = ".persons-wrapper") {
  const wrapper = document.querySelector(containerSelector);
  if (!wrapper) return;

  try {
    const { data } = await api.get("/person/popular", { params: { language: "ru-RU" } });
    const people = data.results.slice(0, 6);

    const detailedPeople = await Promise.all(
      people.map(async (person) => {
        const { data: details } = await api.get(`/person/${person.id}`, { params: { language: "ru-RU" } });
        const birthYear = details.birthday ? new Date(details.birthday).getFullYear() : null;
        const age = birthYear ? `${new Date().getFullYear() - birthYear} лет` : "—";
        return {
          id: person.id,
          name: person.name,
          originalName: details.name !== person.name ? details.name : "",
          age,
          profile: person.profile_path
            ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
            : "/public/placeholder.jpg",
        };
      })
    );

    wrapper.innerHTML = "";

    const topWrapper = document.createElement("div");
    topWrapper.className = "top-persons";

    detailedPeople.slice(0, 2).forEach((p, index) => {
      const div = document.createElement("div");
      div.className = "person";
      div.innerHTML = `
        <span class="rank">${index + 1}-е место</span>
        <img src="${p.profile}" alt="${p.name}">
        <div class="person-info">
          <p class="name">${p.name}</p>
          <p class="original-name">${p.originalName}</p>
          <p class="age">${p.age}</p>
        </div>
      `;
      div.onclick = () => {
        window.location.href = `/src/pages/actor/index.html?id=${p.id}`;
      };
      topWrapper.appendChild(div);
    });

    const listWrapper = document.createElement("div");
    listWrapper.className = "persons-list";
    const ul = document.createElement("ul");
    ul.className = "ul";

    detailedPeople.slice(2).forEach((p, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="list-info">
          <p class="others-name">${p.name}</p>
          <p class="org-name">${p.originalName}</p>
          <p class="age">${p.age}</p>
        </div>
        <span class="place">${index + 3}-е место</span>
      `;
      li.onclick = () => {
        window.location.href = `/src/pages/actor/index.html?id=${p.id}`;
      };
      ul.appendChild(li);
    });

    listWrapper.appendChild(ul);

    wrapper.appendChild(topWrapper);
    wrapper.appendChild(listWrapper);

  } catch (err) {
    console.error("Ошибка загрузки персон:", err);
  }
}
