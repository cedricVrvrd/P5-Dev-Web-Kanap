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
    console.log("le tye est " + typeof qty)

})

function addBasket(product) {
    let basket = JSON.parse(localStorage.getItem('basket'));
    if (basket == null) {
        basket = [],
        basket.push(product)
        localStorage.setItem('basket', JSON.stringify(basket))
    }
    else {
        basket.forEach(object => {
            if (object.couleur === product.couleur && object.id === product.id) {
                object.qty += product.qty;
            }
            else {
                basket.push(product)
            }
        })
        localStorage.setItem('basket', JSON.stringify(basket))
    }
}

//--------------------------------------------------
// On sauve le panier que l'on transform en JSON car localStorage ne traite pas les tableaux (sérialisation)
//--------------------------------------------------
//     function saveBasket(basket){
//         localStorage.setItem('basket', JSON.stringify(basket));
//     }

// ///--------------------------------------------------
// // RECUPERER LE PANIER, parse(retransform en données complexes)
// //--------------------------------------------------
//     function getBasket(){
//         let basket = localStorage.getItem('basket');
//         if (basket == null) {
//             return []
//         }
//         else {
//             return JSON.parse(basket)
//         }
//     }

// ///--------------------------------------------------
// // Ajout du panier
// //--------------------------------------------------
// function addBasket(product){
//     let basket = getBasket();
//     basket.forEach(object => {
//         if (object.couleur  === product.couleur && object.id === product.id) {
//             object.qty += product.qty;
//         }
//     })
//     basket.push(product);
//     saveBasket(basket);
// }
