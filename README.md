# Kanap #

**Démo en ligne / Live demo :** https://cedricvrvrd.github.io/P5-Dev-Web-Kanap/

> **FR —** La démo publiée sur GitHub Pages est une version statique : les produits sont lus dans `front/data/products.json` au lieu de l'API, et la commande est simulée (le numéro est généré dans le navigateur, rien n'est envoyé ni enregistré). Le back-end Express d'origine reste dans `back/` et fonctionne toujours en local (voir ci-dessous).
>
> **EN —** The GitHub Pages demo is a static version: products are read from `front/data/products.json` instead of the API, and checkout is simulated (the order number is generated in the browser; nothing is sent or stored). The original Express back end is still in `back/` and runs locally as described below.


This is the front end and back end server for Project 5 of the Web Developer path.

### Back end Prerequisites ###

You will need to have Node and `npm` installed locally on your machine.

### Back end Installation ###

Clone this repo. From the "back" folder of the project, run `npm install`. You 
can then run the server with `node server`. 
The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.
