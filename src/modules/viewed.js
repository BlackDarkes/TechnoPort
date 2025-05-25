import Helpers from "./helpers";
import HtmlBuilderView from "./HtmlBuilderView";

class Viewed {
    #visited = JSON.parse(localStorage.getItem("visited")) || [];
    #data;
    #parent = "[data-viewed-list]";
    #selectors = {
        popularList: "[data-viewed-list]",
        previewButton: "[data-viewed-preview]",
        nextButton: "[data-viewed-next]",
    };
    #currentSlide = 0;
    #gap = 60;

    constructor() {
        this.helpers = new Helpers();
        this.htmlBuilder = new HtmlBuilderView();
        this.parentElement = document.querySelector(this.#parent);
        this.sliderPopularElement = document.querySelector(this.#selectors.popularList);
        this.previewButtonElement = document.querySelector(this.#selectors.previewButton);
        this.nextButtonElement = document.querySelector(this.#selectors.nextButton);
        this.init();
    }

    async init() {
        this.#data = await this.helpers.getData();
        this.getProductViewed();
        this.helpers.addEventListenerToBuyButton("main-viewed__item", "viewed-product__buy");
        this.helpers.buttonStopPropagation("viewed-product__buy");
        this.helpers.addEventListenerToFavoritesButton("main-viewed__item", "viewed-product__favorit");
        this.helpers.buttonStopPropagation("viewed-product__favorit");
        this.addEventistenerToSliderButtons();
    }

    getProductViewed() {
        this.#visited.forEach((id) => {
            const product = this.#data.find((product) => product.id === id);

            if (product) {
                const li = this.#createProductListItem(product);
                this.parentElement.appendChild(li);
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

        const li = this.htmlBuilder.createListItem("main-viewed__item", "data-viewed-item-id", id);
        const aLink = this.htmlBuilder.createNameLinkProduct(`/pages/product.html?id=${id}`, "", "main-viewed__link");
        const productElement = this.htmlBuilder.createBlock("viewed-product");
        const image = this.htmlBuilder.createImage(product.mainImage, "viewed-product__image");
        const name = this.htmlBuilder.createNameProduct(product.name, "viewed-product__name");
        const feedback = this.htmlBuilder.createFeedback(product.feedback, "viewed-product__feedback");
        const price = this.htmlBuilder.createPrice(product.price, "viewed-product__price");
        const buttons = this.htmlBuilder.createButtonBlock("viewed-product__buttons", "viewed-product__buy", "viewed-product__favorit", "data-viewed-buy-button", id);

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

export default Viewed;