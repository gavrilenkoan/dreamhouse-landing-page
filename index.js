
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