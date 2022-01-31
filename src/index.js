let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
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

  //Renders our Toys to the DOM
  function createToy(toy) {
    let card = document.createElement('div');
    card.className = 'card'
    card.innerHTML = 
    `<h2>${toy.name}</h2> 
    <img src="${toy.image}" class="toy-avatar"/> 
    <p>${toy.likes} likes</p> 
    <button class="like-btn" id="${toy.id}">like ❤️</button>`;
   
    card.querySelector('.like-btn').addEventListener('click', () => {
      toy.likes+= 1
      card.querySelector('p').textContent = `${toy.likes } likes`
      handleLikes(toy);
    });

   //Add to the DOM
   document.querySelector('#toy-collection').append(card);
  }
    
  document.querySelector('form').addEventListener("submit", handleSubmit)
    function handleSubmit(e) {
    e.preventDefault();
    let toyObject = { 
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    createToy(toyObject); 
    addToCollection(toyObject);
  }

  function addToCollection(toyObject) {
    fetch("http://localhost:3000/toys", {
      method: 'POST', 
      headers: {
        'Content-Type' : 'application/json' , 
      }, 
      body: JSON.stringify(toyObject),
    })
    .then(res => res.json())
    .then(data => console.log('Success:', data));
  }
    
  function handleLikes(toyObject) {
    fetch(`http://localhost:3000/toys/${toyObject.id}`, {
      method: 'PATCH', 
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({likes: toyObject.likes})
    })
    .then(res => res.json())
    .then(toy => console.log(toy));
  }

  //Fetches the Toys array of Objects and sends each to the CreateToy functon ,creating each Node
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toyObjects => toyObjects.forEach(toy => createToy(toy)))

});