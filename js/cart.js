let cart = JSON.parse(localStorage.getItem("cart")) || []
const cartCounter = document.getElementById("cartCounter")
cartCounter.textContent = cart.reduce((container, current) => { return container + current.quantity }, 0)

const productsContainer = document.getElementById("productsContainer")
const container = document.getElementById("container")

const productsCount = document.getElementById("productsCount")
const shippingCoast = document.getElementById("shippingCoast")
const subTotal = document.getElementById("subTotal")
const totalSpan = document.getElementById("total")
const orderNow = document.getElementById("orderNow")

let orderCount = 30

const popUpContainer = document.getElementById("popUpContainer")
const closePopUpBtn = document.getElementById("close-pop-up")
const nameInput = document.getElementById("nameInput")
const selectGov = document.getElementById("selectGov")
const centerInput = document.getElementById("centerInput")
const addressInput = document.getElementById("addressInput")
const totalInput = document.getElementById("totalInput")


function renderProducts() {
    let structure = ``
    if (!cart.length) {
        container.innerHTML = `
            <div class="flex flex-col items-center gap-6 py-20 text-center">
                <i class="fa-solid fa-bag-shopping text-7xl text-gray-300"></i>
                <p class="text-2xl font-bold text-gray-500">السلة فاضية دلوقتي</p>
                <a href="index.html#latest-products"
                    class="bg-red-600 text-xl font-bold text-white px-5 py-3 rounded-lg hover:bg-red-700 duration-300">تسوق
                    الآن</a>
            </div>
        `
        return
    } else {
        let total = 0
        cart.forEach(p => {
            structure += `
                <div
                    class="border-2 border-gray-200 rounded-xl shadow-md hover:shadow-xl duration-300 p-4 grid grid-cols-1 md:grid-cols-3 items-center gap-6">
                    <div class="border border-gray-200 rounded-xl overflow-hidden aspect-square"><img
                            src="${p.img}" class="w-full h-full object-top object-cover" alt="${p.name}"></div>
                    <div class="flex flex-col gap-5 items-center sm:items-start">
                        <h2 class="text-2xl font-bold">
                            ${p.name}
                        </h2>
                        <div class="flex flex-wrap gap-2">
                            <span class="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
                                اللون: ${p.color}
                            </span>
                            <span class="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
                                المقاس: ${p.size}
                            </span>
                            <span class="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                                ${p.material}
                            </span>
                        </div>
                        <span class="text-3xl font-bold text-green-600">
                            EGP ${p.price}
                        </span>
                    </div>
                    <div class="flex flex-col sm:flex-row gap-5 sm:justify-start lg:justify-center justify-center items-center">
                        <div class="flex items-center border border-gray-200 rounded-full overflow-hidden">
                            <button
                                onclick="increaseQuantity(${p.id})"
                                class="w-11 h-11 flex justify-center items-center hover:bg-red-600 hover:text-white duration-300 cursor-pointer">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                            <span class="w-12 text-center text-xl font-bold">${p.quantity}</span>
                            <button
                                onclick = "decreaseQuantity(${p.id})"
                                class="w-11 h-11 flex justify-center items-center hover:bg-red-600 hover:text-white duration-300 cursor-pointer">
                                <i class="fa-solid fa-minus"></i>
                            </button>
                        </div>
                        <button
                            onclick="deleteProduct(${p.id})"
                            class="w-10 h-10 rounded-xl bg-red-50 text-gray-600 hover:bg-red-600 cursor-pointer hover:text-white duration-300"><i
                                class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>
            `
            total += p.price * p.quantity
        })
        productsContainer.innerHTML = structure
        productsCount.textContent = cart.reduce((container, current) => { return container + current.quantity }, 0)
        subTotal.textContent = total
        shippingCoast.textContent = orderCount
        totalSpan.textContent = total + orderCount
    }
}

renderProducts()

function increaseQuantity(id) {
    let product = cart.find(p => p.id === id)
    if (!product) return
    product.quantity++
    localStorage.setItem("cart", JSON.stringify(cart))
    renderProducts()
    cartCounter.textContent = cart.reduce((container, current) => { return container + current.quantity }, 0)
}

function decreaseQuantity(id) {
    let product = cart.find(p => p.id === id)
    if (!product) return
    if (product.quantity > 1) {
        product.quantity--
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    renderProducts()
    cartCounter.textContent = cart.reduce((container, current) => { return container + current.quantity }, 0)
}

orderNow.addEventListener("click", () => {
    popUpContainer.classList.remove("hidden")
    popUpContainer.classList.add("flex")
    totalInput.value = +totalSpan.textContent
})

closePopUpBtn.addEventListener("click", () => {
    popUpContainer.classList.remove("flex")
    popUpContainer.classList.add("hidden")
})

document.forms[0].addEventListener("submit", function (e) {
    e.preventDefault()

    if (
        !nameInput.value.trim() ||
        !centerInput.value.trim() ||
        !addressInput.value.trim()
    ) {
        alert("من فضلك ادخل كل الحقول")
        return
    }

    let products = ``
    for (let i = 0; i < cart.length; i++) {
        products += `
*اسم المنتج*: ${cart[i].name}

*لون المنتج*: ${cart[i].color}

*مقاس المنتج*: ${cart[i].size}

*سعر المنتج*: ${cart[i].price}

*الكمية*: ${cart[i].quantity}

*سعر المنتج بعد اضافة الكمية:*: ${(cart[i].price * cart[i].quantity)}

------------------------------

`
    }

    let msg = encodeURIComponent(`*طلب جديد*
        *الاسم*: ${nameInput.value.trim()}

        *المحافظة*: ${selectGov.value}

        *المركز*: ${centerInput.value.trim()}

        *العنوان بالتفصيل*: ${addressInput.value.trim()}

        *المنتجات*:

------------------------------

        ${products}

        الاجمالي: ${totalInput.value}
`)

    window.open(`https://wa.me/201111252897?text=${msg}`)

    document.forms[0].reset();

    popUpContainer.classList.add("hidden");
    popUpContainer.classList.remove("flex");

    cart = [];
    localStorage.removeItem("cart");

    renderProducts();

    cartCounter.textContent = 0;

})

function deleteProduct(id) {
    if (!confirm("هل انت متاكد من إزالة هذا العنصر")) return
    cart = cart.filter(p => p.id !== id)
    localStorage.setItem("cart", JSON.stringify(cart))
    renderProducts()
    cartCounter.textContent = cart.reduce((container, current) => { return container + current.quantity }, 0)
}