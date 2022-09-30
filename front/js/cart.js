//--------------------------------------------------
// Fonction génèrale pour récupérer le panier
//--------------------------------------------------
function getBasket() {
    let basket = localStorage.getItem('basket');
    if (basket == null) {
        return []
    }
    else {
        return JSON.parse(basket)
    }
};

//--------------------------------------------------
// Variables utiles
//--------------------------------------------------
let basket = getBasket();
const res = await fetch("http://localhost:3000/api/products");
const dbProducts = await res.json();
console.log("20", dbProducts);

//--------------------------------------------------
//  Affiche les élements du panier selectionnés par l'utilisateur
// appelle les fonction getTotalPrice GetTotalQuantity deleteArticle et changeQuantity
// pour permettre d'interagir sur les elements du panier
//--------------------------------------------------
function initBasket() {
    console.log("26", basket)
    document.querySelector("#cart__items").innerHTML = "";
    for (let index = 0; index < basket.length; index++) {
        let id = basket[index].id;
        let qty = basket[index].qty;
        let couleur = basket[index].couleur;
        let dbProduct = dbProducts.find(p => id === p._id);
        console.log("33", dbProduct);


        // ajout section article
        let article = document.createElement("article");
        document.querySelector("#cart__items").appendChild(article);
        article.className = "cart__item";
        article.setAttribute("data-id", id);
        article.setAttribute("data-color", couleur);

        // ajout div "cart__item__img"
        let cartItemImg = document.createElement("div");
        article.appendChild(cartItemImg);
        cartItemImg.className = "cart__item__img";
        let ImgOfCartItemImg = document.createElement("img");
        cartItemImg.appendChild(ImgOfCartItemImg);
        ImgOfCartItemImg.src = dbProduct.imageUrl;
        ImgOfCartItemImg.alt = dbProduct.altTxt;

        //    ajout div cart_item_content
        let cartItemContent = document.createElement("div");
        cartItemContent.className = "cart_item_content";
        article.appendChild(cartItemContent);

        // ajout div cart_item_content_description
        let cartItemContentDescription = document.createElement("div");
        cartItemContent.appendChild(cartItemContentDescription);
        cartItemContentDescription.className = "cart_item_content_description";
        let h2CartItemContentDescription = document.createElement("h2");
        cartItemContentDescription.appendChild(h2CartItemContentDescription)
        h2CartItemContentDescription.textContent = dbProduct.name;

        let pCartItemsDecription = document.createElement("p");
        cartItemContentDescription.appendChild(pCartItemsDecription);
        pCartItemsDecription.textContent = couleur;

        let prix = document.createElement("p");
        cartItemContentDescription.appendChild(prix);
        prix.textContent = dbProduct.price;

        // ajout div cart_item_content_setting
        let cartItemContentSetting = document.createElement("div");
        cartItemContentSetting.className = ("cart__item__content__settings");
        cartItemContent.appendChild(cartItemContentSetting);
        let cartItemContentSettingQuantity = document.createElement("div");
        cartItemContentSettingQuantity.className = ("cart__item__content__settings_quantity");
        cartItemContentSetting.appendChild(cartItemContentSettingQuantity);
        let quantityCartContentQuantity = document.createElement("p");
        cartItemContentSettingQuantity.appendChild(quantityCartContentQuantity);
        quantityCartContentQuantity.textContent = "Qté :";

        // ajout choix de la quantité
        let cartItemQuantity = document.createElement("input");
        cartItemContentSettingQuantity.appendChild(cartItemQuantity);
        cartItemQuantity.value = qty;
        cartItemQuantity.setAttribute("type", "number");
        cartItemQuantity.className = ("itemQuantity");
        cartItemQuantity.setAttribute("name", "itemQuantity");
        cartItemQuantity.setAttribute("min", "1");
        cartItemQuantity.setAttribute("max", "100");
        cartItemQuantity.setAttribute("name", "itemQuantity");

        // ajout section suppresion produit
        let cartItemContentSettingDelete = document.createElement("div");
        cartItemContentSetting.appendChild(cartItemContentSettingDelete);
        cartItemContentSettingDelete.className = ("cart_item_content_settings_delete");
        let deleteItem = document.createElement("p");
        cartItemContentSettingDelete.appendChild(deleteItem);
        deleteItem.className = ("deleteItem");
        deleteItem.textContent = "supprimer";
    }
    // fonction pour retirer article
    deleteArticle();
    // fonction pour obtenir la quantité
    getTotalQuantity();
    // fonction pour obtenir le prix total
    getTotalPrice();
    // fonction pour changer la quantité
    changeQuantity();
};

initBasket();

//--------------------------------------------------
// Fonction pour supprimer un article, on appelle initBasket pour reinitialiser le panier
// suivant l'article supprimer
//--------------------------------------------------
function deleteArticle() {
    const deleteButton = document.querySelectorAll('.deleteItem');
    console.log("104", deleteButton)
    for (let index = 0; index < deleteButton.length; index++) {
        deleteButton[index].addEventListener("click", () => {
            console.log("124", deleteButton[index])
            let deleteArticle = deleteButton[index].closest('article');
            console.log("126", deleteArticle.dataset.id, deleteArticle.dataset.color, deleteArticle)
            console.log("127", basket)
            basket = basket.filter((p) => p.id !== deleteArticle.dataset.id || p.couleur !== deleteArticle.dataset.color);
            console.log(basket)
            localStorage.setItem('basket', JSON.stringify(basket));
            initBasket();
        })
    }

};


//--------------------------------------------------
// fonction pour changer la quantité du produit, on appelle
// la fonction getTotalPrice et getTotalQuantity pour obtenir les nouveaux calculs de ces nombres
//--------------------------------------------------
function changeQuantity() {
    const quantityButton = document.querySelectorAll('input.itemQuantity');
    console.log("142", quantityButton)
    for (let index = 0; index < quantityButton.length; index++) {
        quantityButton[index].addEventListener("change", (event) => {
            console.log("145", event.target.value, basket[index]);
            basket[index].qty = Number(event.target.value);
            localStorage.setItem('basket', JSON.stringify(basket));
            getTotalQuantity();
            getTotalPrice();
        })
    }
};

//--------------------------------------------------
// fonction pour obtenir la quantité de produit
//--------------------------------------------------
function getTotalQuantity() {
    let totalQuantity = document.querySelector("#totalQuantity");
    let resultsQuantity = 0;
    for (let index = 0; index < basket.length; index++) {
        resultsQuantity += basket[index].qty;
        console.log("161", resultsQuantity);
    }
    totalQuantity.textContent = resultsQuantity;
};


//--------------------------------------------------
// Fonction pour obtenir le prix total de la commande
//--------------------------------------------------
function getTotalPrice() {
    let totalPrice = document.querySelector("#totalPrice");
    let _totalPrice = 0;
    for (let index = 0; index < basket.length; index++) {
        let id = basket[index].id;
        let qty = basket[index].qty;
        let dbProduct = dbProducts.find(p => id === p._id);
        console.log("175", dbProduct);
        _totalPrice += dbProduct.price * qty;
        console.log("177", _totalPrice);
    }
    totalPrice.textContent = _totalPrice;
};

//--------------------------------------------------
// On récupère les elements du formulaire pour les placer dans des variables ainsi que 
// les messages d'erreur déjà dans le html
//--------------------------------------------------
let firstName = document.querySelector("#firstName")
let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
let lastName = document.querySelector("#lastName")
let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
let address = document.querySelector("#address");
let addressErrorMsg = document.querySelector("#addressErrorMsg");
let city = document.querySelector("#city");
let cityErrorMsg = document.querySelector("#cityErrorMsg");
let email = document.querySelector("#email");
let emailErrorMsg = document.querySelector("#emailErrorMsg");


//--------------------------------------------------
// création des regex
//--------------------------------------------------
const re = new RegExp("[0-9]");
const reEmail = new RegExp('[\\w-\\.]+@[\\w\\.]+\\.{1}[\\w]+');

// fonction pour verifier le prenom, return true si ok
function checkFirstName(firstName) {
    let valid = true;
    if (re.test(firstName.value)) {
        firstNameErrorMsg.style.display = "block";
        firstNameErrorMsg.textContent = "Votre prénom ne doit pas contenir de chiffres";
        valid = false;
    } else {
        firstNameErrorMsg.style.display = "none";
    }
    return valid;
};

// fonction pour verifier le nom, return true si ok
function checkLastName(lastName) {
    let valid = true;
    if (re.test(lastName.value)) {
        lastNameErrorMsg.style.display = "block";
        lastNameErrorMsg.textContent = "Votre nom ne doit pas contenir de chiffres";
        valid = false;
    } else {
        lastNameErrorMsg.style.display = "none";
    }
    return valid;
};

// fonction pour verifier l'adresse, return true si ok
function checkAddress(address) {
    let valid = true;
    if (!re.test(address.value)) {
        addressErrorMsg.style.display = "block";
        addressErrorMsg.textContent = "Votre email n'est pas valide";
        valid = false;
    } else {
        addressErrorMsg.style.display = "none";
    }
    return valid;
};

// fonction pour verifier l'adresse, return true si ok
function checkCity(city) {
    let valid = true;
    if (re.test(city.value)) {
        cityErrorMsg.style.display = "block";
        cityErrorMsg.textContent = "Votre nom de ville ne doit pas contenir de symbôles";
        valid = false;
    } else {
        cityErrorMsg.style.display = "none";
    }
    return valid;
};

// fonction pour verifier l'email, return true si ok
function checkEmail(email) {
    let valid = true;
    if (!reEmail.test(email.value)) {
        emailErrorMsg.style.display = "block";
        emailErrorMsg.textContent = "Votre email n'est pas valide";
        valid = false;
    } else {
        emailErrorMsg.style.display = "none";
    }
    return valid;
};


//--------------------------------------------------
// Au clic sur le bouton valider, si tous les éléments du formulaire ok et que au moins un élément
// dans le panier , alors la commande est validée
// on envoie les données du client sous forme d'un objet
// puis les produits sous forme de tableau de string
//  sinon envoie d'un message à l'utilisateur
//--------------------------------------------------



const submitButton = document.querySelector(".cart__order__form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (checkFirstName(firstName) &&
        checkLastName(lastName) &&
        checkEmail(email) &&
        checkAddress(address) &&
        checkCity(city) &&
        checkEmail(email) &&
        checkBasketQuantity(basket) &&
        basket.length >= 1) {
        console.log("240 ca marche");
        //  creation de l'objet contact
        const contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
        }
        console.log("252", contact);
        // on crée un tableau dans lequel on envoie les id du produits
        let products = [];
        basket.forEach(product => {
            products.push(product.id);
        });
        console.log("252", products);
        postOrder(contact, products);
        console.log("254", contact, products);

    }
    else if (basket.length < 1) {
        alert("le panier est vide");
    }
    else {
        console.log("274 erreur");
    }
});

//--------------------------------------------------
// Fonction d'envoie du formulaire + 
// recuperation ID +
// redirection vers confirmation.html
//--------------------------------------------------
function postOrder(contact, products) {
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ contact, products })
    })
        .then(res => res.json())
        .then(data => {
            localStorage.clear();
            document.location = "../html/confirmation.html?id=" + data.orderId;
            console.log("ok")
        })

        .catch(error => {
            console.log("282 erreur lors de l'envoi", error);
            alert("Erreur lors de l'envoi, veuillez renouveler votre commande")
        })
};

function checkBasketQuantity(basket){
    for (let index = 0; index < basket.length; index++) {
        if(basket[index].qty < 1 || basket[index].qty > 100){
            alert("Veuillez vérifier la quantité de chaque article")
            return false;
        }
    }
    return true
};