//Initial References 
let mobieNameRef = document.getElementById("movie-name")
let searchBtn = document.getElementById("search-btn")
let result = document.getElementById('result')

// functin to fetch data from api
let getMovie = () => {
    let movieName = mobieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    //if input field is empty
    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please Enter A Movie Name<h3>`;
    }
    else{
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            //If movie exists in database 
            if (data.Response == 'True') {
                createMovies(data);
            }else{
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }

        })
        .catch( err => {
            result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
        })
    }
}

searchBtn.addEventListener("click", getMovie)

window.addEventListener("load",  getMovie);


function createMovies(data){

    result.innerHTML = `
    <div class="info">
        <img src="${data.Poster}" class="poster">
        <div>
            <h2>${data.Title}</h2>
            <div class="rating">
                <h4> Rating: ${data.imdbRating}</h4>
            </div>
            <div class="details">
                <span>${data.Rated}</span>
                <span>${data.Year}</span>
                <span>${data.Runtime}</span>
            </div>
            <div class="genre">
                <div>${data.Genre.split(",").
                join("</div><div>")}</div>
            </div>
        </div>
    </div>
    <h3>Plot: </h3>
    <p>${data.Plot}</p>
    <h3>Cast: </h3>
    <p>${data.Actors}</p>
    
    `;

}