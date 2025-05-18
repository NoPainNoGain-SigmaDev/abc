
//Shopping cart beggins here

const closeBtn = document.getElementById("close-btn");
const cartWindow = document.querySelector(".view-cart-window");
const viewCartBtn = document.getElementById("view-cart-btn");
const cartTotal = document.getElementById("total");
const productsContainer = document.getElementById("view-cart-products");
const clearBtn = document.getElementById("clear-btn");
const checkoutBtn = document.getElementById("checkout-btn");
const addToCartBtns = document.querySelectorAll(".add-to-cart");

//Product info
const products = [
  {
    name: "Individual Pilates Session",
    price: 10,
    id: "individual-pilates",
  },
  {
    name: "Individual Yoga Session",
    price: 10,
    id: "individual-yoga",
  },
  {
    name: "Individual Kickboxing Session",
    price: 10,
    id: "individual-kickboxing",
  },
  {
    name: "Group Pilates Session",
    price: 20,
    id: "group-pilates",
  },
  {
    name: "Group Yoga Session",
    price: 20,
    id: "group-yoga",
  },
  {
    name: "Group Kickboxing Session",
    price: 20,
    id: "group-kickboxing",
  },
  {
    name: "Water Bottle",
    price: 15,
    id: "product-water-bottle",
  },
  {
    name: "T-shirt",
    price: 15,
    id: "product-t-shirt",
  },
  {
    name: "Premium Yoga Mat",
    price: 15,
    id: "product-yoga-mat",
  },
];




//Finds a product from products
const findProduct = (productId) =>
  products.find((product) => productId === product.id);

//Adds the item to the cart
const addToCart = (e) => {
  const price = e.target.value;
  const id = e.target.id;

  cart.products[id] = (cart.products[id] || 0) + 1;
  cart.updateCart();

  //Alert when any item is added
  setAlertMessage("🛒 Item added to cart.");
  alertWindow.classList.toggle("hidden");
};

const createImgPath = (id) => {
  return `./img/${id}.png`;
};

const createProduct = (id, name, price, qt, pTotal) => {
  const productTemplate = `
        <div class="product" id="">
            <div class="product-img">
              <img src="${createImgPath(id)}" />
            </div>
            <div class="product-info">
              <p class="product-name">${name}</p>
              <p class="product-price">$${price}</p>
            </div>

            <p class="product-quantity">x${qt}</p>
            <p class="product-total">$${pTotal}</p>
        </div>
    `;

  return productTemplate;
};

const clear = () => {
  cart.products = {};
  cart.total = 0;
  cart.totalPerProduct = [];
  productsContainer.innerHTML = "";
  sessionStorage.clear();
  cart.updateCart();
};



//Shopping cart
class Cart {
  constructor() {
    this.total = 0;
    this.products = {};
    this.totalPerProduct = [];
  }

  calcTotalPerProduct() {
    this.totalPerProduct = [];
    Object.keys(this.products).forEach((key) => {
      const tot = findProduct(key).price * this.products[key];
      this.totalPerProduct.push(tot);
    });
  }

  calcTotal() {
    let total = this.totalPerProduct.reduce((a, acc) => a + acc, 0);
    this.total = total;

    cartTotal.innerText = `$${this.total}`;
  }

  loadProducts() {
    productsContainer.innerHTML = "";

    Object.keys(this.products).forEach((key, index) => {
      const productData = findProduct(key);
      productsContainer.innerHTML += createProduct(
        key,
        productData.name,
        productData.price,
        this.products[key],
        this.totalPerProduct[index]
      );
    });
  }

  toLocalStorageProducts(){
    sessionStorage.setItem("cartProducts", JSON.stringify(this.products));
  }

  

  updateCart() {
    this.calcTotalPerProduct();
    this.loadProducts();
    this.toLocalStorageProducts();
    this.calcTotal();
  }
}
//Creates a new cart
const cart = new Cart();

//Check if there is a previuous session stored
const localStorageExists = () => {
    if(sessionStorage.getItem("cartProducts")){
      cart.products = JSON.parse(sessionStorage.getItem("cartProducts"));
      console.log(cart.products);
      cart.updateCart();
    }else{

    }
  };


localStorageExists();



//Close cart window
closeBtn.addEventListener("click", () => {
  cartWindow.classList.toggle("hidden");
});
//Open cart window
viewCartBtn.addEventListener("click", () => {
  cartWindow.classList.toggle("hidden");
});
//Add to cart
addToCartBtns.forEach((btn) =>
  btn.addEventListener("click", (e) => addToCart(e))
);
//CheckOut
checkoutBtn.addEventListener("click", () => {
  if (cart.total === 0) {
    //Alert when there are no items
    setAlertMessage("Cart empty. Muscles hungry. Add a session 🏋️‍♂️");
    alertWindow.classList.toggle("hidden");
  } else {
    //Alert when cart is cleared
    setAlertMessage("You just made a great choice — thanks for your order!");
    alertWindow.classList.toggle("hidden");
    clear();
  }
});

//Clear
clearBtn.addEventListener("click", () => {
  if (cart.total === 0) {
    //Alert when there are no items
    setAlertMessage("Cart empty. Muscles hungry. Add a session 🏋️‍♂️");
    alertWindow.classList.toggle("hidden");
  } else {
    //Alert when cart is cleared
    setAlertMessage("🧼 Poof. Like it never happened --Cart Cleared");
    alertWindow.classList.toggle("hidden");

    clear();
  }
});

