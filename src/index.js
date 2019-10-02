const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
//const API = 'https://rickandmortyapi.com/api/character/';
const API2 = 'https://us-central1-escuelajs-api.cloudfunctions.net/characters/';


/*const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const next_fetch = response.info.next;
      localStorage.setItem('next_fetch', next_fetch);
      const characters = response.results;
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}*/

async function getData(api) {
  try {
    const result = await fetch(api);
    const response = await result.json();
    const next_fetch = response.info.next;
        sessionStorage.setItem('next_fetch', next_fetch);
        const characters = response.results;
        let output = characters.map(character => {
          return `
        <article class="Card">
          <img src="${character.image}" />
          <h2>${character.name}<span>${character.species}</span></h2>
        </article>
      `
        }).join('');
        let newItem = document.createElement('section');
        newItem.classList.add('Items');
        newItem.innerHTML = output;
        $app.appendChild(newItem);
  }catch(error) {
    console.log(error);
  }

}

async function loadData() {
  console.log(localStorage.getItem('next_fetch'));
  const next_fetch = sessionStorage.getItem('next_fetch');
  if(next_fetch !== null){
    const data1 = await getData(next_fetch);
    //localStorage.removeItem('next_fetch');
  }else {
    const data2 = await getData(API2);
    //
    //$observe.unregisterObserver(this);
  }
  
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);