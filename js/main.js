const mobileNavBtn = document.getElementById("mobileNavBtn")
const mobileNavContainer = document.getElementById("mobileNavContainer")

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