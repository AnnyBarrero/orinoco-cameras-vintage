const divAffichageCameraStore = document.querySelector(".affichageCameraStore");
const validation = document.querySelector('#validate');
const cameraContainerPanier = document.querySelector("#container-panier2");
const containerForm = document.querySelector("#container-form");

//ajouter les produits du local storage sur la page panier
function recupCameras() {
    let camerasStore = JSON.parse(localStorage.getItem("camerasInCart"));
    if (camerasStore === null || camerasStore === "undefined") {
        camerasStore = [];
    }
    return camerasStore;
}
let camerasStore = recupCameras();
console.log(camerasStore);
//fonction por afficher les caméras
// si el panier esta vacio
if (camerasStore.length === 0 || camerasStore === null && getComputedStyle(validation).display == "block") {
    validation.style.display =" none";
    let panierVide = document;createElement("div");
    panierVide.innerHTML = `<p> Votre panier est vide </p>
    <button type="button" class="btn btn-secondary btn-lg btn-block" > <a href = "index.html"> Retour au store</a> </button> `
    cameraContainerPanier.appendChild(panierVide);
    //si hay camaras en el panier:
} else {
   const displayCamera = () => {
    const camerasStoreNode = camerasStore.map((camera , index) => {
        return createCameraElement(camera, index);
    });
    divAffichageCameraStore.innerHTML =" ";
    //utiliser l'operateur spread para retourner une liste et pas un tableau
    divAffichageCameraStore.append(...camerasStoreNode);

   };
   //fonction poour creer l'element camera
    function createCameraElement(camera, index) {
    const ul = document.createElement('ul');
    ul.setAttribute("class", "ulDisposition");
    ul.innerHTML = `
     <li class="liDisp">Article
     <ul>
      <li>${camera.camName} </li>
      <li><img src="${camera.camImage}" width= 80px heigt= 80px></li>
      <li>${camera.camLenses}</li>
     </ul></li>
      <li class="liDisp">Quantité<ul>
      <li>${camera.camQuantite}</li></ul></li>
      <li class="liDisp">Prix unitaire<ul>
      <li>${camera.camPrice}</li></ul></li>
     <li class="liDisp">Prix total<ul><li>${camera.totalPrice}</li>
     </ul></li>
     <li class="liDisp">Supprimer
     <ul>
    <li> <button class="deleteBtn"><i class="far fa-trash-alt"></i></button></li>
    </ul></li> `;
    const btnDelete = ul.querySelector('.deleteBtn');

    btnDelete.addEventListener('click', async () => {
      const result = await openModalPanier(`Voulez-vous vraiment supprimer cet article?`);
      console.log(result);
      // si la promesse est resolve, on delete la camera sinon on ne fait rien
      if (result) {
        deleteCamera(index);
      }
    });

    return ul;
  }
// fonction deleteCamera qui sera appeler à l'interieur de l'evenement btnDelete
const deleteCamera = (index)=>{
    camerasStore.splice(index,1);
    localStorage.setItem("camerasInCart", JSON.stringify(camerasStore)) 
    JSON.parse(localStorage.getItem("camerasInCart"));
    displayCamera();
    compteurPanierPrixTotal();
    

}
// incrementation du panier et  calcul du prix total de la commande:

const compteurPanierPrixTotal = () =>{
    let arrayCompteurPanier =[] ;
    let arrayPrixTotal =[];
    for (const cameraInStore of camerasStore) {
      let itemQte = cameraInStore.camQuantite;
      arrayCompteurPanier.push(itemQte); 
      console.log(arrayCompteurPanier);
      let prix = cameraInStore.totalPrice;
      arrayPrixTotal.push(prix);}
      console.log(arrayPrixTotal);
      if (arrayCompteurPanier.length === 0 ) {
        location.assign('panier.html');
     }else {
        let compteurPanier = arrayCompteurPanier.reduce((accumulater, valeurCourante)=> accumulater+ valeurCourante);
        let itemInCart = document.querySelector('#cart-qte');
        itemInCart.innerHTML=`${compteurPanier}`;}
        let prixTotal = arrayPrixTotal.reduce((accumulater, valeurCourante)=> accumulater+ valeurCourante);
        const prixTotalCommande = document.querySelector('#totalPricePanier');
        prixTotalCommande.innerHTML= `PRIX TOTAL: ${prixTotal}€`;
        localStorage.setItem("TotalPrice", prixTotal);
       
      
      }     
    // fonction pour recupérer le formulaire au click sur le bouton validez votre commande:
    function form() {
        if (getComputedStyle(containerForm).display == "none" ||getComputedStyle(validation).display == "block" || getComputedStyle(cameraContainerPanier).display == "block" ){
          // on recupere la valeur courante de la propriété display sur les const avec getComputedStyle(const).display
         containerForm.style.display = "block";
         validation.style.display = "none";
         cameraContainerPanier.style.display = "none";
        }
      }
    validation.addEventListener('click',form);

    // recupération des données du formulaire et de mon tableau de produit au click sur le bouton Envoyez votre commande : 
const submit = document.getElementById('submitorder');
submit.addEventListener('click',(e)=>{
 
    e.preventDefault();
    commandePanier();
});

const commandePanier = () =>{
    let orderInput = document.getElementsByTagName('input');
      if (orderInput[0].value && orderInput[0].validity.valid && orderInput[1].value && orderInput[1].validity.valid  && orderInput[2].value && orderInput[2].validity.valid  && orderInput[3].value && orderInput[3].validity.valid  && orderInput[4].value && orderInput[4].validity.valid ) {
       let contact = {
         firstName: orderInput[0].value,
         lastName: orderInput[1].value,
         address: orderInput[2].value,
         city: orderInput[3].value,
         email: orderInput[4].value
       }
       
     console.log(contact);
     let camerasStore = JSON.parse(localStorage.getItem("camerasInCart"));
     console.log(camerasStore);
     let products = [];
     for (const cameraInStore of camerasStore) {
          let productsId = cameraInStore.camId;
          products.push(productsId);
          console.log(products);
      }
     let order = { contact, products };
     console.log(order);

     // requete post 
     const reponseOrder =fetch("http://localhost:3000/api/cameras/order",{
         method: "POST",
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify(order) 
     });
    //reponse de la requete
    reponseOrder.then(async response => {
        try {
         console.log(response);
          let confirmation = await response.json();
          console.log(confirmation);
          let idConfirmation = confirmation.orderId;
          console.log(idConfirmation);
        
          if (typeof localStorage != "undefined") {
            localStorage.setItem("confirm", JSON.stringify(idConfirmation));
            localStorage.removeItem("camerasInCart");
           window.location.href ="confirm.html";
           } else {
             alert("localStorage n'est pas supporté");
          }
          
         } catch (error) {
           console.log(error);
           alert("Un problème est survenu, merci de réessayer plus tard");
         }
        });
  
         } else {
           alert("Merci de remplir tous les champs! ou de vérifier la conformité avec le format attendu")
         } 
  
      }
  
   
   compteurPanierPrixTotal();
  displayCamera();
  }