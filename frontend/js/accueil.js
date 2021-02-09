const camerasOrinoco = document.querySelector('#produits');


//CRée un appel AJAX
let requete = new XMLHttpRequest;
    requete.open('GET', 'http://localhost:3000/api/cameras');
    requete.responseType = 'json';
    requete.send(); //j'envoie ma requete
    //Des qu'on reçoit la réponse, on execute la fonction: 
    requete.onload = function () {
    if (requete.readyState === XMLHttpRequest.DONE ) {//aca tengo que verificar el estado de la requete
        if(requete.status === 200 ||requete.status === 201){ //200 OK tout s'est bien passé
            camerasArray = requete.response; //je stocke la reponse dans une variable
            
            afficherCameras(camerasArray); //j'affiche dynamiquement les cameras en utilisant la fonction
            }

    } else {
        alert("Un probleme est survenu, merci de réesayer plus tard");
    }
    }
 
//creation de la fonction pour afficher les cameras, une par une
function afficherCameras(cams) {
     cams.forEach(afficherCamera);
    }

 // creation de la fonction pour afficher une camera
function afficherCamera(camera){
    const cameraElement = document.createElement('div');
    cameraElement.setAttribute("class","col-lg-5 col-md-6 mb-4 item-card")
    cameraElement.innerHTML =
    `
        <div class="card text-center"> 
            <div class="card-header">
                <h2> ${camera.name}</h2>
                <p> ${camera.price/100} € </p>
            </div>
            <div class="card-body">
                <img class="card-img-top" src="${camera.imageUrl}" alt="">
                <p class="card-text">${camera.description} </p> 
            </div>
            <div class="card-footer text-muted">
                <a href="produit.html?id=${camera._id}"> 
                 <button type="button" class="btn btn-info btn-xs btn-block" > Sélectionnez </button>
                 </a>
            </div> 
        </div>
    `;
    camerasOrinoco.appendChild(cameraElement);
}

