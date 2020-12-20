const urlApi = "http://localhost:3000/api/cameras";
const searchParams = new URLSearchParams(window.location.search);
const itemId = searchParams.get("id");
//con esto hacemos cargar los elementos
const urlApiId = urlApi +"/"+itemId;
console.log(itemId);
//el query solo va a buscar la info dentro de container-camera
const cameraContainer = document.querySelector('#container-camera');
let btn = document.querySelector(".add-to-cart");
    console.log(btn);


    //creamos la funcion, ponemos la url con el await le decimos espere vamos a utilizar el fetch
    const appelDeApi = async function () {
        let response = await fetch(urlApiId);
        if (response.ok) {
        //espero la respuesta, vamos a transformar el json en objetos 
        let itemCam = await response.json();
        console.log(itemCam);
        //fonction pour afficher l'item
        afficherUnItem(itemCam);
        //A l'ecoute du bouton ajout panier
        //utilizo eladdevenlistener para crear el boton
        btn.addEventListener("click",()=>{
            let choixCamera = {
                camName : itemCam.name,
                camId   : itemCam._id,
                camImage: itemCam.imageUrl,
                camPrice: itemCam.price/100,
                camLenses: document.getElementById("choix-lentilles").value,
                camQuantite :parseInt( document.getElementById("qte").value),
                get totalPrice (){
                    return this.camPrice * this.camQuantite;
                
                }
                 };
            if(typeof localStorage != "undefined"){
                //recuperer la valeur dans le storage, con el triple decimos que esto tiene que ser un numero y tienen que ser iguales
                let camerasStore = JSON.parse(localStorage.getItem("camerasInCart"));
                if (camerasStore === null || camerasStore === "undefined") {
                    camerasStore = []; //creer le tableau

                }
                if(camerasStore) {
                    camerasStore.push(choixCamera); // si el table existe hacemos push en la eleccion de camera
                }
                localStorage.setItem("camerasInCart", JSON.stringify(camerasStore));
                //aca iria la frase del modal pero no la puse, para probar si igual funciona
                openModal(`${itemCam.name} a bien été ajouté au panier. Voulez-vous choisir une autre caméra?`);
            } else {
              alert("localStorage n'est pas supporté");
            }
            
        });

    }
};
//function pour afficher l'item camera
function afficherUnItem(itemCam) {
    let itemCamer = document.createElement("div");
    itemCamer.innerHTML = `
    <div class="row">
    <img class="col-6 rounded float-start" src="${itemCam.imageUrl}" alt="">
    <div class="col-6 rounded float-end card text-center">
     <div class="card-header"><h2> ${itemCam.name}</h2>
    <p> ${itemCam.price/100} € </p> </div>
   <div class="card-body">
    <p class="card-text">${itemCam.description} </p> </div>
   <div class="card-footer text-muted">
    <form>
    <div class="form-group">
      <label for="quantité">Choisissez une quantité (<em> Dans la limite de 10 caméras </em>) </label>
      <select class="form-control" id="qte" name="quantité">
      </select>
    </div><div class="form-group">
    <label>Choisissez une lentille </label>
    <select class="form-control" id="choix-lentilles">
    </select> </div></form>
    <a href="#"> <button type="button" class="btn btn-info btn-s add-to-cart" > Ajouter au panier  </button> </a>
    </div> </div>
    `
    //inserta un nuevo nodo dentro de la estructura de un documento, en este
    //caso la option lentille
    //el append tmbien va almacenando
    cameraContainer.appendChild(itemCamer);
    compteur();
    optionLentille(itemCam);

};
//
function compteur () {
    let optionQuantite = document.getElementById("qte");
    for (let nbr = 1; nbr <= 10; nbr++) {
        let newQuantite = document.createElement("option");
        newQuantite.innerText += nbr;
        optionQuantite.append(newQuantite);
    }
};
//function pour afficher les options de lentilles

function optionLentille(itemCam) {
    let optionLentille = document.getElementById("choix-lentilles")
    for (let i = 0; i < itemCam.lenses.length; i++) {
        let newOptionLentille = document.createElement("option")
        newOptionLentille.innerText = itemCam.lenses[i];
        optionLentille.append(newOptionLentille);
    }
};
appelDeApi();