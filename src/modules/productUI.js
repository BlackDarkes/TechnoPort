class ProductUI {
    constructor(selectors) {
        this.productNameElement = document.querySelector(selectors.productName);
        this.productImagesSliderElement = document.querySelector(selectors.productImagesSlider);
        this.productMainImageElement = document.querySelector(selectors.productMainImage);
        this.productAboutElement = document.querySelector(selectors.productAbout);
        this.productFeedbackElement = document.querySelector(selectors.productFeedback);
        this.productPriceElement = document.querySelector(selectors.productPrice);
        this.productDescriptionElement = document.querySelector(selectors.productDescription);
        this.productMobileSliderElement = document.querySelector(selectors.productMobileSlider);
    }

    getName(product) {
        return this.productNameElement.textContent = product.name;
    }

    getImagesSlider(product) {
        const images = product.images;
        let button;

        images.forEach((src, index) => {
            button = this.#createButton("main-item__image");
            const img = document.createElement("img");

            if (index === 0) {
                button.classList.add("active")
            } 

            img.src = src;

            button.appendChild(img);
            this.productImagesSliderElement.appendChild(button);
        })

        return button;
    }

    getMainImage(product) {
        return this.productMainImageElement.src = product.mainImage;
    }

    getAbout(product) {
        return this.productAboutElement.textContent = product.about;
    }

    getFeedback(product) {
        return this.productFeedbackElement.textContent = product.feedback;
    }

    getPrice(product) {
        return this.productPriceElement.textContent = product.price + " ₽";
    }

    getDescription(product) {
        return this.productDescriptionElement.textContent = product.description;
    }

    getMobileSlider(prodcut) {
        const images = prodcut.images;

        images.forEach((image) => {
            this.productMobileSliderElement.appendChild(this.#createImage(image))
        })

        return this.productMobileSliderElement;
    }

    #createButton(className) {
        const button = document.createElement("button");
        button.classList.add(className);

        return button;
    }

    #createImage(src) {
        const img = document.createElement("img");
        img.src = src;

        return img;
    }
}

export default ProductUI;