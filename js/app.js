// #1
class StringBuilder {
  constructor(baseSgtring) {
    this.baseSgtring = baseSgtring || '';
  }
  append(str) {
    this.baseSgtring += str;
    return this;
  }
  prepend(str) {
    this.baseSgtring = str + this.baseSgtring;
    return this;
  }
  pad(str) {
    this.baseSgtring = str + this.baseSgtring + str;
    return this;
  }
}

const builder = new StringBuilder('.');
builder
 .append('^')
 .prepend('^')
 .pad('=');
console.log(builder);

// #2
const boxes = document.querySelector('#boxes');
const controls = document.querySelector('#controls');
const input = document.querySelector('.js-input');
controls.addEventListener('click', function(e) {
  const action = e.target.getAttribute('data-action');
  switch (action) {
    case 'create':
      createBoxes(input.value);
      break;
    case 'destroy':
      destroyBoxes();
      break;
  }
});

function createBoxes(amount) {
  for(let i=1; i<=+amount; i++) {
    const div = document.createElement('div');
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    div.style.width = 30 * i + 'px';
    div.style.height = 30 * i + 'px';
    div.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    boxes.append(div)
  }
  input.value = '';
}
function destroyBoxes() {
  boxes.innerHTML = '';
}

// #3
const url = 'https://pixabay.com/api/?key=16812386-9ea8e062917dc634f468763c4';
const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('#gallery');
const inputQuery = document.querySelector('.input-query');
let page = 1;
searchForm.addEventListener('submit', function(e) {
  e.preventDefault();
  infiniteScroll();
});
gallery.addEventListener('click', function(e) {
  e.preventDefault();
  if(e.target.tagName === 'IMG') {
    const imgSrc = e.target.getAttribute('data-source');
    basicLightbox.create(`<img src="${imgSrc}">`).show()
  }
});

async function getImages() {
  const query = inputQuery.value;
  await fetch(`${url}&q=${query}&page=${page}`)
    .then(res => res.json())
    .then(images => {
      images.hits.forEach(image => {
        gallery.insertAdjacentHTML('beforeend', `<li>
        <a href="${image.largeImageURL}">
          <img src="${image.webformatURL}" data-source="${image.largeImageURL}" alt="${image.tags}">
        </a>
      </li>`)
      });
      page++;
    });
}

function infiniteScroll() {
  const options = {
    threshold: 1
  }
  observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        getImages();
      } 
    });
  }, options);
  observer.observe(document.querySelector('#trigger'));
}
