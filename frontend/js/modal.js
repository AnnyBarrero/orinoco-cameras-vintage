const body = document.querySelector("body");


let calc;
let modal;
let confirmation;
let cancel;


const createCalc = ()=>{
   calc=document.createElement("div");
   calc.classList.add("calc");
   calc.addEventListener("click", ()=>{
    calc.remove();
});
   
}
const createCalcPanier = ()=>{
    calc=document.createElement("div");
    calc.classList.add("calc");
    
 }
const createModal =(question)=>{
    modal = document.createElement("div");
    modal.classList.add("modale");
    modal.innerHTML= `<p> ${question} </p>`;
    confirmation = document.createElement("button");
    confirmation.classList.add("btn", "btn-info");
    confirmation.innerText= "Confirmer";
    cancel = document.createElement("button");
    cancel.classList.add("btn", "btn-info");
    cancel.innerText = "Panier";
    modal.append(confirmation, cancel);
    confirmation.addEventListener('click', ()=>{
        window.location.href= "index.html";
    });
    cancel.addEventListener('click', ()=>{
        window.location.href= "panier.html";
    });
}
const createModalPanier= (question)=>{
    modal = document.createElement("div");
    modal.classList.add("modale");
    modal.innerHTML= `<p> ${question} </p>`;
    confirmation = document.createElement("button");
    confirmation.classList.add("btn", "btn-info");
    confirmation.innerText= "Confirmer";
    cancel = document.createElement("button");
    cancel.classList.add("btn", "btn-info");
    cancel.innerText = "Annuler";
    modal.append(confirmation, cancel);
}
function openModal(question) {
    createCalc();
    createModal(question);
   calc.append(modal);
    body.append(calc);
   
    
};

function openModalPanier(question){
    createCalcPanier();
    createModalPanier(question);
   calc.append(modal);
    body.append(calc);
    return new Promise ((resolve)=>{
            calc.addEventListener('click', ()=>{
            resolve(false);
            calc.remove();
        });
        confirmation.addEventListener('click', ()=>{
            resolve(true);
            
        });
        cancel.addEventListener('click', ()=>{
            resolve(false);
            calc.remove();
        });

    });
    
};