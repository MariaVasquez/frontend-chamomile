let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 2000);
}

const data = [
  { id: 1, name: 'bolso 1', price: 10, link:"../../asp/home/bolsos/bolso1.jpeg"  },
  { id: 2, name: 'bolso 2', price: 20, link:"../../asp/home/bolsos/bolso2.webp"  },
  { id: 3, name: 'bolso 3', price: 30, link:"../../asp/home/bolsos/bolso3.webp"  },
  { id: 4, name: 'bolso 4', price: 40, link:"../../asp/home/bolsos/bolso4.jpg"  },
  { id: 5, name: 'bolso 5', price: 50, link:"../../asp/home/bolsos/bolso5.jpg"  },
  { id: 6, name: 'bolso 6', price: 60, link:"../../asp/home/bolsos/bolso6.jpeg"  },
  { id: 7, name: 'bolso 7', price: 70, link:"../../asp/home/bolsos/bolso7.webp"  },
  { id: 8, name: 'bolso 8', price: 80, link:"../../asp/home/bolsos/bolso8.jpeg"  }
];

const itemsPerPage = 6;
let currentPage = 1;

const contentDiv = document.getElementById('content');
const paginatorDiv = document.getElementById('paginator');

function showData(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = data.slice(startIndex, endIndex);

  let html = '<div class="view-product">';
  pageData.forEach(item => {
    html += `<img src="${item.link}">`;
  });

  contentDiv.innerHTML = html+"</div>";
}

function updatePaginator() {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  let html = '';
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="pageBtn" data-page="${i}">${i}</button>`;
  }
  paginatorDiv.innerHTML = html;

  const pageButtons = document.querySelectorAll('.pageBtn');
  pageButtons.forEach(button => {
    button.addEventListener('click', () => {
      currentPage = parseInt(button.dataset.page);
      showData(currentPage);
      updatePaginator();
    });
  });

  const prevBtn = document.createElement('button');
  prevBtn.textContent = '◄';
  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      showData(currentPage);
      updatePaginator();
    }
  });

  const nextBtn = document.createElement('button');
  nextBtn.textContent = '►';
  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      showData(currentPage);
      updatePaginator();
    }
  });

  paginatorDiv.insertBefore(prevBtn, paginatorDiv.firstChild);
  paginatorDiv.appendChild(nextBtn);

  updatePageButtons();
}

function updatePageButtons() {
  const pageButtons = document.querySelectorAll('.pageBtn');
  pageButtons.forEach(button => {
    button.classList.remove('active');
    if (parseInt(button.dataset.page) === currentPage) {
      button.classList.add('active');
    }
  });
}

showData(currentPage);
updatePaginator();