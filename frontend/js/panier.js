const cameraContainerPanier = document.getElementById('container-panier2')

const affichageCamStore = document.querySelector("affichageCamerasPanier");

//recuperer les données stocker dans le localstorage
function recupCameras() {
    let panier = JSON.parse(localStorage.getItem("keyPanier"));
    if (panier === null || panier === "undefined") {
        panier = [];
    }
    return panier;
}
let panier = recupCameras();
console.log(panier);

//la fonction pour afficher les cameras
// RIEN DANS LE PANIER:
if (panier.length === 0 || panier === null && getComputedStyle(validation).display == "block") {
    validation.style.display =" none";
    let panierEmpty = document.createElement("div");
    panierEmpty.innerHTML = `<p> Votre panier est vide </p>
    <button type="button" class="btn btn-secondary btn-lg btn-block" >
      <a href = "index.html"> Retour au store</a> 
    </button> `
    cameraContainerPanier.appendChild(panierEmpty);

//s'il y a des cameras dans le panier
} else {
    //al final
    const displayCamera = () => {
        const camerasStoreNode = panier.map((cam, index) => {
            return createCameraElement(cam, index);
        });
        affichageCamerasPanier.innerHTML ="";
        affichageCamerasPanier.append(...camerasStoreNode);

    };
    //on cree l'element camera
        const createCameraElement = (cam, index) =>{  
            const ulCameras = document.createElement('ul');
            ulCameras.setAttribute("class","row ulDisposition");
            ulCameras.innerHTML = `
            <li class="liDisp products-title">Camera
            <ul>
            <li>${cam.camName}</li>
            <li><img src="${cam.camImage}" width= 80px heigt= 80px></li>
            <li>${cam.camLenses}</li>
            </ul></li>
            <li class="liDisp products-quantity">Quantité<ul>
            <li>${cam.camQuantite}</li></ul></li>
            <li class="liDisp products-price">Prix unitaire<ul>
            <li>${cam.camPrice}</li> </ul></li>
            <li class="liDisp">Prix total<ul><li>${cam.totalPrice}</li>
             </ul></li>
             <li class="liDisp">Supprimer
            <ul>
            
            <li>  <button class="supprimerBtn" type="button" class="btn btn-info btn-s" > </button>
            </li>
            </ul></li>
            
            `;
           
            const btnSupprimer = ulCameras.querySelector('.supprimerBtn');

            btnSupprimer.addEventListener('click', async ()=>{
              const result = await recupCameras();
              console.log(result);
              if (result) {
                  deleteCam(index);
              }
        });

      return ulCameras;  
        };
        //Supprrimer camera je dois l'appeller à l'interieur de l'evenement btnSupprimer
        const deleteCam = (index)=>{
            panier.splice(index,1);
            localStorage.setItem("keyPanier", JSON.stringify(panier))
            JSON.parse(localStorage.getItem("keyPanier"));
            displayCamera();   
            compteurPrixTotal();
        }
        //incrementation et calcul du prix totl
        const compteurPrixTotal = () =>{
            let arrayCompteurPanier =[] ;
            let arrayPrixTotal =[];
            for (const camInStore of panier) {
                let itemQte = camInStore.camQuantite;
                arrayCompteurPrix.push(itemQte);

                let prix = camInStore.totalPrice;
                arrayPrixTotal.push(prix);}
            if (arrayCompteurPanier.length === 0) {
                location.assign('panier.html');
            }    else {
                let compteurPanier = arrayCompteurPanier.reduce((accumulater, valeurCourante)=> accumulater+ valeurCourante);
                let itemInCart = document.querySelector('#cart-qte');
                itemInCart.innerHTML=`${compteurPanier}`;} 
            let prixTotal = arrayPrixTotal.reduce((accumulater, valeurCourante)=> accumulater+ valeurCourante);
            const prixTotalCommande = document.querySelector('#totalPricePanier');
            prixTotalCommande.innerHTML= `TOTAL: ${prixTotal}€`;    
            localStorage.setItem("TotalPrix", prixTotal);

        
        
    
displayCamera();
            }
    }