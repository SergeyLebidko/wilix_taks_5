import {BACKEND_TIMEOUT, DB_NAME} from "../settings";
import {MOCK_DATA} from "./mock_data";
import {TDataSet, TEntity, TMethods, TPost, TUrls, TUser} from "./types";

class Backend {
    constructor() {
        // Проверяем наличие данных в local storage и, если их там нет, записываем их туда
        const database = localStorage.getItem(DB_NAME);
        if (!database) {
            localStorage.setItem(DB_NAME, JSON.stringify(MOCK_DATA));
        }
    }

    public fetch(url: TUrls, method: TMethods, options: any): Promise<TEntity> {
        return new Promise(resolve => {
            setTimeout(() => {
               if (url === TDataSet.User) {
                   // TODO Вставить код
               }
               if (url === TDataSet.Post) {
                   // TODO Вставить код
               }
               if (url === TDataSet.Comment) {
                   // TODO Вставить код
               }
               if (url == TDataSet.Tag) {
                   // TODO Вставить код
               }
            }, BACKEND_TIMEOUT);
        });
    }
}

export default new Backend();
