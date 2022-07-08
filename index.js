/* 
    TV Guide
    
    Write an async function called findShow(query)
        performs a fetch call to:
        https://api.tvmaze.com/singlesearch/shows?q=${query}&embed=seasons
        and returns the resulting show object
        
    Build a layout to display the show
        - Title
        - Summary
        - Seasons listed as individual divs
*/
let query = "a-team"

async function findShow() {
    let response = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${query}&embed=seasons`)
    let data = await response.json()
    return data  //data._embedded.seasons
}

function getMovieHtml() {
    findShow().then(movie => {
        let seasons = movie._embedded.seasons
        let seasonsHtml = seasons.map(season => {
            console.log(season.image)
            return `
            <div>
                <p>Season ${season.number}</p>
                <img class="imageBox" src="${season.image.medium}">
            </div>
            `
        }).join("")
        console.log(seasonsHtml)
        document.getElementById("gridContainer").innerHTML += `
            <div class="movie">
                <h1>${movie.name}</h1>
                <p>${movie.summary}</p>
                <div id="seasonsBox">${seasonsHtml}</div>

            </div>
        `
    })
}

getMovieHtml()