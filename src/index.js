let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const form = document.querySelector('.add-toy-form');
  form.addEventListener("submit", addNewToy);
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch('http://localhost:3000/toys')
.then((resp) => resp.json())
.then((toyData) => toyData.forEach(toy => showToy(toy)))

const toyImgContainer = document.querySelector('#toy-collection');

function showToy(toy) {

  const divForToyCard = document.createElement('div')
    divForToyCard.className = "card"

  const h2ForToyCard = document.createElement('h2')
    h2ForToyCard.textContent = toy.name

  const imgForToyCard = document.createElement('img')
    imgForToyCard.src = toy.image
    imgForToyCard.className = "toy-avatar"

  const pForToyCard = document.createElement('p')
    pForToyCard.textContent = `${toy.likes} likes`

  const buttonForToyCard = document.createElement('button')
    buttonForToyCard.className = "like-btn"
    buttonForToyCard.innerText = "Like ❤️"
    buttonForToyCard.id = toy.id  
    buttonForToyCard.addEventListener("click", (event) => {
      event.preventDefault()
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          likes:  toy.likes ++ 
        })
      })
      .then((resp) => resp.json())
      .then((resp) => {
        event.target.parentElement.children[2].textContent = `${resp.likes} likes`
      })
    }) 
    
  
   divForToyCard.append(
        h2ForToyCard, 
        imgForToyCard, 
        pForToyCard, 
        buttonForToyCard
        )

      toyImgContainer.append(divForToyCard)
    }
  

 function addNewToy(event) {
  event.preventDefault()
  const [name, image] = event.target

  fetch('http://localhost:3000/toys', { 
  method: "POST",
  headers:{
    "Content-Type": "application/json",
},
  body: JSON.stringify({
    name: name.value,
    image: image.value,
    likes: 0
  })
 })
.then((resp) => resp.json())
.then((resp) => showToy(resp))
name.value = ""
image.value = ""

 }