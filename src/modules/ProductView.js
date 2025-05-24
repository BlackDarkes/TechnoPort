import HtmlBuilderView from "./HtmlBuilderView";

class ProductView {
    constructor(selectors, selectorsMobile) {
        this.productNameElement = document.querySelector(selectors.productName);
        this.productImagesSliderElement = document.querySelector(selectors.productImagesSlider);
        this.productMainImageElement = document.querySelector(selectors.productMainImage);
        this.productAboutElement = document.querySelector(selectors.productAbout);
        this.productFeedbackElement = document.querySelector(selectors.productFeedback);
        this.productPriceElement = document.querySelector(selectors.productPrice);
        this.productDescriptionElement = document.querySelector(selectors.productDescription);
        this.productButtonsBlock = document.querySelector(selectors.buttonsBlock);
        
        this.productMobileSliderElement = document.querySelector(selectorsMobile.productMobileSlider);
        this.productMobileLeftButtonElement = document.querySelector(selectorsMobile.productMobileLeftButton);
        this.productMobileRightButtonElement = document.querySelector(selectorsMobile.productMobileRightButton);

        this.htmlBuilder = new HtmlBuilderView();
    }

    getName(name) {
        return this.productNameElement.textContent = name;
    }

    getImagesSlider(images) {
        let button;

        images.forEach((src, index) => {
            button = this.htmlBuilder.createButton("", "main-item__image");

            if (index === 0) {
                button.classList.add("active")
            } 

            const img = this.htmlBuilder.createImage(src);

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
            this.productMobileSliderElement.appendChild(this.htmlBuilder.createImage(image));
        })

        return this.productMobileSliderElement;
    }

    switchImages() {
        const listImages = this.productImagesSliderElement;
        const buttons = listImages.querySelectorAll("button");
        const images = listImages.querySelectorAll("img");

        buttons.forEach((button, index) => {
            button.addEventListener("click", () => {
                buttons.forEach((btn) => btn.classList.remove("active"));

                button.classList.toggle("active");

                this.productMainImageElement.src = images[index].src;
            })
        })
    }

    addToVisited(id) {
        const visiteItems = this.#getVisitedItemsFromStorage();

        if (!visiteItems.includes(Number(id))) {
            visiteItems.push(Number(id));
            localStorage.setItem("visited", JSON.stringify(visiteItems));
        }
    }

    addToId(id) {
        this.productButtonsBlock.setAttribute("data-product-id", id);
    }

    #getVisitedItemsFromStorage() {
        let visitedItems = [];

        if (localStorage.getItem("visited")) {
            try {
                visitedItems = JSON.parse(localStorage.getItem("visited"));
                if (!Array.isArray(visitedItems)) {
                    visitedItems = [];
                }
            } catch(e) {
                visitedItems = [];
            }
        }

        return visitedItems;
    }
}

export default ProductView;