import heart from "/images/header/heart.svg";

class ProductManager {
    createLink(href, id, className) {
        const alink = document.createElement("a");
        alink.href = href + `?id=${id}`;
        alink.classList.add(className);

        return alink;
    }

    createDiv(className) {
        const div = document.createElement("div");
        div.classList.add(className);

        return div;
    }

    createImage(src, className) {
        const image = document.createElement("img");
        image.alt = "Картинка товара";
        image.src = src;
        image.classList.add(className);

        return image;
    }

    createName(text, className) {
        const h2 = document.createElement("h2");
        h2.textContent = text;
        h2.classList.add(className);

        return h2;
    }

    createFeedback(feedback, classNameText, classNameFeedback) {
        const p = document.createElement("p");
        const span = document.createElement("span");

        p.textContent = "Отзывы ";
        span.textContent = feedback;

        p.classList.add(classNameText);
        span.classList.add(classNameFeedback);

        p.appendChild(span);

        return p;
    }

    createPrice(price, className) {
        const p = document.createElement("p");
        p.textContent = price + " ₽";
        p.classList.add(className);

        return p;
    }

    createButtonsBlock(blockName, buyName, favoritName, id) {
        const div = document.createElement("div");
        const buttonBuy = document.createElement("button");
        const buttonfFavorit = document.createElement("button");
        const imageBuy = document.createElement("img");

        div.classList.add(blockName);
        buttonBuy.classList.add(buyName);
        buttonfFavorit.classList.add(favoritName);

        buttonBuy.setAttribute("data-popular-buy-button", id);

        imageBuy.src = "/images/category/shoppingCartWhite.svg";
        this.#loadSvg(heart).then(svgElement => {
            svgElement.classList.add("viewed-product__svg")
            buttonfFavorit.appendChild(svgElement);
        });

        buttonBuy.appendChild(imageBuy);
        div.appendChild(buttonBuy);
        div.appendChild(buttonfFavorit);

        return div;
    }

    async #loadSvg(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Ошибка загрузки SVG: ' + response.status);
        }
        const svgText = await response.text();
        const div = document.createElement('div');
        div.innerHTML = svgText; 
        return div.firstChild;
    }
}

export default ProductManager;