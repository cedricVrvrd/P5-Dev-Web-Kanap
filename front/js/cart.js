function getBasket() {
    let basket = localStorage.getItem('basket');
    if (basket == null) {
        return []
    }
    else {
        return JSON.parse(basket)
    }
}
const res = await fetch("http://localhost:3000/api/products");
const dbProducts = await res.json();
console.log("11", dbProducts, "12");



function getBasketBack() {
    let basket = getBasket();
    console.log("18", basket)
    let items = document.querySelector("#cart_items");
    for (let index = 0; index < basket.length; index++) {
        let itemBasket = basket[index];
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
    let basket = getBasket();
    const deleteButton = document.querySelectorAll('.deleteItem');
    console.log("104", deleteButton)
    for (let index = 0; index < deleteButton.length; index++) {
        deleteButton[index].addEventListener("click", () =>{
            console.log("107", deleteButton[index])
            let deleteArticle = deleteButton[index].closest('article');
            console.log("112", deleteArticle.dataset.id, deleteArticle.dataset.color, deleteArticle)
            console.log("113", basket)
            basket = basket.filter((p) => p.id  !== deleteArticle.dataset.id || p.couleur !== deleteArticle.dataset.color);
            console.log(basket)
            localStorage.setItem('basket', JSON.stringify(basket))
            location.reload();
            
        })
    }
}
