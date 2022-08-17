
    //--------------------------------------------------
    //test test test p
    //--------------------------------------------------

//     <a href="./product.html?id=42">
//     <article>
//       <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
//       <h3 class="productName">Kanap name1</h3>
//       <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
//     </article>
//   </a>

//     "colors": ["Blue", "White", "Black"],
//     "_id": "107fb5b75607497b96722bda5b504926",
//     "name": "Kanap Sinopé",
//     "price": 1849,
//     "imageUrl": "kanap01.jpeg",
//     "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     "altTxt": "Photo d'un canapé bleu, deux places"
//   },
    const url = "http://localhost:3000/api/products";

//--------------------------------------------------
// Affichage produits
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
//    faire le catch (identique au else)
//  mettre dans une fonction


