//TMDB API
const API_KEY = "api_key=07865664a1fb593da23026e2f6ccb3a1";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const SEARCH_URL = BASE_URL + "/search/movie?" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const movieContainer = document.querySelector(".movie_container");
const movieOuterContainer = document.querySelector(".movies_outer_container");
const form = document.querySelector(".form");
const searchBtn = document.getElementById("search_btn");
const closeBtn = document.getElementById("close_btn")
const search = document.getElementById("search");
const card = document.querySelector(".card")
const fullInfoContainer = document.querySelector(".full_info_container")
const modalBody = document.querySelector(".modal-body")
const carouselInner = document.querySelector(".carousel-inner")
getMovies(API_URL);
function getMovies(url) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data.results);
            showMovies(data.results);
            movieContainer.addEventListener("click", (e) => {
                // if (!detailSectionOpen) {
                const cardDiv = e.target.closest("div");
                // console.log(cardDiv);
                showDetails(data.results, cardDiv);
                // }
            });
        })
        .catch((e) => {
            console.log("Error", e);
        });
}

function showMovies(data) {
    movieContainer.innerHTML = ``;
    data.forEach((movie) => {
        // console.log(movie.poster_path);

        const { } = movie;
        const movieDiv = document.createElement("div");
        if (movie.poster_path) {
            movieDiv.classList.add("movies");
            movieDiv.classList.add("d-flex");
            movieDiv.classList.add("align-items-stretch");
            // carouselInner.innerHTML = `
            // <div class="carousel-item active ">
            //     <img src= ${IMG_URL + Math.random(movie.poster_path)} class="d-block w-100 rounded-3" alt="...">
            // </div>`
            movieDiv.innerHTML = ` 
            <div class="card d-flex justify-content-evenly flex-column my-4 border-0 shadow"  data-bs-toggle="modal"
            data-bs-target="#modelId" style="width: 18rem;" id="${movie.id
                }">
                <img src= ${IMG_URL + movie.poster_path
                } class=" border border-0 w-100 card-img-top shadow" alt="${movie.title
                }">
                <div class="card-body d-flex justify-content-between align-items-start ">
                <div className="movie_title">
                <h5 class="fw-bold m-0 p-2">${movie.title
                }</h5>
                </div>
                <h5 class="fw-bold px-4 py-1 rounded-3  ${getColor(
                    movie.vote_average
                )}">${movie.vote_average}</h5>
                </div>
            </div>`;
        }
        movieContainer.append(movieDiv);
    });
}

function getColor(value) {
    if (value >= 8.0) return "green";
    else if (value >= 5.0) return "orange";
    else return "red";
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 900,
        left: 900,
        behavior: 'smooth'
    })
    const searchTerm = search.value;
    if (searchTerm) getMovies(SEARCH_URL + "&query=" + searchTerm);
    else getMovies(API_URL);
});

function showDetails(data, card_div) {
    // console.log(closeBtn, "close_btn");
    const cardId = card_div.id;
    for (let i = 0; i < data.length; i++) {
        if (cardId == data[i].id) {
            modalBody.innerHTML =
                `<div class="main_info  d-flex justify-content-start align-items-center">
                        <div class="poster  m-4 w-50">
                            <img src=" ${IMG_URL + data[i].poster_path}" class="w-100 p-1 shadow-lg" id=" poster_img ">
                        </div>
                        <div class=" text p-4  ms-0 mt-4 w-50 align-self-start">
                            <h4 class=" title fs-1 fw-bold"> ${data[i].title}</h4>
                            <p class=" date_time fs-5">Release Date : ${data[i].release_date}</p>
                            <div class=" rating d-inline-flex align-items-center p-2  rounded-3" style="background-color: ${getColor(data[i].vote_average)};">
                                <img src=" ./images/imdb.png " alt="imdb_logo" class="me-3 ms-1" style=" width: 40px;">
                                <p class=" fw-bold rating_num m-0 fs-4 "  >${data[i].vote_average}</p>
                            </div>
                            <div class=" cta_section my-5 gap-3 d-flex flex-wrap">
                                <button class=" watch_now border fw-bold border-0 py-3 px-4 text-light bg-success rounded-3 ">WATCH NOW</button>
                                <button class=" share border fw-bold border-0 py-3 px-4 text-light bg-success rounded-3 ">SHARE</button>
                            </div>
                                <div class=" overview mb-4">${data[i].overview}</div>
                        </div>
                    </div>`;
        }
    }
}
