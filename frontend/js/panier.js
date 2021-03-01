let containerPanier = document.getElementById("basket-content");

const panier = JSON.parse(localStorage.getItem("keyPanier")) || [];




function deleteCamera(i) {
    if (panier[i].camQuantite > 1) {
        panier[i].camQuantite--;
    } else {
        panier.splice(i, 1);
    }
    localStorage.setItem('keyPanier', JSON.stringify(panier))
    window.location.reload();
}

//Création HTML du panier à partir des données des articles choisis
function displayCart() {
    let panier = localStorage.getItem("keyPanier");
    panier = JSON.parse(panier);
    var total = document.querySelector("#total-price");

    for (let i = 0; i < panier.length; i++) {
        if (panier != null) {
            containerPanier.innerHTML +=
            `
            <tr>
            <td><img class="tailleImage" src=${panier[i].camImage} alt="" /></td>
            <td>${panier[i].camName}</td>
            <td>${panier[i].camPrice}</td>
            <td>${panier[i].camQuantite}</td>
            <td><a onclick="return deleteCamera(${i})"> <i class="fas fa-trash-alt"></i></a></td>
            <td>${(panier[i].camQuantite * panier[i].camPrice)},00€</td>
            </tr>
            `
        }
    }
    APIdisplay();
    total.innerHTML = ''
    var totalProduits = localStorage.getItem("total");
    total.innerHTML +=`${totalProduits},00€`;
}
displayCart();

function APIdisplay() {
    var btnOrder = document.querySelector("#btnorder");
    var panierSettings = localStorage.getItem("keyPanier");
    panierSettings = JSON.parse(panierSettings);

    //si il n'y a pas de produit dans le panier
    if(panierSettings == null || (panierSettings.length ==0)){
        let nulCart = document.querySelector(".no-products")
        nulCart.innerHTML +=
            `
            <p>Votre panier est vide...</p>
            <p><a href="./index.html">Retour à la page d'accueil</a></p>
            `
        btnOrder.style.display = "none";
        localStorage.removeItem("total");
    } 
    else {
        let priceProduct = 0;
        for (let i=0; i < panierSettings.length; i++){ 
            //boucle qui ajoute le prix total des produits
            priceProduct += (panierSettings[i].totalPrice);
        }
        localStorage.setItem("total", priceProduct);
        //garder les produits si amount > 0 et supprimer le reste
        panierSettings = panierSettings.filter(val => {
            return (val.amount > 0);
        });
        localStorage.setItem("keyPanier", JSON.stringify(panier));
    }
    //au clic sur le bouton formualaire
    btnOrder.addEventListener('click', function() {
        let displayForm = document.querySelector("#formulaire");
        displayForm.style.display = "block";
    });  
    
}

//////////SUPPRESSION DES ARTICLES 
 /*function deleteBasket() {
    let divButtonClear = document.getElementById('button-clear-basket');
    let buttonClearBasket = document.createElement("button");
    
    divButtonClear.appendChild(buttonClearBasket);
    buttonClearBasket.classList.add("btn", "btn-info", "block-right");
    buttonClearBasket.textContent = "Vider le panier";

    buttonClearBasket.addEventListener('click', function () {
        localStorage.removeItem('keyPanier');
        let sectionBasket = document.getElementById('basket-content');
        while (sectionBasket.firstChild) {
            sectionBasket.removeChild(sectionBasket.firstChild);
        }
        if(panier == null || (panier.length ==0)){
            buttonClearBasket.style.display = "none";
        }
        
    })
} */

//deleteBasket();

//////   FORMULAIRE DE CONTACT   /////
function affichageProduitPanier() {

    let formItems = localStorage.getItem("keyPanier");
    formItems = JSON.parse(formItems);
    let productsContainer = document.querySelector("recapCommande");

    if(formItems && productsContainer){
        productsContainer.innerHTML = '';
        formItems.forEach(item => {
            productsContainer.innerHTML +=
            `
            <div class="form_product_container">
                <div class="form_product_name">
                    <p>${item.camName}</p>
                </div>
                <div class="form_product_quantity">
                    <p>Quantité: ${item.camQuantite}</p>
                </div>
                <div class="form_product_totalprice">
                    <p class="total_produit">Total:${item.camQuantite*item.camPrice},00€</p>
                </div>
            </div>
            `
        });
    }
}
affichageProduitPanier();


function validation(){
    var lastname = document.getElementById("lastname").value;
    var firstname = document.getElementById("firstname").value;
    var city = document.getElementById("city").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;
    var error_message = document.getElementById("error_message");
    var text;
    error_message.style.padding = "10px";

    if (/[0-9]/.test(firstname) || /[§!@#$%^&*().?":{}|<>]/.test(firstname) || !firstname){
        text = "Merci d'entrer un prénom valide";
        error_message.innerHTML = text;
        return false;
    }   
    if(/[0-9]/.test(lastname) || /[§!@#$%^&*().?":{}|<>]/.test(lastname) || !lastname){
        text = "Merci d'entrer un nom valide";
        error_message.innerHTML = text;
        return false;
    }
    if(address.length <5 || address.length>250){
        text = "Merci d'entrer une adresse postal valide";
        error_message.innerHTML = text;
        return false;
    }
    if(city.length <2 || city.length>70){
        text = "Merci d'entrer une ville valide";
        error_message.innerHTML = text;
        return false;
    }
    if(email.indexOf("@") == -1 || email.length <5 || email.indexOf(".") ==-1 || email.length >250){
        text = "Merci d'entrer une adresse email valide";
        error_message.innerHTML = text;
        return false;
    }
    return true;
}

var form = document.querySelector('#myform');

form.addEventListener('submit', function(e) {
    e.preventDefault() //bloc le comportement du formulaire
    if(validation() == true){
        var contactForm = {};
        var saveProducts = localStorage.getItem("keyPanier");
        contactForm["firstName"] = firstname.value;
        contactForm["lastName"] = lastname.value;
        contactForm["address"] = address.value;
        contactForm["city"] = city.value;
        contactForm["email"] = email.value;

        localStorage.setItem("contact", JSON.stringify(contactForm));
        saveProducts = JSON.parse(saveProducts);
        saveProducts = saveProducts.map(save =>{
            save = save.id/*+save.amount*/
            return save;
        })
        localStorage.setItem("products", JSON.stringify(saveProducts));
        document.location.href="./confirmation.html";
    }
});

