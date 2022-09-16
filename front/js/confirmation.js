// Récupération de l'ID

const str = window.location.href;
const url = new URL(str);
let idUrl = url.searchParams.get("id");

// Affichage numéro de la commande
const orderId = document.getElementById('orderId');
orderId.textContent = idUrl;