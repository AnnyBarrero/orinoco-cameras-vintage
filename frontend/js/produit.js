///// ///// ///// ///// PAGE PRODUIT ////// ///// ///// /////
const urlCameras = "http://localhost:3000/api/cameras/";
const searchParams = new URLSearchParams(window.location.search);
const itemId = searchParams.get("id");
const urlApiId = urlCameras + "/" + itemId;
//Connection avec les produits sur le serveur 
const descriptionproduit = document.getElementById('descriptionproduit');
//Button add-to-cart
let addCartBtn = document.getElementById('btnAddCart');

/**
 * set panier value
 * @param {*} newCam 
 * return object
 */
function setPanierValue(newCam) {
    return {
        camName: newCam.name,
        camPrice: newCam.price / 100,
        camId: newCam._id,
        camImage: newCam.imageUrl,
        camQuantite: parseInt(document.getElementById("qte").value),
        get totalPrice() {
            return this.camPrice * this.camQuantite;
        }
    };
}

const appelDeApi = async function() {
    let response = await fetch(urlApiId);
    if (response.ok) {
        const newCam = await response.json();
        //Fonction pour afficher l'item
        afficherUnItem(newCam);
        // Al'ecoute du btn ajout panier
        addCartBtn.addEventListener('click', (e) => {
            const article = setPanierValue(newCam);
            if (typeof localStorage != "null") {
                //on recupere la valeur dans le Web Storage
                const panier = JSON.parse(localStorage.getItem("keyPanier")) || [];
                let newPanier;
                if (panier.length === 0) {
                    panier.push(article); //on crée le tableau
                } else {
                    // vérifier si le produit est déjà dans le panier
                    let isItemInPanier = panier.find(item => item.camId === newCam._id);
                    if (isItemInPanier) {
                        newPanier = panier.map(function(item) {
                            if (item.camId === newCam._id) {
                                // le produit existe déjà, je doit changer la quantité
                                item.camQuantite = parseInt(item.camQuantite) + parseInt(document.getElementById("qte").value);
                            }
                            return item;
                        });
                    } else {
                        panier.push(article);
                    }
                    // ajouter dans le panier
                }
                if (newPanier) {
                    localStorage.setItem("keyPanier", JSON.stringify(newPanier))

                } else {
                    localStorage.setItem("keyPanier", JSON.stringify(panier));

                }
                alert("Votre caméra a bien été ajouté au panier")
                location.reload();
            }
        });

    }
};


//mise en place de l'HTML
function afficherUnItem(newCam) {
    let cameraCart = document.createElement("div");
    cameraCart.setAttribute("class", "flex-row flex-wrap border-0 card")
    cameraCart.innerHTML = `
        <div class=" col-lg-6 col-md-12  float-start card border-0">
            <img id="imageUrl" src="${newCam.imageUrl}" alt="">        
        </div>
        <div class="col-lg-6 col-md-12 col-sm-12  float-end text-center bg-transparent border-0">
            <div class="card-header border-0 bg-transparent">
              <h2 class="card-title bg-transparent name-couleurs" id="titre">${newCam.name}</h2> 
            </div>
            <div class="card-body border-0">
              <p class="card-text border-0" id="description">
                    ${newCam.description}
                </p> 

                <label for="quantité">Quantité (<em> Dans la limite des cameras </em>) </label>
                <select class="cameras disponibles" id="qte" name="quantité">
                </select>
                <p class="lentilles-choix"> Choisissez une lentille </p>
                <select name="lentilles disponibles" id="choixlentilles">
                </select>
            </div>
            <p class="card-text bg-transparent prix-coleurs" id="prix"> ${newCam.price/100} €</p>
        </div>    
              
            `;
    descriptionproduit.appendChild(cameraCart);
    compteur();
    choixlentilles(newCam);
};

//fonction pour la quantité
function compteur() {
    let optionQty = document.getElementById("qte");
    for (let nbr = 1; nbr <= 10; nbr++) {
        let newQty = document.createElement("option");
        newQty.innerText += nbr;
        optionQty.append(newQty);
    }
};
//fonction pour afficher les options de couleurs.
function choixlentilles(newCam) {
    let choixlentilles = document.getElementById("choixlentilles")
    for (let i = 0; i < newCam.lenses.length; i++) {
        let newchoixlentilles = document.createElement("option")
        newchoixlentilles.innerText = newCam.lenses[i];
        choixlentilles.append(newchoixlentilles);
    }

};

appelDeApi();