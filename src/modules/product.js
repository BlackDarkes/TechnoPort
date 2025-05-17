import Helpers from "./helpers";
import ProductUI from "./productUI";

class Product {
    #data;
    #url = new URLSearchParams(document.location.search);
    #id = this.#url.get("id");
    #currentSlide = 0;
    #slideWidth = 300;
    #gap = 20;
    #selectors = {
        productName: "[data-product-name]",
        productImagesSlider: "[data-product-slider-images]",
        productMainImage: "[data-product-main-image]",
        productAbout: "[data-product-about]",
        productFeedback: "[data-prodcut-feedback]",
        productPrice: "[data-product-price]",
        productDescription: "[data-product-description]",
    };
    #selectorsMobile = {
        productMobileSlider: "[data-product-mobile-slider-images]",
        productMobileLeftButton: "[data-product-mobile-left-button]",
        productMobileRightButton: "[data-product-mobile-right-button]",
    };

    constructor() {
        this.helpers = new Helpers();
        this.ui = new ProductUI(this.#selectors, this.#selectorsMobile);
        this.init();
    }

    async init() {
        this.#data = await this.helpers.getData();
        this.getProduct();
        this.switchImages();
        this.addEventListenersToMobileButtons();
    }

    getProduct() {
        const product = this.#data.find((product) => product.id == this.#id);
        const { name, images, mainImage, about, feedback, price, description } = product
        this.ui.getName(name);
        this.ui.getImagesSlider(images);
        this.ui.getMainImage(mainImage);
        this.ui.getAbout(about);
        this.ui.getFeedback(feedback);
        this.ui.getPrice(price);
        this.ui.getDescription(description);
        this.ui.getMobileSlider(images);
    }

    switchImages() {
        const listImages = this.ui.productImagesSliderElement;
        const buttons = listImages.querySelectorAll("button");
        const images = listImages.querySelectorAll("img");

        buttons.forEach((button, index) => {
            button.addEventListener("click", () => {
                buttons.forEach((btn) => btn.classList.remove("active"));

                button.classList.toggle("active");

                this.ui.productMainImageElement.src = images[index].src;
            })
        })
    }

    addEventListenersToMobileButtons() {
        const slider = this.ui.productMobileSliderElement;
        const totalSlides = slider.querySelectorAll("img").length;

        this.ui.productMobileLeftButtonElement.addEventListener("click", () => {
            this.#currentSlide = Math.max(0, this.#currentSlide - 1);
            this.#scrollToSlide();
        })

        this.ui.productMobileRightButtonElement.addEventListener("click", () => {
            this.#currentSlide = Math.min(totalSlides - 1, this.#currentSlide + 1);
            this.#scrollToSlide();
        })

        slider.addEventListener("scroll", () => {
            const scrollPos = slider.scrollLeft;
            this.#currentSlide = Math.round(scrollPos / (this.#slideWidth + this.#gap));
        })
    }

    #scrollToSlide() {
        const slider = this.ui.productMobileSliderElement;
        const slides = slider.querySelectorAll("img");

        if (slider.length === 0) return;

        const sliderWidth = slides[0].clientWidth;
        const gap = this.#gap || 0;

        slider.scrollTo({
            left: this.#currentSlide * (sliderWidth + gap),
            behavior: "smooth"
        })
    }
}

export default Product;