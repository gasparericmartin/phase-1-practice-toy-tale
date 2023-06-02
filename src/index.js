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

  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => {
    data.forEach(element => handleToyCards(element))  
  })

  
  document.getElementsByClassName('add-toy-form')[0].addEventListener('submit', (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/toys',{
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'applicaton/json'
      },
      body: JSON.stringify({
        'name': e.target.childNodes[3].value,
        'image': e.target.childNodes[7].value,
        'likes': 0
      })
    })
    .then(response => response.json())
    .then(data => handleToyCards(data))
  

  })



  function handleToyCards(element) {
    const toyContainer = document.createElement('div')
    const toyName = document.createElement('h2')
    const toyPic = document.createElement('img')
    const toyLikes = document.createElement('p')
    const cardButton = document.createElement('button')

    toyContainer.classList.add('card')
    toyName.textContent = element.name
    toyPic.src = element.image
    toyPic.classList.add('toy-avatar')
    toyLikes.textContent = element.likes 
    cardButton.classList.add('like-btn')
    cardButton.id = element.id
    cardButton.textContent = 'Like ❤️'
    cardButton.addEventListener('click', handleLikeButton)

    toyContainer.appendChild(toyName)
    toyContainer.appendChild(toyPic)
    toyContainer.appendChild(toyLikes)
    toyContainer.appendChild(cardButton)

    document.getElementById('toy-collection').appendChild(toyContainer)
  }


  function handleLikeButton(e) {
    const newLikeNum = parseInt(e.target.parentNode.childNodes[2].textContent) + 1
    const id = e.target.id.toString()
    fetch(`http://localhost:3000/toys/${id}`,{
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify({
        'likes': newLikeNum
      })
    
    })
    .then(response => response.json())
    .then(data => e.target.parentNode.childNodes[2].textContent = data.likes)
    .catch(e => console.log(e))
    
  }


});
