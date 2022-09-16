// récuperartion de l'adresse API
    const url = "http://localhost:3000/api/products";

//--------------------------------------------------
// Requête API pour demander l'ensemble des produits, on recupère la reponse et on parcours les
//  données (data)
//--------------------------------------------------
   fetch(url)
   .then(res => {
        if(res.ok){
            console.log(res)
            res.json().then(data =>{
                let productsSection = document.querySelector("#items");
                for (let index = 0; index < data.length; index++) {
                   let productsSectionItems = `
                    <a href="./product.html?id=${data[index]._id}">
     <article>
      <img src="${data[index].imageUrl}" alt="${data[index].altTxt}"/>
      <h3 class="productName">${data[index].name}</h3>
     <p class="productDescription">${data[index].description}</p>
    </article>
   </a>
                    `   
                    productsSection.innerHTML += productsSectionItems; 
                }
            })
        }
        else{
            console.log("erreur de dialogue avec l'API.")
        }
   })
   .catch(error => {
    console.log("33 erreur lors de l'envoi", error);
})


