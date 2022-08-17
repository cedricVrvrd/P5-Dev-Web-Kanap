// const urlLocation = window.location.href;
// console.log(urlLocation)

const str = window.location.href;
const url = new URL(str);
let idUrl = url.searchParams.get("id");
let urlGlobale = "http://localhost:3000/api/products/" + idUrl;
console.log(idUrl);
console.log(urlGlobale)


fetch(urlGlobale)
    .then(res => {
        if (res.ok) {
            console.log(res)
            res.json().then(data => {
                let img = document.querySelector(".item__img");
                img.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
                let title = document.querySelector("#title");
                title.innerHTML = data.name;
                let price = document.querySelector("#price");
                price.innerHTML = `${data.price}`;
                let description = document.querySelector("#description");
                description.innerHTML = data.description;
                let colors = document.getElementById("colors");
                for (i = 0; i < data.colors.length; i++) {
                    colors.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
                }
            })
        }
        else {
            console.log("erreur de dialogue avec l'API.")
        }
    })