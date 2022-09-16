function getBasket() {
    let basket = localStorage.getItem('basket');
    if (basket == null) {
        return []
    }
    else {
        return JSON.parse(basket)
    }
}
let basket = getBasket();
const res = await fetch("http://localhost:3000/api/products");
const dbProducts = await res.json();
console.log("11", dbProducts, "12");



function getBasketBack() {
    console.log("18", basket)
    document.querySelector("#cart__items").innerHTML = "";
    for (let index = 0; index < basket.length; index++) {
        let id = basket[index].id;
        let qty = basket[index].qty;
        let couleur = basket[index].couleur;
        console.log(id, qty, couleur);
        let dbProduct = dbProducts.find(p => id === p._id);
        console.log("24", dbProduct);
        console.log("33", couleur);


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
};

getBasketBack();
deleteArticle();


function deleteArticle() {
    const deleteButton = document.querySelectorAll('.deleteItem');
    console.log("104", deleteButton)
    for (let index = 0; index < deleteButton.length; index++) {
        deleteButton[index].addEventListener("click", () => {
            console.log("107", deleteButton[index])
            let deleteArticle = deleteButton[index].closest('article');
            console.log("112", deleteArticle.dataset.id, deleteArticle.dataset.color, deleteArticle)
            console.log("113", basket)
            basket = basket.filter((p) => p.id !== deleteArticle.dataset.id || p.couleur !== deleteArticle.dataset.color);
            console.log(basket)
            localStorage.setItem('basket', JSON.stringify(basket))
            getBasketBack();
            getQuantity();
            getPrice();
        })
    }

}

changeQuantity();
getQuantity();
getPrice();

function changeQuantity() {
    const quantityButton = document.querySelectorAll('input.itemQuantity');
    console.log("128", quantityButton)
    for (let index = 0; index < quantityButton.length; index++) {
        quantityButton[index].addEventListener("change", (event) => {
            console.log("130", event.target.value, basket[index]);
            basket[index].qty = Number(event.target.value);
            localStorage.setItem('basket', JSON.stringify(basket));
            getQuantity();
            getPrice();
        })
    }
}


function getQuantity() {
    let totalQuantity = document.querySelector("#totalQuantity");
    let resultsQuantity = 0;
    for (let index = 0; index < basket.length; index++) {
        resultsQuantity += basket[index].qty;
        console.log("150", resultsQuantity);
    }
    totalQuantity.textContent = resultsQuantity;
    // if (totalQuantity == 0){
    //     resultQuantity.textContent = 0;
    // }A VERIFIER
}
function getPrice() {
    let totalPrice = document.querySelector("#totalPrice");
    let _totalPrice = 0;
    for (let index = 0; index < basket.length; index++) {
        let id = basket[index].id;
        let qty = basket[index].qty;
        let dbProduct = dbProducts.find(p => id === p._id);
        console.log("162", dbProduct);
        _totalPrice += dbProduct.price * qty;
        console.log(_totalPrice);
    }
    totalPrice.textContent = _totalPrice;
    // if (_totalprice == 0){
    //     totalPrice.textContent = 0;
    // }A VERIFIER
}


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
let retour = true;

sendForm();
function checkForm() {
    const re = new RegExp("[0-9]");
    // const reAddress = new RegExp('[^_A-Za-z0-9]');
    // const reEmail = new RegExp('[\\w-\\.]+@[\\w\\.]+\\.{1}[\\w]+');
    if (re.test(firstName.value)) {
        firstNameErrorMsg.style.display = "block";
        firstNameErrorMsg.textContent = "Votre prénom ne doit pas contenir de chiffres";
        retour = false;
    } else {
        retour = true;
        firstNameErrorMsg.style.display = "none";
    };
    if (re.test(lastName.value)) {
        lastNameErrorMsg.style.display = "block";
        lastNameErrorMsg.textContent = "Votre nom ne doit pas contenir de chiffres";
        retour = false;
    } else {
        retour = true;
        lastNameErrorMsg.style.display = "none";
    };
    if (re.test(adresse.value)) {
        addressErrorMsg.style.display = "block";
        addressErrorMsg.textContent = "Votre adresse contient des symbôles interdits";
        retour = false;
    } else {
        retour = true;
        addressErrorMsg.style.display = "none";
    };
    if (re.test(ville.value)) {
        cityErrorMsg.style.display = "block";
        cityErrorMsg.textContent = "Votre nom de ville ne doit pas contenir de symbôles";
        retour = false;
    } else {
        retour = true;
        cityErrorMsg.style.display = "none";
    };
    if (re.test(eMail.value)) {
        emailErrorMsg.style.display = "block";
        emailErrorMsg.textContent = "Votre email n'est pas valide";
        retour = false;
    } else {
        retour = true;
        emailErrorMsg.style.display = "none";
    };
}

function sendForm() {
    const submitButton = document.querySelector(".cart__order__form").addEventListener("submit", (e) => {
        e.preventDefault();
        //    on appelle checkform, si checkform = true, on passe a la suite.
        checkForm();
        if (retour === true && basket.length > 0) {
            console.log("240 ca marche");

            const contact = {
                firstName: firstName.value,
                lastName: lastName.value,
                address: adresse.value,
                city: ville.value,
                email: eMail.value,
            }
            console.log("252", contact);
            let products = [];
            basket.forEach(product => {
                products.push(product.id);
            });
            console.log("252", products)
            postOrder(contact, products);
            console.log("254", contact, products)
           
        } else {
            console.log("ca ne marche pas")
        }


    })
}

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
            document.location = "../html/confirmation.html?id="+ data.orderId
        })
        
        .catch(error => {
            console.log("282 erreur lors de l'envoi", error);
        })
}
