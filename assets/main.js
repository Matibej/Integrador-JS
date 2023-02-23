const productsContainer = document.querySelector(".products-container")
const showMore = document.querySelector(".show-more")
const categoriesContainer = document.querySelector(".filter-categories")
const categories = document.querySelectorAll(".category")
const searchBar = document.querySelector("#search-bar")
const searchButton = document.querySelector(".search")
const navbar = document.querySelector(".nav-list")
const navbtn = document.querySelector(".menu-label")
const addBtn = document.query


// cart

const saveLocalStorage = (cartList) => {
	localStorage.setItem("cart", JSON.stringify(cartList));
};

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const CartAdd = (e) =>{
    if (!e.target.classList.contains("add")) {
        return
    }

    const { id, name, price, brandname, category, img } = e.target.dataset;

    let product = productData(id, name, price, brandname, category, img );
    product.count = 1;
    CheckQuantity(product);
    saveLocalStorage(cart);
};


const productData = (id, name, price, brandname, category, img ) => {
 return { id, name, price, brandname, category, img }
};

const CheckQuantity = (product) => {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == product.id) {
            cart[i].count += 1;
            return
        }
        
    }
    cart.push(product)
}



// Toggle menu

const toggleMenu = () => { 
    navbar.classList.toggle("open-nav")
}


// Render products

RenderItem = (item) => {
    const {id, name, price, brandname, category, productImage} = item;
    return `
    <div class="product-items">
							<img src="${productImage}" alt="${name}"></img>
							<div class="product-info">
								<p class="name">${name}</p>
								<div class="product-price">
									<span class="price">$${price}</span>
									<button class="add"

                                    data-id="${id}"
                                    data-name="${name}"
                                    data-brandname="${brandname}"
                                    data-category="${category}"
                                    data-price="${price}"
                                    data-img="${productImage}"

                                    >Comprar</button>
								</div>
							</div>
						</div>
    `;
}

let limit = 5
let productList = [...ProductItems]



RenderProductsList = (limit, productList) => {
    productsContainer.innerHTML = ""
    for (let i = 0; i < productList.length && i < limit; i ++) {
         product = productList[i]
        productsContainer.innerHTML += RenderItem(product)

    }
};

const HideShowMore = () => {
    if (limit >= ProductItems.length) {
        showMore.classList.add("hide")
    }
}

const CheckHide = () => {
    if (showMore.classList.contains("hide")) {
        limit = 5
        showMore.classList.remove("hide");
        return 
    }
}


// Search bar


const SearchProduct = () => {
    
    if (searchBar.value == "") {
        CheckHide();
        RenderProductsList(limit, productList);
        ShowError("Este campo está vacío.");
    } 
    else{RenderSearchProduct()
        showMore.classList.add("hide");}
}


const RenderSearchProduct = () => {
    let search = searchBar.value.toLowerCase().trim();
    let products = [...ProductItems]
    let result = []

    products.forEach((product) => {
        if  (product.name.toLowerCase().includes(search)){
            result.push(product)
            } 
            
    } ) 
    
    RenderProductsList(result.length, result);
    ShowSuccess();
    if (result == ""){ShowError("No se encontró nungún producto");}
};

// category list

const ChangeBtn = () =>{
    const selectedBtn = e.target.dataset.category;
    const categoriesList = [...categories];

    categoriesList.forEach((Btn) => {
        if (Btn.dataset.category !== selectedBtn) {
            Btn.classList.remove("category-active")
            return;
        }
        Btn.classList.add("category-active")
        
    } )
    
}

const ChangeCategory = (e) => {
    let RenderCategory = []
    let products = [...ProductItems]

    products.forEach((product) => {
        if (product.category == e.target.dataset.category) {
            RenderCategory.push(product)
        }
    })
    RenderProductsList(RenderCategory.length, RenderCategory);
    
} 


const ChangeActive = (e) => {
    if (!e.target.classList.contains("category")) {
        return
    } else { ChangeBtn }

    if (!e.target.dataset.category) {
        CheckHide();
        RenderProductsList(limit, productList);
        ShowSuccess();
        
    } else { ChangeCategory(e);
        showMore.classList.add("hide");
        ShowSuccess();
    }
}

// Error and Success

const ShowError = (message) =>{
    const error = document.querySelector("small")
    error.textContent = message;
}

const ShowSuccess = () =>{
    const error = document.querySelector("small")
    error.textContent = "";
    
}


// Init

const init = () => {

RenderProductsList(limit, productList)

showMore.addEventListener("click", () => {
    limit += 5
    RenderProductsList(limit, productList);
    HideShowMore();
})

categoriesContainer.addEventListener("click", ChangeActive)

searchButton.addEventListener("click",SearchProduct)

navbtn.addEventListener("click", toggleMenu)

productsContainer.addEventListener("click", CartAdd)

};

init();



