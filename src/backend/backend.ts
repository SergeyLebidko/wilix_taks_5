import {BACKEND_TIMEOUT, DB_NAME} from '../settings';
import {MOCK_DATA} from './mock_data';
import {TComment, TDataBase, TDataSet, TPost, TResponse, TTag, TUrls, TUser} from './types';

class Backend {
    private db: TDataBase | undefined;

    constructor() {
        // Проверяем наличие данных в local storage и, если их там нет, записываем их туда
        const rawDatabase = localStorage.getItem(DB_NAME);
        if (!rawDatabase) {
            localStorage.setItem(DB_NAME, JSON.stringify(MOCK_DATA));
        }
    }

    private getUserList(): TUser[] {
        return (this.db as TDataBase)[TDataSet.User];
    }

    private getPostList(): TPost[] {
        return (this.db as TDataBase)[TDataSet.Post];
    }

    private getCommentList(): TComment[] {
        return (this.db as TDataBase)[TDataSet.Comment];
    }

    private getTagList(): TTag[] {
        return (this.db as TDataBase)[TDataSet.Tag];
    }

    public fetch(url: TUrls, options: any): Promise<TResponse> {
        return new Promise(resolve => {
            setTimeout(() => {
                try {
                    this.db = JSON.parse(localStorage.getItem(DB_NAME) || '');
                    const _db = this.db;

                    const result: TResponse = {type: 'success'};
                    let payload;

                    // Выбор "маршрута" и получение результата
                    if (url === 'get_user_list') {
                        payload = this.getUserList();
                    } else if (url === 'get_post_list') {
                        payload = this.getPostList();
                    } else if (url === 'get_comment_list') {
                        payload = this.getCommentList();
                    } else if (url === 'get_tag_list') {
                        payload = this.getTagList();
                    }

                    // Формируем ответ и разрешаем им промис
                    if (payload !== undefined) {
                        result.payload = payload;
                    }
                    resolve(result);

                    // Если нужно - сбрасываем обновленный дамп базы в local storage
                    if (_db !== this.db) {
                        localStorage.setItem(DB_NAME, JSON.stringify(this.db));
                    }
                } catch (err) {
                    console.error(`Не удалось выполнить запрос на url: ${url} с параметрами: ${JSON.stringify(options)}. Возникла ошибка: ${(err as Error).message}`);
                    resolve({
                        type: 'error',
                        payload: (err as Error).message
                    });
                }
            }, BACKEND_TIMEOUT);
        });
    }
}

export default new Backend();
