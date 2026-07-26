let reviews = [
    {
        name: "مجدي زياد",
        desc: "عميل موثق",
        rev: "الخامة ممتازة جدًا واللبس مريح، أكيد هطلب تاني.",
        rate: 5,
    },
    {
        name: "محمد أحمد",
        desc: "عميل موثق",
        rev: "المقاس طلع مظبوط واللون مطابق للصور، تجربة ممتازة.",
        rate: 5,
    },
    {
        name: "أحمد علي",
        desc: "عميل موثق",
        rev: "التيشيرت خامته ناعمة جدًا والتقفيل نضيف.",
        rate: 4,
    },
    {
        name: "سيف خالد",
        desc: "عميل موثق",
        rev: "أول مرة أشتري من Di Nsw ومكنتش آخر مرة بصراحة.",
        rate: 5,
    },
    {
        name: "عمر حسن",
        desc: "عميل موثق",
        rev: "الشحن وصل بسرعة والتغليف كان ممتاز.",
        rate: 5,
    },
    {
        name: "يوسف سامح",
        desc: "عميل موثق",
        rev: "ستايل مختلف عن الموجود في السوق وسعره مناسب جدًا.",
        rate: 4,
    },
    {
        name: "عبدالله محمد",
        desc: "عميل موثق",
        rev: "اللبس مريح جدًا حتى بعد الغسيل محافظ على شكله.",
        rate: 5,
    },
    {
        name: "محمود إيهاب",
        desc: "عميل موثق",
        rev: "الجودة فوق المتوقع، وأنصح أي حد يجرب البراند.",
        rate: 5,
    },
    {
        name: "كريم أشرف",
        desc: "عميل موثق",
        rev: "ألوان حلوة جدًا والستايل مناسب للخروجات والجامعة.",
        rate: 4,
    },
    {
        name: "إبراهيم أحمد",
        desc: "عميل موثق",
        rev: "تعامل محترم جدًا وخدمة العملاء كانت سريعة.",
        rate: 5,
    },
    {
        name: "مصطفى خالد",
        desc: "عميل موثق",
        rev: "الخامة مريحة والمقاسات دقيقة جدًا.",
        rate: 5,
    },
    {
        name: "علي محمود",
        desc: "عميل موثق",
        rev: "براند يستحق الدعم، والتصميمات بسيطة وشيك.",
        rate: 4,
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