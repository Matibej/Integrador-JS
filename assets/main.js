const productsContainer = document.querySelector(".products-container")
const showMore = document.querySelector(".show-more")
const categoriesContainer = document.querySelector(".filter-categories")
const categories = document.querySelectorAll(".category")
const searchBar = document.querySelector("#search-bar")
const searchButton = document.querySelector(".search")



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
                                    data.name="${name}"
                                    data.brandname="${brandname}"
                                    data.category="${category}"
                                    data.price="${price}"
                                    data.img="${productImage}"

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

const ShowError = (message) =>{
    const error = document.querySelector("small")
    error.textContent = message;
}

const ShowSuccess = () =>{
    const error = document.querySelector("small")
    error.textContent = "";
    
}

const init = () => {

RenderProductsList(limit, productList)

showMore.addEventListener("click", () => {
    limit += 5
    RenderProductsList(limit, productList);
    HideShowMore();
    ShowMoreProducts();
})

categoriesContainer.addEventListener("click", ChangeActive)

searchButton.addEventListener("click",SearchProduct)
};

init();



