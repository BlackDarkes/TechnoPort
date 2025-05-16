import Helpers from "./helpers";
import ProductUI from "./productUI";

class Product {
    #data;
    #url = new URLSearchParams(document.location.search);
    #id = this.#url.get("id");
    #selectors = {
        productName: "[data-product-name]",
        productImagesSlider: "[data-product-slider-images]",
        productMainImage: "[data-product-main-image]",
        productAbout: "[data-product-about]",
        productFeedback: "[data-prodcut-feedback]",
        productPrice: "[data-product-price]",
        productDescription: "[data-product-description]",
    }

    constructor() {
        this.helpers = new Helpers();
        this.ui = new ProductUI(this.#selectors);
        this.init();
    }

    async init() {
        this.#data = await this.helpers.getData();
        this.getProduct();
        this.svitchImages();
    }

    getProduct() {
        const product = this.#data.find((product) => product.id == this.#id);
        this.ui.getName(product);
        this.ui.getImagesSlider(product);
        this.ui.getMainImage(product);
        this.ui.getAbout(product);
        this.ui.getFeedback(product);
        this.ui.getPrice(product);
        this.ui.getDescription(product);
    }

    svitchImages() {
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
}

export default Product;