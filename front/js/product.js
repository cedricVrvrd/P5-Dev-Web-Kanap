
//--------------------------------------------------
//  RECUPERATION ID
//--------------------------------------------------
// On récupere l'id puis on l'ajoute dans l'url afin de reupére le bon produit
const str = window.location.href;
const url = new URL(str);
let idUrl = url.searchParams.get("id");
let urlGlobale = "http://localhost:3000/api/products/" + idUrl;
console.log(idUrl);
console.log(urlGlobale)

//--------------------------------------------------
// RECUPERATION PRODUIT SUIVANT ID
//--------------------------------------------------
// on requete Api pour récuprer les élements du produit puis les ajouter 
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


//--------------------------------------------------
// AJOUT DANS LE PANIER
//--------------------------------------------------
// on recupère l'element bouton
const button = document.querySelector("#addToCart")
// puis on ajoute le produit dans le panier 
button.addEventListener("click", function () {
    const qty = parseInt(document.querySelector("#quantity").value);
    const couleur = document.querySelector("#colors").value;
    const product = {
        id: idUrl,
        qty: qty,
        couleur: couleur,
    }
    addBasket(product)
    alert("produit ajouté")
    // contôle type et quantité
    // console.log("le type est " + typeof qty) 

});


//--------------------------------------------------
// on recupére le panier, si il est vide on retourne un tableau, 
// si quantité != 0 et couleur  alors on push le produit
// on sauvegarde la panier
//--------------------------------------------------
//Autrement------------------------------------------------
// si produit dans le panier, on tri le panier, si produit identiques = ajuste la quantité, si pas de produit identique, on push
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
    else {
        let _product = basket.find(p => p.id === product.id && p.couleur === product.couleur);
        // console.log("70", _product);
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
