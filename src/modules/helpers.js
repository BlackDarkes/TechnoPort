class Helpers {
    async getData() {
        try {
            const res = await fetch("/data/data.json");

            if (!res.ok) {
                throw new Error("Не удалось получить данные!");
            }

            const data = await res.json();

            return data;
        } catch(error) {
            console.error(error);
            return [];
        }
    }

    async loadSvg(url) {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Не удалось загрузить SVG");
        }

        const svgText = await res.text();
        const div = document.createElement("div");

        div.innerHTML = svgText;

        return div.firstChild;
    }
}

export default Helpers;