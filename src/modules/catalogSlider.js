import Helpers from "./helpers";
import HtmlBuilderView from "./HtmlBuilderView";

class CatalogSlider {
    #parent = "[data-popular-list]";
    #selectors = {
        popularList: "[data-popular-list]",
        previewButton: "[data-populat-preview]",
        nextButton: "[data-popular-next]",
    };
    #currentSlide = 0;
    #gap = 60;
    #data;

    constructor() {
        this.helpers = new Helpers();
        this.htmlBuilder = new HtmlBuilderView();
        this.parantElement = document.querySelector(this.#parent);
        this.sliderPopularElement = document.querySelector(this.#selectors.popularList);
        this.previewButtonElement = document.querySelector(this.#selectors.previewButton);
        this.nextButtonElement = document.querySelector(this.#selectors.nextButton);
        this.init();
    }

    async init() {
        this.#data = await this.helpers.getData();
        this.getProductPopular();
        this.helpers.addEventListenerToBuyButton("main-popular__item", "popular-product__buy");
        this.helpers.buttonStopPropagation("popular-product__buy");
        this.helpers.addEventListenerToFavoritesButton("main-popular__item", "popular-product__favorit")
        this.helpers.buttonStopPropagation("popular-product__favorit");
        this.addEventistenerToSliderButtons();
    }

    getProductPopular() {
        this.#data.forEach((product) => {
            if (product.feedback >= 4.9) {
                const li = this.#createProductListItem(product);
                this.parantElement.appendChild(li);
            }
        })
    }

    addEventistenerToSliderButtons() {
        const slider = this.sliderPopularElement;
        const totalSlides = slider.querySelectorAll("li").length;

        this.previewButtonElement.addEventListener("click", () => {
            this.#currentSlide = Math.max(0, this.#currentSlide - 1);
            this.#scrollToSlide(slider)
        })

        this.nextButtonElement.addEventListener("click", () => {
            this.#currentSlide = Math.min(totalSlides - 1, this.#currentSlide + 1);
            this.#scrollToSlide(slider)
        })

        slider.addEventListener("scroll", () => {
            const scrollPos = slider.scrollLeft;
            this.#currentSlide = Math.round(scrollPos / (218 + this.#gap))
        })
    }

    #scrollToSlide(slider) {
        const slides = slider.querySelectorAll("li");

        if (slider.length === 0) return;

        const sliderWidth = slides[0].clientWidth;
        const gap = this.#gap || 0;

        slider.scrollTo({
            left: this.#currentSlide * (sliderWidth + gap),
            behavior: "smooth"
        })
    }

    #createProductListItem(product) {
        const id = product.id;

        const li = this.htmlBuilder.createListItem("main-popular__item", "data-popular-item-id", id)
        const aLink = this.htmlBuilder.createNameLinkProduct(`/pages/product.html?id=${id}`, "", "main-popular__link");
        const productElement = this.htmlBuilder.createBlock("popular-product");
        const image = this.htmlBuilder.createImage(product.mainImage, "popular-product__image");
        const name = this.htmlBuilder.createNameProduct(product.name, "popular-product__name");
        const feedback = this.htmlBuilder.createFeedback(product.feedback, "popular-product__feedback");
        const price = this.htmlBuilder.createPrice(product.price, "popular-product__price");
        const buttons = this.htmlBuilder.createButtonBlock("popular-product__buttons", "popular-product__buy", "popular-product__favorit", "data-popular-buy-button", id);

        aLink.append(productElement);
        aLink.append(image);
        aLink.append(name);
        aLink.append(feedback);
        aLink.append(price);
        aLink.append(buttons);
        li.appendChild(aLink);

        return li;
    }
}

export default CatalogSlider;