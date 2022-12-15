import menu from './src/data/data.js'
console.log(menu)

const section_center = document.querySelector('.section-center');

let displayMenu = menu.map(function (item) {

    return `<article class="menu-item">
                <div class = "food-img">
                    <img src=${item.img} alt=${item.title} class="photo" />
                    <span><i class = "far fa-heart"></i></span>
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
                        <div class="order-order center modal">
                            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            </article>`;

  });

displayMenu = displayMenu.join("");
section_center.innerHTML = displayMenu;


const modalContainer = document.getElementById('modal-container')

const displayModal = `
                      <div id="modal">
                            <div id="first-part-block">
                                <img src="./back_img/food-icon.png" alt="Italian Trulli" id="food-icon">
                            </div>
                            <form action="" class="modal-form">
                                <div class="modal-selection">
                                    <label for="" class="pristatymo_budas_label">Pristatymo būdas</label>
                                    <select  class="custom-select mas" id="Pristatymo_būdas" required>
                                        <option value="" disabled selected>Pasirinkti...</option>
                                        <option value="Pristatymas į namus">Pristatymas į namus</option>
                                        <option value="Atsiėmimas vietoje">Atsiėmimas vietoje</option>
                                    </select>
                                </div>
                                <label for="" class="pristatymo_adresas_label">Pristatymo adresas</label>
                                <div class="modal-input-div">
                                    <input type="text" class="modal-input">
                                </div>
                                <div id="close-btn">&times;</div>
                                <div class="uzsakyti-btn-container">
                                    <button class="uzsakyti-btn">Užsakyti</button>
                                </div>
                            </form>
                        </div>`

modalContainer.innerHTML = displayModal;

const openModal = document.querySelectorAll('.modal')
const closeBtn = document.getElementById('close-btn');

openModal.forEach((open) => {
    open.addEventListener('click', function(){
        modalContainer.style.display = 'block';
    })
  })

closeBtn.addEventListener('click', function(){
    modalContainer.style.display = 'none';
})


window.addEventListener('click', function(e) {

    if (e.target === modalContainer) {
        modalContainer.style.display = 'none';
    }

})