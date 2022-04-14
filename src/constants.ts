// Время "сетевой задержки" и миллисекундах для эмулатора бэкенда
import {TColorParts} from "./types";

export const BACKEND_TIMEOUT = 2000;

// Имя ключа в local storage для хранения базы данных
export const DB_NAME = 'backend'

// Имя ключа в local storage для хранения залогинившегося пользователя
export const LOGGED_USER_NAME = 'logged_user'

// Время отображения ошибок
export const ERROR_SHOW_TIMEOUT = 5000;

// Минимальная длина пароля
export const PASSWORD_MIN_LEN = 6;

// Параметры для автоматически создаваемого пароля
export const LETTERS = 'qazwsxedcrfvtgbyhnujmikolpQAZWSXEDCRFVTGBYHNUJMIKOLP';
export const DIGITS = '1234567890';
export const SPECS = '!@#$%^&*+';
export const LETTERS_PASS_COUNT = 6;
export const DIGITS_PASS_COUNT = 4;
export const SPECS_PASS_COUNT = 4;

// Размер страницы для пагинации
export const PAGINATION_PAGE_SIZE = 5;

// Количество комментариев, отображаемых по-умолчанию
export const DEFAULT_SHOW_COMMENT_COUNT = 3;

// Максимальная длина тега
export const MAX_TAG_LEN = 30;

// Цвет по-умолчанию для вновь создаваемых тегов (компоненты HSL)
export const DEFAULT_TAG_COLOR_PARAMS: TColorParts = [0, 0, 86];
export const DEFAULT_TAG_COLOR_NAME = 'Gainsboro';

