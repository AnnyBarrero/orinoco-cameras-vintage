///// ///// ///// ///// PAGE CONFIRMATION ////// ///// ///// /////
let confirmationCommande = (sessionStorage.getItem("orderId"));
let totalPrice = localStorage.getItem("totalPrice");

const confirmOrder = document.getElementById('validation');
confirmOrder.innerText = ` Merci de votre commande n°: ${confirmationCommande}.
Le prix total de votre commande est de : ${totalPrice}€.`;

// supression du localStorage, SessionStorage    
localStorage.clear();
sessionStorage.clear();