const panier = JSON.parse(localStorage.getItem("keyPanier")) || [];
//////Création de l'objet contact contenant les données du formulaire qui va être envoyé au serveur

///////////Supression des caméras une par une/////////////
function deleteCamera(i) {
    if (panier[i].camQuantite > 1) {
        panier[i].camQuantite--;
    } else {
        panier.splice(i, 1);

    }
    localStorage.setItem('keyPanier', JSON.stringify(panier))
    window.location.reload();
}
//////////SUPPRESSION total du panier//////////
function removeCameras() {
    localStorage.removeItem('keyPanier');
    window.location.reload();
    //let totalPrice = document.getElementById('total-price');
    //totalPrice.textContent = "Prix total : 0 €";
}
//Création HTML du panier à partir des données des articles choisis
(function() {
    let panier = JSON.parse(localStorage.getItem("keyPanier"));
    var btnOrder = document.getElementById("btnorder");
    const total = document.getElementById("total-price");

    if (panier && panier.length > 0) {
        for (let i = 0; i < panier.length; i++) {
            document.getElementById("basket-content").innerHTML +=
                `<tr>
            <td><img class="tailleImage" src=${panier[i].camImage} alt="" /></td>
            <td>${panier[i].camName}</td>
            <td>${panier[i].camPrice}</td>
            <td>${panier[i].camQuantite}</td>
            <td><a onclick="return deleteCamera(${i})"> <i class="fas fa-trash-alt"></i></a></td>
            <td>${(panier[i].camQuantite * panier[i].camPrice)},00€</td>
            </tr>`;
        }
        // insert clear all from basket
        document.getElementById("button-clear-basket").innerHTML = `<button class="btn all-buttons" onclick="return removeCameras();">Vider le panier</button>`;
        // il sert a rien -> utiliser reduce avec keyPanier
        const compteurPanierPrixTotal = () => {
            let arrayCompteurPanier = [];
            let arrayPrixTotal = [];
            for (const cameraDansLePanier of panier) {
                let camQte = cameraDansLePanier.camQuantite;
                arrayCompteurPanier.push(camQte);
                let prix = cameraDansLePanier.camPrice * camQte;
                arrayPrixTotal.push(prix);
            }
            if (arrayCompteurPanier.length === 0) {
                location.assign('panier.html');
            } else {
                let compteurPanier = arrayCompteurPanier.reduce((accumulater, valeurCourante) => accumulater + valeurCourante);
                let itemInCart = document.getElementById("cart-qte");
                itemInCart.innerHTML = ` (${compteurPanier}) `;
            }
            let prixTotal = arrayPrixTotal.reduce((accumulater, valeurCourante) => accumulater + valeurCourante);

            total.innerHTML += `Total panier:${prixTotal}€`;
            localStorage.setItem("totalPrice", prixTotal);

        }
        compteurPanierPrixTotal()
        // send form
        btnOrder.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('titi');
            formulaire.style.display = "block";
            sendForm();
        });
    } else {
        total.innerHTML = `Votre panier est vide </br>
                          <a href="./index.html">  Retour à la page d'accueil </a>`;
        btnOrder.style.display = "none";
    }
})
();

//////   FORMULAIRE DE CONTACT   /////
function sendForm() {
    document.getElementById('btnsend').addEventListener('click', function(e) {
        e.preventDefault();
        // il faut récupérer que les ID qui sont dans le panier
        const products = [];
        let contact = {};
        let formIsInvalid = "";
        var lastName = document.getElementById("lastname").value;
        var firstName = document.getElementById("firstname").value;
        var city = document.getElementById("city").value;
        var address = document.getElementById("address").value;
        var email = document.getElementById("email").value;
        var error_message = document.getElementById("error_message");

        error_message.style.padding = "10px";
        if (/[0-9]/.test(firstName) || /[§!@#$%^&*().?":{}|<>]/.test(firstName) || !firstName)
            formIsInvalid += "Votre prénom est invalide \n";
        else if (/[0-9]/.test(lastName) || /[§!@#$%^&*().?":{}|<>]/.test(lastName) || !lastName)
            formIsInvalid += "Votre nom de famille est invalide \n";
        else if (!address)
            formIsInvalid += "Votre adresse est invalide \n";
        else if (/[0-9]/.test(city) || !city)
            formIsInvalid += "Votre ville est invalide \n";
        else if (!/@/.test(email) || !email)
            formIsInvalid += "Votre mail est invalide \n";

        if (formIsInvalid) {
            console.log('toto');
            error_message.innerHTML = formIsInvalid;
            return;
        }
        //alert("Erreur : \n" + formIsInvalid);
        else {
            contact = {
                lastName: lastName,
                firstName: firstName,
                address: address,
                city: city,
                email: email,
            };

            //Requête POST pour envoyer l'objet Contact et le tableau products à l'API
            fetch("http://localhost:3000/api/cameras/order", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contact,
                    products
                })
            }).then(function(response) {
                /* Si connection ok ajout orderId au local storage */
                if (response.ok) {
                    response.json().then(function(responseData) {
                        sessionStorage.setItem("orderId", responseData.orderId);
                    });
                    window.location.href = "confirmation.html"
                } else {
                    Promise.reject(response.status);
                }
            }).catch(function(error) {
                console.log(error);
                alert("Un problème est survenu, merci de réessayer plus tard");
            });

        }
    });

}