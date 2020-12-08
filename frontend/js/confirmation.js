// recuperation de la reponse de confirmation et du prix total de la commande 
let confirmationCommande = JSON.parse(localStorage.getItem("confirm"));
console.log(confirmationCommande);
let totalPrice = localStorage.getItem("TotalPrice");
console.log(totalPrice)
// affichage de la confirmation de commande
affichageConfirmOrder();



    function affichageConfirmOrder() {
    const confirmOrder = document.getElementById('confirmationOrder');
     confirmOrder.innerText = ` Merci de votre commande n°: ${confirmationCommande}.
     Le prix total de votre commande est de : ${totalPrice}€.`;
    
     
    }

 // supression du localStorage    

 localStorage.clear();