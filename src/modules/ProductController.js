import Helpers from "./helpers";
import ProductView from "./ProductView";

class ProductController {
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
        buttonsBlock: ".main-item__buttons",
    };
    #selectorsMobile = {
        productMobileSlider: "[data-product-mobile-slider-images]",
        productMobileLeftButton: "[data-product-mobile-left-button]",
        productMobileRightButton: "[data-product-mobile-right-button]",
    };

    constructor() {
        this.helpers = new Helpers();
        this.view = new ProductView(this.#selectors, this.#selectorsMobile);
        this.init();
    }

    async init() {
        this.#data = await this.helpers.getData();
        this.getProduct();
        this.view.switchImages();
        this.addEventListenersToMobileButtons();
        this.view.addToVisited(this.#id);
        this.helpers.addEventListenerToBuyButton("main-item__buttons", "main-item__buy");
    }

    getProduct() {
        const product = this.#data.find((product) => product.id == this.#id);
        const { name, images, mainImage, about, feedback, price, description } = product
        this.view.getName(name);
        this.view.getImagesSlider(images);
        this.view.getMainImage(mainImage);
        this.view.getAbout(about);
        this.view.getFeedback(feedback);
        this.view.getPrice(price);
        this.view.getDescription(description);
        this.view.getMobileSlider(images);
        this.view.addToId(this.#id);
    }

    addEventListenersToMobileButtons() {
        const slider = this.view.productMobileSliderElement;
        const totalSlides = slider.querySelectorAll("img").length;

        this.view.productMobileLeftButtonElement.addEventListener("click", () => {
            this.#currentSlide = Math.max(0, this.#currentSlide - 1);
            this.#scrollToSlide();
        })

        this.view.productMobileRightButtonElement.addEventListener("click", () => {
            this.#currentSlide = Math.min(totalSlides - 1, this.#currentSlide + 1);
            this.#scrollToSlide();
        })

        slider.addEventListener("scroll", () => {
            const scrollPos = slider.scrollLeft;
            this.#currentSlide = Math.round(scrollPos / (this.#slideWidth + this.#gap));
        })
    }

    #scrollToSlide() {
        const slider = this.view.productMobileSliderElement;
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

export default ProductController;