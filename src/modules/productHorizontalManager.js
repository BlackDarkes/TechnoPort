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
}

export default ProductHorizontalManager;