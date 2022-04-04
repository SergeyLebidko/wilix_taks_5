import {BACKEND_TIMEOUT, DB_NAME} from "../settings";
import {MOCK_DATA} from "./mock_data";
import {TComment, TDataBase, TDataSet, TMethods, TPost, TResponse, TTag, TUrls, TUser} from "./types";

class Backend {
    private db: TDataBase | undefined;

    constructor() {
        // Проверяем наличие данных в local storage и, если их там нет, записываем их туда
        const database = localStorage.getItem(DB_NAME);
        if (!database) {
            localStorage.setItem(DB_NAME, JSON.stringify(MOCK_DATA));
        }
    }

    private fetchUser(method: TMethods, options: any): TUser | TUser[] | null {
        if (this.db) {
            if (method === TMethods.Get) {
                return this.db[TDataSet.User];
            }
        }
        return null;
    }

    private fetchPost(method: TMethods, options: any): TPost | TPost[] | null {
        if (this.db) {
            if (method === TMethods.Get) {
                return this.db[TDataSet.Post]
            }
        }
        return null;
    }

    private fetchComment(method: TMethods, options: any): TComment | TComment[] | null {
        if (this.db) {
            if (method === TMethods.Get) {
                return this.db[TDataSet.Comment]
            }
        }
        return null;
    }

    private fetchTag(method: TMethods, options: any): TTag | TTag[] | null {
        if (this.db) {
            if (method === TMethods.Get) {
                return this.db[TDataSet.Tag]
            }
        }
        return null;
    }

    public fetch(url: TUrls, method: TMethods, options: any): Promise<TResponse> {
        return new Promise(resolve => {
            setTimeout(() => {
                // Перед выпонение операции загружаем базу данных из local storage
                this.db = JSON.parse(localStorage.getItem(DB_NAME) || '');
                const _db = this.db;

                // По переданному URL выбираем метод, работающий с нужным набором данных и передаем ему параметры операции
                const payload = {
                    [TDataSet.User]: this.fetchUser,
                    [TDataSet.Post]: this.fetchPost,
                    [TDataSet.Comment]: this.fetchComment,
                    [TDataSet.Tag]: this.fetchTag
                }[url](method, options);

                // Если нужно, то после выполнения операции с данными сбрасываем дамп БД обратно в local storage
                if (_db !== this.db) {
                    localStorage.setItem(DB_NAME, JSON.stringify(this.db));
                }

                // Если методы работы с данными вернули данные,то операция выполнена успешно
                resolve({
                    type: payload ? 'success' : 'error',
                    payload: payload ? payload : `Не удалось выполнить запрос c параметрами: url: ${url} method: ${method} options: ${JSON.stringify(options)}`
                });
            }, BACKEND_TIMEOUT);
        });
    }
}

export default new Backend();
