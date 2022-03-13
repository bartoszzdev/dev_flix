const movieCategory = document.getElementsByClassName("category-list")
const categoriesList = document.getElementsByClassName("categories")
const movieList = document.getElementById("listaFilmes")
let categories = {
    Favoritos: [],
    Lançamentos: [],
    Ação: [],
    Animação: [],
    Terror: [],
    Comédia: []
}
let allMovies = []

for (let i = 0; i < Object.keys(categories).length; i++) {
    movieCategory[0].innerHTML += `<option>${Object.keys(categories)[i]}</option>`
    categoriesList[0].innerHTML += `<option value='${Object.keys(categories)[i]}'>${Object.keys(categories)[i]}</option>`
}

function adicionarFilme() {
    const movieAdd = document.getElementById("filme").value
    const movieName = document.getElementById("nome").value

    if (movieAdd && movieName && movieAdd.endsWith(".jpg")) {
        listarFilme(movieAdd, movieName, movieCategory[0].value)
    } else {
        alert("Complete todos os campos corretamente")
    }

    document.getElementById("filme").value = ""
    document.getElementById("nome").value = ""
    document.getElementsByClassName("category-list")[0].value = 'Selecione a categoria'
}

function listarFilme(filme, nome, category) {
    movieList.innerHTML = ""

    for (let i = 0; i < Object.keys(categories).length; i++) {
        if (Object.keys(categories)[i] === category) {
            categories[category].push({ category, filme, nome })
        }
    }

    allMovies.push({ category, filme, nome })

    categories[category].map(movie => {
        movieList.innerHTML += `<div category-id="${movie.category}">
                                    <img src="${movie.filme}">
                                    <h2>${movie.nome}</h2>
                                </div>
        `
    })

    categoriesList[0].value = category

    document.querySelector('#listaResultado').scrollIntoView({ 
        top: 0,
        behavior: 'smooth' 
    });
}

categoriesList[0].addEventListener('click', (e) => {
    movieList.innerHTML = ""

    if (e.target.value === 'Todos') {
        allMovies.map(item => {
            movieList.innerHTML += `<div category-id="${item.category}">
                                        <img src="${item.filme}">
                                        <h2>${item.nome}</h2>
                                    </div>
            `
        })
    } else if (categories[e.target.value].length === 0) {
        movieList.innerHTML = "<h2 class='empty-list'>Lista vazia!</h2>"
    } else {
        for (category of Object.keys(categories)) {
            if (e.target.value === category) {
                categories[category].map(movie => {
                    movieList.innerHTML += `<div category-id="${movie.category}">
                                                <img src="${movie.filme}">
                                                <h2>${movie.nome}</h2>
                                            </div>
                    `
                })
            }
        }
    }
})
