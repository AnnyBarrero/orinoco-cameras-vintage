const clePanier = JSON.parse(localStorage.getItem("keyPanier")) || [];

const compteurPanierPrixTotal = () =>{
    let arrayCompteurPanier =[];
    let arrayPrixTotal =[];
    for (const cameraDansLePanier of clePanier) {
        let camQte = cameraDansLePanier.camQuantite;
        arrayCompteurPanier.push(camQte);
        let prix = cameraDansLePanier.totalPrice;
        arrayPrixTotal.push(prix);}
        if (arrayCompteurPanier.length === 0 ) {
            location.assign('panier.html');
        }else {
        let compteurPanier = arrayCompteurPanier.reduce((accumulater, valeurCourante)=> accumulater+ valeurCourante);
        let itemInCart = document.getElementById("cart-qte"); 
        itemInCart.innerHTML=` (${compteurPanier}) `;  
    }
    
}
compteurPanierPrixTotal()