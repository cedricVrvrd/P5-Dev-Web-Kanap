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
    let items = document.querySelector("#cart_items");
    for (let index = 0; index < basket.length; index++) {
        let id = basket[index].id;
        let qty = basket[index].qty;
        let couleur = basket[index].couleur;
        console.log(id, qty, couleur);
        let dbProduct = dbProducts.find(p => id === p._id);
        console.log("24", dbProduct);
        console.log("33", couleur);

        let article = document.createElement("article");
        document.querySelector("#cart__items").appendChild(article);
        article.className = "cart__item";
        article.setAttribute("data-id", id);

        // Ajout div "cart__item__img"
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
        let CartItemContentSetting = document.createElement("div");
        CartItemContentSetting.className =("cart__item__content__settings");
        cartItemContent.appendChild(CartItemContentSetting);
        let CartItemContentSettingQuantity = document.createElement("div");
        CartItemContentSettingQuantity.className =("cart__item__content__settings_quantity");
        CartItemContentSetting.appendChild(CartItemContentSettingQuantity);
        
    }
}


getBasketBack()

