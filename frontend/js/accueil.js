const camerasOrinoco = document.getElementById("produits");

// connection avec les produits sur le serveur 

const API = "http://localhost:3000/api/cameras";


async function produits(url) {
    let result = await fetch(url)
    return result.json()
}
//el await espera hasta que la promesa se resuelva

produits(API).then(cameras => {
    cameras.forEach(camera => {
        //mise en place de l'HTML
        camerasOrinoco.innerHTML +=
        `
        <article class="produit col-md-6">
           
                <a href="./produit.html?product=${camera._id}">
                    <img class="imageproduit" src="${camera.imageUrl}"  alt="photo de la caméra" width="200" height="200">
                    <div class="libelle">
                        <h3>${camera.name}</h3>
                        <p>${camera.description}</p>
                    </div>
                    <div class="prix">
                        <p>${camera.price/100},00€</p>
                    </div>
                    </a>        
            </article>
        `
    }) 
})