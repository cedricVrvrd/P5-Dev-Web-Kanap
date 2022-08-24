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
       console.log("33", couleur)

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
 
 
       
     }
    }

getBasketBack()

