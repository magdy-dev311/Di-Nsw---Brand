import products from './products.js';

let cart = JSON.parse(localStorage.getItem("cart")) || []
const cartCounter = document.getElementById("cartCounter")
cartCounter.textContent = cart.length


const bestSellersContainer = document.getElementById("best-sellers-container")
const specialOffersContainer = document.getElementById("special-offers-container")

const closePoPupBtn = document.getElementById("close-pop-up")

let bestSeller = products.filter(p => p.bestSeller)
let discountedProducts = products.filter(p => p.hasDiscount)

const mobileNavBtn = document.getElementById("mobileNavBtn")
const mobileNavContainer = document.getElementById("mobileNavContainer")
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

let selectedColor;

mobileNavBtn.addEventListener("click", function () {
    if (mobileNavContainer.classList.contains("hidden")) {
        mobileNavContainer.classList.remove("hidden")
        mobileNavContainer.classList.add("flex")
        this.innerHTML = `<i class="fa-solid fa-xmark text-red-600"></i>`
    } else {
        mobileNavContainer.classList.remove("flex")
        mobileNavContainer.classList.add("hidden")
        this.innerHTML = `<i class="fa-solid fa-bars"></i>`
    }
})

window.onscroll = () => {
    if (scrollY > 60) {
        nav.classList.remove("bg-black")
        nav.classList.add("bg-white/10", "backdrop-blur-xl", "shadow-xl", "border-b", "border-white/20",)
    } else {
        nav.classList.remove("bg-white/10", "backdrop-blur-xl", "shadow-xl", "border-b", "border-white/20",)
        nav.classList.add("bg-black")
    }
}

function renderBestSellerProducts() {
    let theStructure = ``
    bestSeller.forEach(p => {
        theStructure += `
            <div class="mx-2 flex flex-col">
                <div class="aspect-square overflow-hidden rounded-xl relative group">
                    <img src="${p.img}" alt="${p.name}" class="hover:scale-110 cursor-pointer duration-300"
                        alt="">
                    <button
                        data-id="${p.id}"
                        class="add-to-cart hidden lg:flex justify-center items-center absolute bottom-3 right-3 left-3 text-2xl font-bold py-1 bg-red-600 text-white rounded-lg cursor-pointer opacity-0 group-hover:opacity-100 hover:bg-red-700 duration-300">أضف إلى السلة</button>
                </div>
                <div class="mt-2 flex flex-col gap-3">
                    <div class="flex flex-col gap-2 items-center px-3">
                        <h5 class="text-2xl font-bold">${p.name}</h5>
                        <span class="text-2xl text-green-600 font-bold">EGP ${p.price}</span>
                    </div>
                    <button
                        data-id="${p.id}"
                        class="add-to-cart flex lg:hidden justify-center items-center text-2xl font-bold py-1 bg-red-600 text-white rounded-lg cursor-pointer hover:bg-red-700 duration-300 w-full">أضف إلى السلة</button>
                </div>
            </div>
        `
    })
    bestSellersContainer.innerHTML = theStructure
}

renderBestSellerProducts()

function renderSpecialOffersProducts () {
    let theStructure = ``
    discountedProducts.forEach(p => {
        theStructure+=`
            <div class="mx-2 flex flex-col ">
                <div class="aspect-square overflow-hidden rounded-xl relative group">
                    <img src="${p.img}" alt="${p.name}" class="hover:scale-110 cursor-pointer duration-300"
                        alt="">
                    <button
                        data-id="${p.id}"
                        class="add-to-cart hidden lg:flex justify-center items-center absolute bottom-3 right-3 left-3 text-2xl font-bold py-1 bg-red-600 text-white rounded-lg cursor-pointer opacity-0 group-hover:opacity-100 hover:bg-red-700 duration-300">أضف إلى السلة</button>
                    <span class="absolute top-2 left-3 text-2xl font-semibold bg-white/20 backdrop-blur-2xl rounded-xl text-red-600 shadow-2xl border-[2px] px-2 border-white/10">${p.discount}%-</span>
                </div>
                <div class="mt-4 flex flex-col gap-3">
                    <div class="flex flex-col gap-4 items-center px-3">
                        <h5 class="text-2xl font-bold">تيشرت اوفر سايز اسود</h5>
                        <div class="flex font-bold text-2xl self-stretch justify-between items-center">
                            <span class=" text-green-600 ">EGP ${(p.price - (p.price * p.discount / 100)).toFixed(2)}</span>
                            <span class=" text-red-600 line-through">EGP ${p.price}</span>
                        </div>
                    </div>
                    <button
                        data-id="${p.id}"
                        class="add-to-cart flex lg:hidden justify-center items-center text-2xl font-bold py-1 bg-red-600 text-white rounded-lg cursor-pointer hover:bg-red-700 duration-300 w-full">أضف إلى السلة</button>
                </div>
            </div>
        `
    })
    specialOffersContainer.innerHTML=theStructure
}

renderSpecialOffersProducts()

function addToCart (id) {
    let product = products.find(p=>p.id===id)
    if (!product)return
    popUpColors.innerHTML = ""
    popUpSizes.innerHTML = ""
    popUpImg.src = product.img
    popUpImg.alt = product.name
    popUpTitle.textContent = product.name
    popUpDesc.textContent = product.desc
    popUpPrice.textContent = product.price
    popUpMaterial.textContent = product.material
    for (let i = 0 ; i < product.colors.length ; i++ ) {
        popUpColors.innerHTML+=`
            <label
                class="border-2 border-gray-200 rounded-xl p-3 cursor-pointer flex justify-between items-center transition-all duration-300 has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50 has-[:checked]:shadow-lg">
                <input type="radio" name="color" value="${product.colors[i].name}" class="hidden">
                <span class="font-semibold">${product.colors[i].name}</span>
                <span class="w-7 h-7 ${product.colors[i].name === "أبيض" ? "border-2 border-gray-300" : ""} rounded-full bg-[${product.colors[i].hex}]"></span>
            </label>
        `
    }
    for (let i = 0 ; i < product.sizes.length ; i++) {
        popUpSizes.innerHTML += `
            <label
                class="border-2 border-gray-200 rounded-xl p-3 cursor-pointer flex justify-center text-l items-center transition-all duration-300 has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50 has-[:checked]:shadow-lg">
                <input type="radio" name="size" value="${product.sizes[i]}" class="hidden" checked>
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

addToCartBtn.addEventListener("click", ()=>{
    let newProduct = {
        img: popUpImg.src,
        id: Date.now(),
        name: popUpTitle.textContent,
        desc: popUpDesc.textContent,
        material: popUpMaterial.textContent,
        color: document.querySelector("input[name='color']:checked").value,
        size: document.querySelector("input[name='size']:checked").value,
        price: popUpPrice.textContent,
        quantity: 1,
    }
    cart.push(newProduct)
    window.localStorage.setItem("cart", JSON.stringify(cart))
    cartCounter.textContent = cart.length
    popUpContainer.classList.remove("flex")
    popUpContainer.classList.add("hidden")
})







$('.slider').slick({
    rtl: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    responsive: [
        { breakpoint: 1280, settings: { slidesToShow: 3, slidesToScroll: 1 } },
        { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
});

$('#slick-next').on('click', () => $('.slider').slick('slickPrev'));
$('#slick-prev').on('click', () => $('.slider').slick('slickNext'));

$('.offers-slider').slick({
    rtl: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    responsive: [
        { breakpoint: 1280, settings: { slidesToShow: 3, slidesToScroll: 1 } },
        { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
});

$('#slick-offers-next').on('click', () => $('.offers-slider').slick('slickPrev'));
$('#slick-offers-prev').on('click', () => $('.offers-slider').slick('slickNext'));