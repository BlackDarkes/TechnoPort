class CatalogManager {
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

    createFeedback(feedback, classNameText, classNameFeedbakc) {
        const p = document.createElement("p");
        const span = document.createElement("span");

        p.textContent = "Отзывы ";
        span.textContent = feedback;

        p.classList.add(classNameText);
        span.classList.add(classNameFeedbakc);

        p.appendChild(span);

        return p;
    }

    createPrice(price, className) {
        const p = document.createElement("p");
        p.textContent = price + " ₽";
        p.classList.add(className);

        return p;
    }

    createButtonsBlock(blockName, buyName, favoritName) {
        const div = document.createElement("div");
        const buttonBuy = document.createElement("button");
        const buttonfFavorit = document.createElement("button");
        const imageBuy = document.createElement("img");
        const imageFavorit = document.createElement("img")

        div.classList.add(blockName);
        buttonBuy.classList.add(buyName);
        buttonfFavorit.classList.add(favoritName);

        imageBuy.src = "/images/category/shoppingCartWhite.svg";
        imageFavorit.src = "/images/header/heart.svg";

        buttonBuy.appendChild(imageBuy);
        buttonfFavorit.appendChild(imageFavorit);
        div.appendChild(buttonBuy);
        div.appendChild(buttonfFavorit);

        return div;
    }
}

export default CatalogManager;