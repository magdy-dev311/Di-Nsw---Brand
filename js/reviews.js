let reviews = [
    {
        name: "زينة عبده",
        desc: "عميل موثق",
        rev: "الاوردر تحفة بجد والهديتين اتحف من التحفة",
        rate: 5,
    },
    {
        name: "دودي محمد",
        desc: "عميل موثق",
        rev: "التيشرت تحفة بجد تسلم ايدك والهدية عجبته جدا",
        rate: 5,
    },
    {
        name: "محمد احمد",
        desc: "عميل موثق",
        rev: "الاوردر وصل أخيرا ، جميل والخامة روعة ومريحة في اللبس",
        rate: 5,
    },
    {
        name: "سالم الراوي",
        desc: "عميل موثق",
        rev: "اي الجمدان ده يعم ، التيشرت جامد والكواليتي جمدان",
        rate: 5,
    },
    {
        name: "محود سعيد",
        desc: "عميل موثق",
        rev: "السلام عليكم ورحمه الله وبركاته الاوردر وصل حاجه تحفه ❤ ، يسلمو كتير على الهدايا ❤",
        rate: 5,
    },
];

let reviewsContainer = document.getElementById("reviews")

function renderReviews () {
    reviews.forEach(r => {
        let stars = ``
        for (let i = 0 ; i < r.rate ; i++) {
            stars+=`
            <i class="fa-solid fa-star"></i>
            `
        }
        reviewsContainer.innerHTML+=`
            <div class="inline-block px-3 flex-shrink-0 cursor-pointer ">
                <div
                    class="bg-white flex flex-col gap-6 border-2 border-gray-200 rounded-2xl px-5 py-6 duration-300 hover:border-red-200">
                    <div class="flex gap-1 text-yellow-400 text-xl">
                        ${stars}
                    </div>
                    <p class=" text-gray-600 leading-8">
                        ${r.rev}
                    </p>
                    <div class="flex items-center gap-3">
                        <div
                            class="w-12 h-12 rounded-full bg-blue-100 flex justify-center items-center text-blue-600 font-bold text-lg">
                            ${r.name[0]}
                        </div>
                        <div>
                            <h4 class="font-bold text-lg">
                                ${r.name}
                            </h4>
                            <span class="text-gray-400 text-sm">
                                ${r.desc}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
}

renderReviews()
renderReviews()