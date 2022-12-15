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

