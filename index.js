
function buttonHandler() {
    const inputField = document.getElementById("input-field")
    const submitBtn = document.getElementById("submit-btn")
    submitBtn.addEventListener("click", function(event) {
        let inputData = inputField.value
        getMovieHtml(inputData) 
    })
}

async function findShow(query) {
    let response = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${query}&embed=seasons`)
    let data = await response.json()
    return data  //data._embedded.seasons
}

function getMovieHtml(query) {
    findShow(query).then(movie => {
        let seasons = movie._embedded.seasons
        let seasonsHtml = seasons.map(season => {
            return `
            <div>
                <a href="${season.url}" target="blank"><img class="imageBox" src="${season.image.medium}"></a>
                <p>Season ${season.number}</p>
            </div>
            `
        }).join("")
 
        document.getElementById("gridContainer").innerHTML = `
            <h1>${movie.name}</h1>
            <div>
                <input id="input-field" type="text" name="inputMovie" placeholder="Search TV Series">
                <button id="submit-btn" type="submit">Search</button>
            </div>
            <span class="summary">${movie.summary}</span>
            <div id="seasonsBox">${seasonsHtml}</div>
        `
        buttonHandler()
    })

}

buttonHandler()