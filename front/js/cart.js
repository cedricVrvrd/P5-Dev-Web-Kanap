//--------------------------------------------------
// fonction pour recuprer le panier, si vide retourne tableau, sinon parse le
//  panier en données complexes (string vers objet)
//--------------------------------------------------

function getBasket() {
    let basket = localStorage.getItem('basket');
    if (basket == null) {
        return []
    }
    else {
        return JSON.parse(basket)
    }
}
// variable dans laquelle on récupère le panier pour pouvoir le parcourir po=lus tard
let basket = getBasket();

// on récupere les produits pour les mettre dans une variable pour pouvoir les parcourir plus tard
const res = await fetch("http://localhost:3000/api/products");
const dbProducts = await res.json();



//--------------------------------------------------
// -------------------------------------------------
//--------------------------------------------------
//--------------------------------------------------
// Fonction pour afficher les élèments de chaque produits dans le panier
// qui pourront être modifier
//--------------------------------------------------

function initBasketBack() {
    document.querySelector("#cart__items").innerHTML = "";
    for (let index = 0; index < basket.length; index++) {
        let id = basket[index].id;
        let qty = basket[index].qty;
        let couleur = basket[index].couleur;
        let dbProduct = dbProducts.find(p => id === p._id);


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
    deleteArticle();
    getQuantity();
    getPrice();
    changeQuantity();
};

initBasketBack();
//--------------------------------------------------
// -----fin fonction initBasbekBack------------
//--------------------------------------------------



// recupration des éléments du formulaire
let firstName = document.querySelector("#firstName");
let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
let lastName = document.querySelector("#lastName");
let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
let adresse = document.querySelector("#address");
let addressErrorMsg = document.querySelector("#addressErrorMsg");
let ville = document.querySelector("#city");
let cityErrorMsg = document.querySelector("#cityErrorMsg");
let eMail = document.querySelector("#email");
let emailErrorMsg = document.querySelector("#emailErrorMsg");
// variable pour checker si formulaire = true
let retour = true;

sendForm();
function sendForm() {
    const submitButton = document.querySelector(".cart__order__form").addEventListener("submit", (e) => {
        e.preventDefault();
        //    on appelle checkform, si checkform = true, on passe a la suite.
        checkForm();
        if (retour === true && basket.length > 0) {

            const contact = {
                firstName: firstName.value,
                lastName: lastName.value,
                address: adresse.value,
                city: ville.value,
                email: eMail.value,
            }

            let products = [];
            basket.forEach(product => {
                products.push(product.id);
            });

            postOrder(contact, products);
            console.log(contact, products);
           
        } else {
            alert("le panier est vide")
        }


    })
}


//------------------------------------------------------------------------------
//  Zone des fonction reutilisées
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// -----------------------------------------------------------------------------
//------------------------------------------------------------------------------


//--------------------------------------------------
// fonction pour retirer un produit
//--------------------------------------------------
function deleteArticle() {
    const deleteButton = document.querySelectorAll('.deleteItem');
    for (let index = 0; index < deleteButton.length; index++) {
        deleteButton[index].addEventListener("click", () => {
            let deleteArticle = deleteButton[index].closest('article');
            basket = basket.filter((p) => p.id !== deleteArticle.dataset.id || p.couleur !== deleteArticle.dataset.color);
            localStorage.setItem('basket', JSON.stringify(basket));
            initBasketBack();
        })
    }

}

//--------------------------------------------------
// fonction pour changer la quantité
//--------------------------------------------------
function changeQuantity() {
    const quantityButton = document.querySelectorAll('input.itemQuantity');
    for (let index = 0; index < quantityButton.length; index++) {
        quantityButton[index].addEventListener("change", (event) => {
            basket[index].qty = Number(event.target.value);
            localStorage.setItem('basket', JSON.stringify(basket));
            getQuantity();
            getPrice();
        })
    }
}

//--------------------------------------------------
// fonction pour obtenir la quantité totale de produit
//--------------------------------------------------
function getQuantity() {
    let totalQuantity = document.querySelector("#totalQuantity");
    let resultsQuantity = 0;
    for (let index = 0; index < basket.length; index++) {
        resultsQuantity += basket[index].qty;
    }
    totalQuantity.textContent = resultsQuantity;
}

//--------------------------------------------------
// fonction pour obtnir le prix total
//--------------------------------------------------
function getPrice() {
    let totalPrice = document.querySelector("#totalPrice");
    let _totalPrice = 0;
    for (let index = 0; index < basket.length; index++) {
        let id = basket[index].id;
        let qty = basket[index].qty;
        let dbProduct = dbProducts.find(p => id === p._id);
        _totalPrice += dbProduct.price * qty;
    }
    totalPrice.textContent = _totalPrice;
}

//--------------------------------------------------
// Fonction d'envoie du formulaire + 
// recuperation ID +
// redirection vers confirmation.html
//--------------------------------------------------
function postOrder(contact, products){
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({contact, products})
    })
        .then(res => res.json())
        .then(data => {
            localStorage.clear();
            document.location = "../html/confirmation.html?id="+ data.orderId
        })
        
        .catch(error => {
            console.log("282 erreur lors de l'envoi", error);
        })
}

//--------------------------------------------------
// Fonction qui va verifier si formulaire est valide +
// via regex
//--------------------------------------------------
function checkForm() {
    const re = new RegExp("[0-9]");
    const reEmail = new RegExp('[\\w-\\.]+@[\\w\\.]+\\.{1}[\\w]+');
    if (re.test(firstName.value)) {
        firstNameErrorMsg.style.display = "block";
        firstNameErrorMsg.textContent = "Votre prénom ne doit pas contenir de chiffres";
        retour = false;
    } else {
        firstNameErrorMsg.style.display = "none";
    };
    if (re.test(lastName.value)) {
        lastNameErrorMsg.style.display = "block";
        lastNameErrorMsg.textContent = "Votre nom ne doit pas contenir de chiffres";
        retour = false;
    } else {
        lastNameErrorMsg.style.display = "none";
    };
    if (re.test(ville.value)) {
        cityErrorMsg.style.display = "block";
        cityErrorMsg.textContent = "Votre nom de ville ne doit pas contenir de symbôles";
        retour = false;
    } else {
        cityErrorMsg.style.display = "none";
    };
    if (!reEmail.test(eMail.value)) {
        emailErrorMsg.style.display = "block";
        emailErrorMsg.textContent = "Votre email n'est pas valide";
        retour = false;
    } else {
        emailErrorMsg.style.display = "none";
    };
}