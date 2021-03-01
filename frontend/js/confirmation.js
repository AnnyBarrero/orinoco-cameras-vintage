/* Affichage prix total + id commande */
document.getElementById("validation").innerHTML += ` <h2>pour votre commande d'un montant de: ${localStorage.getItem(
    "total"
  )}€ </h2><p>Votre identifiant de commande est le n° ${localStorage.getItem("camId")}</p>`;

  /* Effacement local et session storage */
localStorage.clear();