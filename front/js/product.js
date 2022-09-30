
//--------------------------------------------------
//  RECUPERATION ID
//--------------------------------------------------
// On récupere l'id puis on l'ajoute dans l'url afin de reupére le bon produit
const str = window.location.href;
const url = new URL(str);
let idUrl = url.searchParams.get("id");
let urlGlobale = "http://localhost:3000/api/products/" + idUrl;
console.log(idUrl);
console.log(urlGlobale);

//--------------------------------------------------
// RECUPERATION PRODUIT SUIVANT ID
//--------------------------------------------------
// on requete Api pour récuperer les élements du produit puis les ajouter 
fetch(urlGlobale)
    .then(res => {
        if (res.ok) {
            console.log(res)
            res.json().then(data => {
                // ajout image
                let _itemImg = document.createElement("img");
                document.querySelector(".item__img").appendChild(_itemImg);
                _itemImg.src = data.imageUrl;
                // ajout titre
                document.querySelector("#title").textContent = data.name;
                // ajout prix
                document.querySelector("#price").innerText = data.price;
                document.querySelector("#description").innerText = data.description;
                let colors = document.querySelector("#colors");
                for (i = 0; i < data.colors.length; i++) {
                    colors.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
                }
            })
        }
        else {
            console.log("erreur de dialogue avec l'API.")
            alert("Désolé nous rencontrons quelques problèmes techniques, veuillez réessayer plus tard");
        }
    })
    .catch(error => {
        console.log(error);
        alert("Désolé nous rencontrons quelques problèmes techniques, veuillez réessayer plus tard");
    });


//--------------------------------------------------
// AJOUT DANS LE PANIER
//--------------------------------------------------
// on recupère l'element bouton
const button = document.querySelector("#addToCart")
// puis on ajoute le produit dans le panier au click
button.addEventListener("click", function () {
    const qty = parseInt(document.querySelector("#quantity").value);
    const couleur = document.querySelector("#colors").value;
    const product = {
        id: idUrl,
        qty: qty,
        couleur: couleur,
    }
    if (qty < 100) {
        addBasket(product)
        console.log("le type est " + typeof qty)
    } else {
        alert("pas + de 100")
    }

});


//--------------------------------------------------
// on recupére le panier, si il est vide on retourne un tableau, 
// si quantité != 0 et couleur alors on push le produit
// on sauvegarde la panier
//--------------------------------------------------
//Autrement------------------------------------------------
// si produit dans le panier, on tri le panier, si produit identiques = ajuste la quantité, si pas de produit identique, on push
//--------------------------------------------------
function addBasket(product) {
    if (product.qty === 0 || product.couleur === "") {
        alert("veuillir choisir une quantité et une couleur")
    } else {
        // initialisation du panier
        let basket = JSON.parse(localStorage.getItem('basket'));
        if (basket === null) {
            basket = [];
        }
        let _product = basket.find(p => p.id === product.id && p.couleur === product.couleur);
        console.log("70", _product);
        if (_product) {
            _product.qty += product.qty;
            if (_product.qty > 100) {
                _product.qty = 100;
                alert("limité à 100 articles par commande, vérifier votre panier")
            } else {
                alert("quantité modifiée");
            }
        }
        else {
                basket.push(product)
                alert("produit ajouté");
        }
        localStorage.setItem('basket', JSON.stringify(basket))

    }





















};
