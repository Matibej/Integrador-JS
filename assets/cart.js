const CartContainer = document.querySelector(".cart-container")
const ProductsToBuy = document.querySelector(".product-list")
const Total = document.querySelector(".total-number")
const DeleteAll = document.querySelector(".delete-all")

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
									<button class="reduce-num"
                                    data-id=${product.id}>-</button>
									<span class="number">${product.count}</span>
									<button class="add-num"
                                    data-id=${product.id}>+</button>
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
    cart = cart.filter((product) => {
        return product.id !== e.target.dataset.id;
        
    })
    saveLocalStorage(cart)
    RenderCartItems(cart)
    RenderTotalProducts(cart)
}

const QuanitityHandler = (e) => {
    const AddNumber = e.target.classList.contains("add-num")
    const ReduceNumber = e.target.classList.contains("reduce-num")
    if (AddNumber || ReduceNumber) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id == e.target.dataset.id) {
                if ( cart[i].count < 10 && AddNumber ) {
                    cart[i].count += 1  
                    
                }
                else if (cart[i].count > 1 && ReduceNumber ) {
                    cart[i].count -= 1
                    
                }
            }
            
            saveLocalStorage(cart)
            RenderCartItems(cart)
            RenderTotalProducts(cart)
            
        }
    }
    
}

const RenderTotalProducts = (cart) => {
    let ProductItem = cart.map((product)=>{
        let ProductPrice = product.price*product.count
        return `
        <li class="buy-item">
								<h4>${product.name}</h4>
								<div class="items-price">
									<p>Cantidad: ${product.count}</p>
									<span>$${ProductPrice}</span>
								</div>
							</li>
       
        `
        
    })
    ProductsToBuy.innerHTML = ProductItem.join('')
    UpdatetotalPrice(cart)
}



const UpdatetotalPrice = (cart) => {
    let arr1 = []
    let total1 = 0
    cart.forEach((product) => {
        ProductPrice = product.price*product.count
        arr1.push(ProductPrice)
    });
    const total = arr1.reduce((acc,cur) => acc + cur, total1 )
    Total.innerHTML = `$${total}`
}

const DeleteAllProducts = (e) => {
    if (!e.target.classList.contains("delete-all")) {
        return
    }
    localStorage.clear("cart")
    CartContainer.innerHTML = ''
    ProductsToBuy.innerHTML = ''
    
}

const init = () => { 

RenderCartItems(cart);
CartContainer.addEventListener("click", (e) => {
    QuanitityHandler(e),
    DeleteCartItems(e)
});
RenderTotalProducts(cart);
DeleteAll.addEventListener("click", DeleteAllProducts)

} 

init();