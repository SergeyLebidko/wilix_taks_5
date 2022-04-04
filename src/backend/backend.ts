import {DB_NAME} from "../settings";

class Backend {
    constructor() {
        // Проверяем наличие данных в local storage
        const database = localStorage.getItem(DB_NAME);
        if (!database) {
            // TODO Код создания базы данных
        }
    }
}

export default new Backend();
