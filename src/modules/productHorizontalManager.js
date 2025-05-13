import redHeart from "/images/favourites/redHeart.svg";

class ProductHorizontalManager {
    createBlock(className) {
        const div = document.createElement("div");
        div.classList.add(className);

        return div;
    }

    createLink(className, path) {
        const a = document.createElement("a");
        a.href = path;
        a.classList.add(className);

        return a;
    }

    createImage(path, className) {
        const img = document.createElement("img");
        img.src = path;
        img.classList.add(className)

        return img;
    }

    createText(text, className) {
        const p = document.createElement("p");
        p.textContent = text;
        p.classList.add(className);

        return p;
    }

    createTitle(text, className) {
        const h2 = document.createElement("h2");
        h2.textContent = text;
        h2.classList.add(className);

        return h2;
    }

    createPrice(text, className) {
        const p = this.createText(text, className);
        p.textContent += " ₽";

        return p
    }

    createBuyButton(text, className) {
        const button = this.#createButton(text, className);
        const imageElement = this.createImage("/images/category/shoppingCartWhite.svg", "favourites-price__shop");
        button.appendChild(imageElement);

        return button;
    }

    createFavoritButton(text, className) {
        const button = this.#createButton(text, className);
        const imageElement = this.createImage("/images/favourites/redHeart.svg");
        button.appendChild(imageElement);

        return button;
    }

    

    #createButton(text, className) {
        const button = document.createElement("button");
        button.textContent = text;
        button.classList.add(className);

        return button;
    }
}

export default ProductHorizontalManager;