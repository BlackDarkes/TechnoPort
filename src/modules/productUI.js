class ProductUI {
    constructor(selectors, selectorsMobile) {
        this.productNameElement = document.querySelector(selectors.productName);
        this.productImagesSliderElement = document.querySelector(selectors.productImagesSlider);
        this.productMainImageElement = document.querySelector(selectors.productMainImage);
        this.productAboutElement = document.querySelector(selectors.productAbout);
        this.productFeedbackElement = document.querySelector(selectors.productFeedback);
        this.productPriceElement = document.querySelector(selectors.productPrice);
        this.productDescriptionElement = document.querySelector(selectors.productDescription);
        
        this.productMobileSliderElement = document.querySelector(selectorsMobile.productMobileSlider);
        this.productMobileLeftButtonElement = document.querySelector(selectorsMobile.productMobileLeftButton);
        this.productMobileRightButtonElement = document.querySelector(selectorsMobile.productMobileRightButton);
    }

    getName(name) {
        return this.productNameElement.textContent = name;
    }

    getImagesSlider(images) {
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

    getMainImage(mainImage) {
        return this.productMainImageElement.src = mainImage;
    }

    getAbout(about) {
        return this.productAboutElement.textContent = about;
    }

    getFeedback(feedback) {
        return this.productFeedbackElement.textContent = feedback;
    }

    getPrice(price) {
        return this.productPriceElement.textContent = price + " ₽";
    }

    getDescription(description) {
        return this.productDescriptionElement.textContent = description;
    }

    getMobileSlider(images) {
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