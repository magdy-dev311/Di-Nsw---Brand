import products from "./products.js";

let cart = JSON.parse(localStorage.getItem("cart")) || []
const cartCounter = document.getElementById("cartCounter")
cartCounter.textContent = cart.reduce((container, current) => { return container + current.quantity }, 0)

const nav = document.getElementById("nav")

const popUpContainer = document.getElementById("pop-up-container")

const popUpTitle = document.getElementById("title")
const popUpDesc = document.getElementById("desc")
const popUpMaterial = document.getElementById("material")
const popUpColors = document.getElementById("colors")
const popUpSizes = document.getElementById("sizes")
const addToCartBtn = document.getElementById("addToCartBtn")
const popUpImg = document.getElementById("popUpImg")
const popUpPrice = document.getElementById("popUpPrice")
const closePoPupBtn = document.getElementById("close-pop-up")


const productsContainer = document.getElementById("productsContainer")
const colorsContainer = document.getElementById("colorsContainer")
const sizesInputsContainer = document.getElementById("sizesInputsContainer")

const rangeFrom = document.getElementById("rangeFrom")
const rangeTo = document.getElementById("rangeTo")

const minRangeInput = document.getElementById("minRangeInput")
const maxRangeInput = document.getElementById("maxRangeInput")

window.onscroll = () => {
    if (scrollY > 60) {
        nav.classList.remove("bg-black")
        nav.classList.add("bg-white/10", "backdrop-blur-xl", "shadow-xl", "border-b", "border-white/20",)
    } else {
        nav.classList.remove("bg-white/10", "backdrop-blur-xl", "shadow-xl", "border-b", "border-white/20",)
        nav.classList.add("bg-black")
    }
}

let pricesSet = Array.from(new Set(products.map(p => p.price)))

minRangeInput.min = Math.min(...pricesSet)
minRangeInput.max = Math.max(...pricesSet)

maxRangeInput.min = Math.min(...pricesSet)
maxRangeInput.max = Math.max(...pricesSet)

minRangeInput.value = Math.min(...pricesSet)
maxRangeInput.value = Math.max(...pricesSet)

let sizesSet = Array.from(new Set(products.flatMap(p => p.sizes)))
let colorsSet = Array.from(
    new Map(
        products
            .flatMap(e => e.colors)
            .map(color => [color.hex, color])
    ).values()
);

function renderColorsInputs() {
    let theStructure = ``
    colorsSet.forEach(c => {
        theStructure += `
            <label for="${c.name}" class="h-10 w-10 cursor-pointer ${c.name === "أبيض" ? "border-2 border-gray-300" : ""} rounded-full bg-[${c.hex}] duration-300 has-[:checked]:border-red-600 has-[:checked]:border-3">
                <input type="checkbox" hidden name="color" id="${c.name}">
            </label>
        `
    })
    colorsContainer.innerHTML = theStructure
}
renderColorsInputs()

function renderSizesInputs() {
    let theStructure = ``
    sizesSet.forEach(s => {
        theStructure += `
            <label class="text-xl text-gray-800 border-2 border-gray-100 px-3 py-1 rounded-md cursor-pointer hover:border-red-600 duration-300 has-[:checked]:bg-red-600 has-[:checked]:text-white" for="${s}">
                <input id="${s}" type="checkbox" name="size" hidden>${s}
            </label>
        `
    })
    sizesInputsContainer.innerHTML = theStructure
}
renderSizesInputs()

function renderRange() {
    rangeFrom.textContent = minRangeInput.value
    rangeTo.textContent = maxRangeInput.value
}

renderRange()

function renderProducts(productsArray = products) {
    let theStructure = ``
    productsArray.forEach(p => {
        theStructure += `
            <div class="flex flex-col">
                <div class="aspect-square overflow-hidden rounded-xl relative group">
                    <img src="${p.img}" alt="${p.name}" class="hover:scale-110 cursor-pointer duration-300" alt="">
                    <span
                        class="${p.hasDiscount ? "" : "hidden"} absolute top-3 left-3 text-2xl font-semibold bg-white/20 backdrop-blur-2xl rounded-xl text-red-600 shadow-2xl border-[2px] px-2 border-white/10">${p.discount}%-</span>
                    <span
                        class="${p.hasBadge ? "" : "hidden"} absolute top-3 right-3 text-2xl font-semibold bg-green-600 rounded-md text-white px-2 ">${p.badge}</span>
                </div>
                <div class="mt-5 flex flex-col gap-5">
                    <div class="flex justify-between items-center px-3">
                        <h5 class="text-xl font-bold">${p.name}</h5>
                        <span class=" text-xl text-green-600 font-bold">EGP ${p.price - p.price * p.discount / 100}</span>
                    </div>
                    <button data-id="${p.id}"
                        class="add-to-cart flex justify-center items-center text-2xl font-bold py-1 bg-red-600 text-white rounded-lg cursor-pointer hover:bg-red-700 duration-300 w-full">أضف
                        إلى السلة</button>
                </div>
            </div>
        `
    })
    productsContainer.innerHTML = theStructure
}

renderProducts()

minRangeInput.addEventListener("input", filterProducts)
maxRangeInput.addEventListener("input", filterProducts)

document.querySelectorAll("input[name='size']").forEach(i => {
    i.addEventListener("input", () => {
        filterProducts()
    })
})

document.querySelectorAll("input[name='color']").forEach(i => {
    i.addEventListener("input", () => {
        filterProducts()
    })
})

function filterProducts() {
    let selectedSizes = Array.from(document.querySelectorAll("input[name='size']:checked")).map(input => input.id)
    let selectedColors = Array.from(document.querySelectorAll("input[name='color']:checked")).map(i => i.id)

    let filteredProducts = products.filter(p => {
        return (
            p.price >= +minRangeInput.value && p.price <= +maxRangeInput.value &&
            (!selectedSizes.length || selectedSizes.some(size => p.sizes.includes(size))) &&
            (!selectedColors.length || selectedColors.some(color => p.colors.some(c => c.name === color)))
        )
    })


    renderRange()
    renderProducts(filteredProducts)
}

const clearFilter = document.getElementById("clearFilter")

clearFilter.addEventListener("click", () => {

    minRangeInput.value = minRangeInput.min
    maxRangeInput.value = maxRangeInput.max

    document.querySelectorAll("input[type='checkbox']")
        .forEach(input => input.checked = false)

    filterProducts()
})

function addToCart(id) {
    let product = products.find(p => p.id === id)
    if (!product) return
    let finalPrice = product.hasDiscount ? product.price - (product.price * product.discount / 100) : product.price
    popUpColors.innerHTML = ""
    popUpSizes.innerHTML = ""
    popUpImg.src = product.img
    popUpImg.alt = product.name
    popUpTitle.textContent = product.name
    popUpDesc.textContent = product.desc
    popUpPrice.textContent = finalPrice
    popUpMaterial.textContent = product.material
    for (let i = 0; i < product.colors.length; i++) {
        popUpColors.innerHTML += `
            <label
                class="border-2 border-gray-200 rounded-xl p-3 cursor-pointer flex justify-between items-center transition-all duration-300 has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50 has-[:checked]:shadow-lg">
                <input type="radio" name="color" value="${product.colors[i].name}" class="hidden" ${i === 0 ? "checked" : ""}>
                <span class="font-semibold">${product.colors[i].name}</span>
                <span class="w-7 h-7 ${product.colors[i].name === "أبيض" ? "border-2 border-gray-300" : ""} rounded-full bg-[${product.colors[i].hex}]"></span>
            </label>
        `
    }
    for (let i = 0; i < product.sizes.length; i++) {
        popUpSizes.innerHTML += `
            <label
                class="border-2 border-gray-200 rounded-xl p-3 cursor-pointer flex justify-center text-l items-center transition-all duration-300 has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50 has-[:checked]:shadow-lg">
                <input type="radio" name="size" value="${product.sizes[i]}" class="hidden" ${i === 0 ? "checked" : ""}>
                <span class="font-semibold text-center">${product.sizes[i]}</span>
            </label>
        `
    }
    popUpContainer.classList.remove("hidden")
    popUpContainer.classList.add("flex")
}

document.addEventListener("click", function (e) {
    const btn = e.target.closest(".add-to-cart")
    if (!btn) return
    addToCart(Number(btn.dataset.id))
})

closePoPupBtn.addEventListener("click", () => {
    popUpContainer.classList.remove("flex")
    popUpContainer.classList.add("hidden")
})

addToCartBtn.addEventListener("click", () => {
    let newProduct = {
        img: popUpImg.src,
        id: Date.now(),
        name: popUpTitle.textContent,
        desc: popUpDesc.textContent,
        material: popUpMaterial.textContent,
        color: document.querySelector("input[name='color']:checked").value,
        size: document.querySelector("input[name='size']:checked").value,
        price: +popUpPrice.textContent,
        quantity: 1,
    }
    cart.push(newProduct)
    window.localStorage.setItem("cart", JSON.stringify(cart))
    cartCounter.textContent = cart.length
    popUpContainer.classList.remove("flex")
    popUpContainer.classList.add("hidden")
})