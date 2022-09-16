// récuperartion de l'adresse API
const url = "http://localhost:3000/api/products";



//--------------------------------------------------
// Requête API pour demander l'ensemble des produits, on recupère la reponse et on parcours les
//  données (data) et on les ajoutes au DOM
//--------------------------------------------------
// si erreur de requete affiche et renvoie l'erreur
fetch(url)
    .then(res => {
        if (res.ok) {
            console.log(res)
            res.json().then(data => {
                for (let index = 0; index < data.length; index++) {
                    // lien
                    let link = document.createElement("a");
                    document.querySelector("#items").appendChild(link);
                    link.href = `product.html?id=${data[index]._id}`;
                    // section article
                    let sectionArticle = document.createElement("article");
                    link.appendChild(sectionArticle);
                    // image et alt
                    let productImg = document.createElement("img");
                    sectionArticle.appendChild(productImg);
                    productImg.src = data[index].imageUrl;
                    productImg.alt = data[index].altTxt;
                    //  nom du produit
                    let productName = document.createElement("h3");
                    sectionArticle.appendChild(productName);
                    productName.className = "productName";
                    productName.textContent = data[index].name;
                    //  description du prodruit
                    let productDescription = document.createElement("p");
                    sectionArticle.appendChild(productDescription);
                    productDescription.className = "productDescription";
                    productDescription.textContent = data[index].description;
                }
            })
        }
        else {
            console.log("erreur de dialogue avec l'API.")
        }
    })
    .catch(error => {
        console.log("erreur lors de l'envoi", error);
    })


