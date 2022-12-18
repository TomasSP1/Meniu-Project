import menu from './src/data/data.js'
// console.log(menu)
 
 
window.addEventListener("DOMContentLoaded", function () {
 
  displayMenuItems(menu);
  renderAndBindMenuCategories();
 
});
 
const section_center = document.querySelector('.section-center');
const btnContainer = document.querySelector(".btn-container")
 
function displayMenuItems(pageMenuItems) {
 
  let menuItemsHtml = pageMenuItems.map(function (item) {
 
    return `<article class="menu-item">
                <div class = "food-img">
                    <img src=${item.img} alt=${item.title} class="photo" />
                    <span><i class = "far fa-heart" data-id="${item.id}"></i></span>
                </div>
                <div class="item-info">
                    <header>
                        <h4>${item.title}</h4>
                        <h4 class="price">$${item.price}</h4>
                    </header>
                    <p class="item-text">
                        ${item.desc}
                    </p>
                    <div class = "food-price-calc">
                        <h2 class = "food-total"></h2>
                        <div class = "food-quantity">
                            <div class = "order-dec center">
                                <i class = "fas fa-minus"></i>
                            </div>
                        <div class = "order-val center">0</div>
                        <div class = "order-inc center">
                            <i class = "fas fa-plus"></i>
                        </div>
                        <div class="order-order center cart">
                            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            </article>`;
  });
 
  menuItemsHtml = menuItemsHtml.join("");
  section_center.innerHTML = menuItemsHtml;
 
  // creating modal
 
  const modalContainer = document.getElementById('modal-container')
 
  const displayModal = `
                        <div id="modal">
                              <div id="first-part-block">
                                  <img src="./back_img/food-icon.png" alt="Italian Trulli" id="food-icon">
                              </div>
                              <form action="" class="modal-form">
                                  <div class="modal-selection">
                                      <label for="" class="label_delivery">Pristatymo būdas</label>
                                      <select  class="custom-select mas" id="select_delivery" required>
                                          <option value="" disabled selected>Pasirinkti...</option>
                                          <option value="Pristatymas į namus">Pristatymas į namus</option>
                                          <option value="Atsiėmimas vietoje">Atsiėmimas vietoje</option>
                                      </select>
                                  </div>
                                  <label for="" class="label_address">Pristatymo adresas / Restorano adresas</label>
                                  <div class="modal-input-div">
                                      <input type="text" class="modal-input">
                                  </div>
                                  <div id="close-btn">&times;</div>
                                  <div class="order-btn-container">
                                      <button class="order-btn">Užsakyti</button>
                                  </div>
                              </form>
                          </div>`
 
  modalContainer.innerHTML = displayModal;
 
 
  const openModal = document.querySelectorAll('.cart')
  const closeBtn = document.getElementById('close-btn');
 
  openModal.forEach((open) => {
    open.addEventListener('click', function () {
      modalContainer.style.display = 'block';
    })
  })
 
  closeBtn.addEventListener('click', function () {
    modalContainer.style.display = 'none';
  })
 
 
  window.addEventListener('click', function (e) {
 
    if (e.target === modalContainer) {
      modalContainer.style.display = 'none';
    }
 
  })
 
  // heart button and localStorage
  const myArray = JSON.parse(localStorage.getItem("favorite")) || [];
 
  const heartBtns = document.querySelectorAll('.fa-heart');
 

  myArray.forEach((item) => {
    heartBtns.forEach(heartBtn => {
      console.log(heartBtn.getAttribute('data-id'), item.id, heartBtn.getAttribute('data-id') == item.id);
 
      if (heartBtn.getAttribute('data-id') == item.id) {
        console.log('first time added set active item', heartBtn.classList)
        heartBtn.classList.add("fas");
        console.log('first time added set active item', heartBtn.classList)
        
      }
    })
    // console.log(item);
    // console.log(id, heartBtn[id]);
  });
 
  heartBtns.forEach((button) => {
    button.addEventListener("click", function () {
      const finded = menu.find((item) => item.id == button.getAttribute('data-id'));
      // console.log("finded", finded);
 
      const indeksas = myArray.findIndex((el) => el.id == button.getAttribute('data-id'));
 
      console.log("indeksas", indeksas);
      if (indeksas === -1) {
        myArray.push(finded);
        button.classList.add("fas");
        console.log('added set active item on click')
      } else {
        myArray.splice(indeksas, 1);
        button.classList.remove("fas");
        console.log('remove active item on click')
      }
      localStorage.setItem("favorite", JSON.stringify(myArray));
    });
  });
 
 
  // creating counting system with plus and minus
 
  const allFood = document.querySelectorAll('.menu-item');
 
  allFood.forEach((food, index) => {
 
    food.querySelector('.food-total').textContent = '$ 0.00'
 
  })
 
  allFood.forEach((food, index) => {
 
    food.addEventListener('click', (event) => {
 
      if (event.target.classList.contains('order-dec') || event.target.parentElement.classList.contains('order-dec')) {
 
        changeOrder(food, 'dec');
 
      }
 
 
      if (event.target.classList.contains('order-inc') || event.target.parentElement.classList.contains('order-inc')) {
 
        changeOrder(food, 'inc');
 
      }
 
    });
 
  });
 
  function changeOrder(food, changeType) {
 
    let foodQuan = parseInt(food.querySelector('.order-val').textContent);
    let foodPrice = parseFloat(food.querySelector('.price').textContent.replace(/[^\d.-]/g, ''));
 
 
    if (changeType === 'dec' && foodQuan > 0) foodQuan--;
 
    if (changeType === 'inc') foodQuan++;
 
    food.querySelector('.order-val').textContent = foodQuan;
    food.querySelector('.food-total').textContent = `$ ${(foodQuan * foodPrice).toFixed(2)}`;
 
  }
 
}
 
 
 
 
 
 
 
 
// creating buttons for menu filtering
 
function renderAndBindMenuCategories() {
 
  const categories = menu.reduce(
    function (values, item) {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["all"]
  );
 
  const categoryBtns = categories
    .map(function (category) {
      return `<button type="button" class="filter-btn" data-id=${category}>
            ${category}
          </button>`;
    })
    .join("");
 
  btnContainer.innerHTML = categoryBtns;
 
  const filterBtns = btnContainer.querySelectorAll(".filter-btn");
 
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const category = e.currentTarget.dataset.id;
 
      const menuCategory = menu.filter(function (menuItem) {
        if (menuItem.category === category) {
          return menuItem;
        }
      });
 
      if (category === "all") {
        displayMenuItems(menu);
      } else {
        displayMenuItems(menuCategory);
      }
    });
 
  });
}


