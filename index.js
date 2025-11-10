
const navBtn = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");
let isMenuActive = false;

function showMenu() {
    if (!isMenuActive) {
        menu.classList.add("open-nav");
        isMenuActive = true;
    } else {
        menu.classList.remove("open-nav");
        isMenuActive = false;
    }
}

const heroSlides = document.querySelectorAll(".hero-slide");
const buttons = document.querySelectorAll(".slider-button");
let slideIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    navBtn.addEventListener("click", showMenu)

    buttons.forEach(btn => {
        btn.addEventListener("click", changeHeroSlide);
    });

    if (heroSlides.length) {
        heroSlides[0].classList.add("displaySlide");
    }
});

async function loadHeroSlidesInfo() {
    try {
    const response = await fetch("json/heroSlidesInfo.json");
        return await response.json();
    } catch (error) {
        console.error("Error loading hero slides info:", error);
    }
}

const heroSlidesInfo = await loadHeroSlidesInfo();
const heroDescription = document.querySelectorAll(".hero-description");
const heroMaterial = document.querySelector(".hero-material");
const heroSquare = document.querySelector(".hero-square");
const heroPrice = document.querySelector(".hero-price");

function changeHeroSlide() {
    slideIndex++;
    showHeroSlide(slideIndex);
    showHeroInfo(slideIndex);
}

function showHeroSlide(index) {
    if (index >= heroSlides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = heroSlides.length - 1;
    }
    heroSlides.forEach(s => s.classList.remove("displaySlide"));
    heroSlides[slideIndex].classList.add("displaySlide");
}

function showHeroInfo(index) {
    heroDescription.forEach(el => el.textContent = heroSlidesInfo[index].description);
    heroMaterial.textContent = heroSlidesInfo[index].material;
    heroSquare.textContent = heroSlidesInfo[index].square;
    heroPrice.textContent = heroSlidesInfo[index].price;
}

async function loadBestsellers() {
    try {
        const response = await fetch("json/bestsellers.json");
        const bestsellers = await response.json();
        const container = document.querySelector(".bestsellers-container");

        bestsellers.forEach(bestseller => {
            const card = document.createElement("div");
            card.classList.add("bestseller-card");
            card.innerHTML = `
                <img src="${bestseller.image}">
                <div class="bestseller-info">
                    <h3>${bestseller.title}</h3>
                    <p class="price">${bestseller.price}</p>
                    <div class="details">
                        <span><i class="fa-solid fa-ruler-combined"></i>${bestseller.square}</span>
                        <span><i class="fa-solid fa-bed"></i>${bestseller.bedrooms}</span>
                        <span><i class="fa-solid fa-bath"></i>${bestseller.bathrooms}</span>
                    </div>
                    <a  target="_blank" href="${bestseller.image}"><button class="arrow-btn"><i class="fa-solid fa-arrow-right fa-rotate-by" style="--fa-rotate-angle: 315deg;"></i></button></a>
                </div>          
            `;
            container.appendChild(card);
        });

        document.dispatchEvent(new Event("bestsellersLoaded"));

    } catch (error) {
        console.error("Error loading bestsellers data:", error);
    }
}

loadBestsellers();

document.addEventListener("bestsellersLoaded", () => {
    const bestsellerContainer = document.querySelector(".bestsellers-container");
    const btnPrev = document.querySelector(".scroll-btn.prev");
    const btnNext = document.querySelector(".scroll-btn.next");

    const scrollAmount = 367;
    let currentScroll = 0;
    let lastScroll = scrollAmount;

    btnNext.addEventListener("click", () => {

        const maxScroll = bestsellerContainer.scrollWidth - bestsellerContainer.clientWidth;
        currentScroll = Math.min(currentScroll + scrollAmount, maxScroll);

        bestsellerContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    btnPrev.addEventListener("click", () => {

        let leftScroll = currentScroll % scrollAmount;
        currentScroll = leftScroll ? currentScroll - leftScroll : currentScroll - scrollAmount;

        bestsellerContainer.scrollTo({ left: currentScroll, behavior: "smooth" });
    });
});

async function loadArticles() {
    try {
        const response = await fetch("json/articles.json");
        const articles = await response.json();
        const container = document.querySelector(".articles-container");

        articles.forEach(article => {
            const card = document.createElement("div");
            card.dataset.category = article.category;
            card.classList.add("article-card");
            card.innerHTML = `
                <img src="${article.image}">
                <div class="article-info">
                    <div class="articles-text">
                        <h3>${article.title}</h3>
                        <p>${article.text}</p>
                    </div>
                    <a href="${article.image}" target="_blank"><button class="arrow-btn">Read
                        <i class="fa-solid fa-arrow-right fa-rotate-by" style="--fa-rotate-angle: 315deg;"></i>
                    </button></a>
                </div>
            `;
            container.appendChild(card);
        });

        document.dispatchEvent(new Event("articlesLoaded"));

    } catch (error) {
        console.error("Error loading articles data:", error);
    }
}

loadArticles();

const articlesContainer = document.querySelector(".articles-container");
const articlesBtnPrev = document.querySelector(".articles-scroll-btn.prev");
const articlesBtnNext = document.querySelector(".articles-scroll-btn.next");

document.addEventListener("articlesLoaded", () => {
    // Scroll
    const articlesScrollAmount = 364;
    let articlesScroll = 0;

    articlesBtnNext.addEventListener("click", () => {

        const maxScroll = articlesContainer.scrollWidth - articlesContainer.clientWidth;
        articlesScroll = Math.min(articlesScroll + articlesScrollAmount, maxScroll);

        articlesContainer.scrollBy({ left: articlesScrollAmount, behavior: "smooth" });
    });

    articlesBtnPrev.addEventListener("click", () => {

        let leftScroll = articlesScroll % articlesScrollAmount;
        articlesScroll = leftScroll ? articlesScroll - leftScroll : articlesScroll - articlesScrollAmount;

        articlesContainer.scrollTo({ left: articlesScroll, behavior: "smooth" });
    });

    // Filter
    const filterButtons = document.querySelectorAll(".filter-btn");
    const articleCards = document.querySelectorAll(".article-card");
    
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.dataset.category;

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Filter articles
            articleCards.forEach(card => {
                if (category === "all" || card.dataset.category === category) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});

async function loadCustomers() {
    try {
        const response = await fetch("json/customers.json");
        const customers = await response.json();
        const container = document.querySelector(".customers-container");

        customers.forEach(cust => {
            const card = document.createElement("div");
            card.classList.add("customer-card");
            card.innerHTML = `
                <div class="customer-name">
                    <img src="${cust.image}" alt="${cust.name}">
                    <div class="customer-info">
                        <h3>${cust.name}</h3>
                        <div class="project">Bought the ${cust.project} project</div>
                    </div>
                </div>
                <p>${cust.text}</p>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading customer data:", error);
    }
}

loadCustomers();

const customersContainer = document.querySelector(".customers-container");
document.querySelectorAll(".btnNextCustomers").forEach(el => el.addEventListener("click", () => {
    customersContainer.scrollBy({ left: customersContainer.offsetWidth * 0.9, behavior: "smooth" });
})); 

document.querySelectorAll(".btnPrevCustomers").forEach(el => el.addEventListener("click", () => {
    customersContainer.scrollBy({ left: -customersContainer.offsetWidth * 0.9, behavior: "smooth" });
}));

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        item.classList.toggle('active');
    });
});