// On récupere l'id puis on l'ajoute dans l'url

const str = window.location.href;
const url = new URL(str);
let idUrl = url.searchParams.get("id");
let urlGlobale = "http://localhost:3000/api/products/" + idUrl;
console.log(idUrl);
console.log(urlGlobale)

// 
fetch(urlGlobale)
    .then(res => {
        if (res.ok) {
            console.log(res)
            res.json().then(data => {
                let img = document.querySelector(".item__img").innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
                let title = document.querySelector("#title").innerHTML = data.name;
                let price = document.querySelector("#price").innerHTML = data.price;
                let description = document.querySelector("#description").innerHTML = data.description;
                let colors = document.querySelector("#colors");
                for (i = 0; i < data.colors.length; i++) {
                    colors.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
                }
            })
        }
        else {
            console.log("erreur de dialogue avec l'API.")
        }
    })
    .catch(error => {console.log(error);
    });

const button = document.querySelector("#addToCart")

button.addEventListener("click", function () {
    const qty = parseInt(document.querySelector("#quantity").value);
    const couleur = document.querySelector("#colors").value;
    const product = {
        id: idUrl,
        qty: qty,
        couleur: couleur,
    }
    addBasket(product)
    console.log("le type est " + typeof qty)

});
//--------------------------------------------------
// on recupére le panier, si il est vide on retourne un tableau, on push le produit dans tableau, on sauve.
//--------------------------------------------------
function addBasket(product) {
    let basket = JSON.parse(localStorage.getItem('basket'));
    if (basket == null) {
        basket = [];
        if (product.qty !== 0 && product.couleur){
            basket.push(product)
        }
        localStorage.setItem('basket', JSON.stringify(basket))
    }
    //--------------------------------------------------
    // si produit dans le panier, on tri le panier, si produit identiques = ajuste la quantirté, si pas de produit identique, on push
    //--------------------------------------------------
    else {
        let _product = basket.find(p => p.id === product.id && p.couleur === product.couleur);
        // console.log("62", _product);
        if(_product){
            _product.qty += product.qty
        }
        else{
            if (product.qty !== 0 && product.couleur){
                basket.push(product)
            }
        }
        localStorage.setItem('basket', JSON.stringify(basket))
    }
}
