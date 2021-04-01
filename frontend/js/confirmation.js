///// ///// ///// ///// PAGE CONFIRMATION ////// ///// ///// /////
let confirmationCommande = (sessionStorage.getItem("orderId"));
console.log(confirmationCommande);
let totalPrice = localStorage.getItem("totalPrice");
console.log(totalPrice)
affichageConfirmOrder();
/* Affichage prix total + id commande */
function affichageConfirmOrder() {
  const confirmOrder = document.getElementById('validation');
   confirmOrder.innerText = ` Merci de votre commande n°: ${confirmationCommande}.
   Le prix total de votre commande est de : ${totalPrice}€.`;
}
// supression du localStorage, SessionStorage    
localStorage.clear();
sessionStorage.clear();