const CartContainer = document.querySelector(".cart-container")


const saveLocalStorage = (cartList) => {
	localStorage.setItem("cart", JSON.stringify(cartList));
};

let cart = JSON.parse(localStorage.getItem("cart")) || [];


const RenderCartItems = (cart) => {
    let CartItem = cart.map((product) => {
        return `
        
        <div class="cart-item">
					<img
						src="${product.img}"
						alt="${product.name}"
					/>
					<div class="item-info">
						<h3>
                        ${product.name}
						</h3>
						<div class="info-container">
							<div class="more-info">
								<span>Marca: ${product.brandname}</span>
								<span>Categoria: ${product.category}</span>
							</div>
							<div class="quantity-info">
								<span class="price-info">$${product.price}</span>
								<div class="quantity-handler">
									<span class="add-num">-</span>
									<span class="number">${product.count}</span>
									<span class="reduce-num">+</span>
								</div>
							</div>
						</div>
						<button class="delete"
                        data-id=${product.id}
                        >x</button>
					</div>
				</div>

        `
    }
    )
    CartContainer.innerHTML = CartItem.join('')
}


const DeleteCartItems = (e) => {
    if (!e.target.classList.contains("delete")) {
        return
    }
    console.log(e.target.dataset);
    cart = cart.filter((product) => {
        return product.id !== e.target.dataset.id;
        
    })
    saveLocalStorage(cart)
    RenderCartItems(cart)
}


const init = () => { 

RenderCartItems(cart);
CartContainer.addEventListener("click", DeleteCartItems



)



} 

init();