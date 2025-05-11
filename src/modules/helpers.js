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
}

export default Helpers;