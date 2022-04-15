import {TDataBase, TDataSet} from "../types";
import {DEFAULT_TAG_COLOR_PARAMS} from "../constants";

export const MOCK_DATA: TDataBase = {
    [TDataSet.User]: [
        {
            id: 1,
            login: 'thanos',
            password: 'qwerty',
            first_name: 'Танос',
            last_name: 'Завоеватель',
            avatar: null
        },
        {
            id: 2,
            login: 'ironman',
            password: 'qwerty',
            first_name: 'Тони',
            last_name: 'Старк',
            avatar: null
        }
    ],
    [TDataSet.Post]: [
        {
            id: 1,
            user_id: 1,
            title: 'Камень реальности',
            text: 'Реальность полна разочарований... Но теперь я сам определяю реальность!',
            is_comments_enabled: true,
            dt_created: 1649059902423
        },
        {
            id: 2,
            user_id: 2,
            title: 'Коротко обо мне',
            text: 'Гений, плэйбой, миллиардер, эрудит, филантроп!...',
            is_comments_enabled: true,
            dt_created: 1649060210268
        },
        {
            id: 3,
            user_id: 2,
            title: 'Железный человек',
            text: 'Я - железный человек. Изобретатель, магнат, победитель по жизни!',
            is_comments_enabled: false,
            dt_created: 1649919255987
        }
    ],
    [TDataSet.Comment]: [
        {
            id: 1,
            user_id: 1,
            post_id: 2,
            text: 'Такой же как и все мстители! Упрям и обуреваем гордыней!',
            dt_created: 1649060435634
        },
        {
            id: 2,
            user_id: 2,
            post_id: 1,
            text: 'Да ничего ты не определяешь, фиолетовый!',
            dt_created: 1649060524966
        }
    ],
    [TDataSet.Tag]: [
        {
            id: 1,
            post_id: 1,
            text: 'Мечта',
            color: DEFAULT_TAG_COLOR_PARAMS
        },
        {
            id: 2,
            post_id: 1,
            text: 'Любимое дело',
            color: [124, 252, 0]
        },
        {
            id: 3,
            post_id: 2,
            text: 'Обо мне',
            color: DEFAULT_TAG_COLOR_PARAMS
        }
    ]
}
