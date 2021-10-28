const form = document.querySelector("form");
const input = document.querySelector("input");
const cards = document.querySelector(".cards");
const usersNbr = document.querySelector(".users-nbr");
const clearBtn = document.querySelector('.clear-btn')
const moreBtn = document.querySelector('.more-btn')

input.focus();
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nbr = input.value;
  const api = `https://randomuser.me/api/?results=${nbr}`;
  fetch(api)
    .then((data) => {
      return data.json();
    })
    .then(getResult);

  function getResult(newdata) {
    newdata.results.forEach((user) => {
      usersNbr.textContent = `Searched ${newdata.results.length} users`;
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="card">
        <div class="info">
            <img src=${user.picture.medium} style="width: 100px; height: 100px; background-color: #000;" alt="">
            <div class="user-content">
                <h3 class="name">Name:${user.name.first}</h3>
                <h4 class="age">Age: ${user.dob.age}</h4>
                <p class="location">Location:${user.location.city}</p>
            </div>
        </div>
        <div class="btns">
            <button class="delete-btn">Delete</button>
            <button class="more-btn">More...</button>
        </div>
        </div>
        `;
      cards.appendChild(div);
      input.value = "";
      input.innerText = ''
    });
  }
  console.log(nbr);
});

document.addEventListener("click", (e) => {
  if (e.target.classList.value == "delete-btn") {
    const deleteBtn = document.querySelector('.delete-btn')
    deleteBtn.parentElement.parentElement.parentElement.remove()
  }
});

clearBtn.addEventListener('click', (e)=>{
  cards.innerHTML = ''
})

// More Button event
// moreBtn.addEventListener('click', (e)=>{
//   e.preventDefault()
//   const div = document.createElement('div')
//   const modal = document.querySelector('.modal')
//   div.innerHTML = `
//   <p>Data: ${user}</p>
//   `
//   modal.appendChild(div)
// })
