const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

// Tüm eventleri yüklemek

eventlisteners();

function eventlisteners() {
  form.addEventListener("submit", addFilm);
  document.addEventListener("DOMContentLoaded", function () {
    let films = Storage.getFilmsFromStorage();
    UI.loadAllFilms(films);
  });

  cardBody.addEventListener("click", deletefilm);
  clear.addEventListener("click", clearAllFilms);
}
function addFilm(e) {
  const title = titleElement.value;
  const director = directorElement.value;
  const url = urlElement.value;

  if (title === "" || director === "" || url === "") {
    //hata
    UI.displayMessages("Tüm alanları doldurun...", "danger");
  } else {
    //yeni film
    const newFilm = new Film(title, director, url);

    UI.addFilmToUI(newFilm); // Arayüze film ekleme
    Storage.addFilmToStorage(newFilm); //Storage'a film eklemek.
    UI.displayMessages("Film Başarıyla Eklendi", "success");
  }

  UI.clearInputs(titleElement, urlElement, directorElement);

  e.preventDefault();
}

function deletefilm(e) {
  if (e.target.id === "delete-film") {
    UI.deleteFilmForumUI(e.target);
    Storage.deleteFilmFromStorage(
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent
    );
  }
}
function clearAllFilms() {
  if (confirm("Emin misiniz ?")) {
    UI.clearAllFilmsFromUI();
    Storage.clearAllFilmsFromStorage();
  }
}
