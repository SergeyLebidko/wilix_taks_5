import {TDataBase, TDataSet} from "../types";

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
            dt_created: 1649059902423
        },
        {
            id: 2,
            user_id: 2,
            title: 'Коротко обо мне',
            text: 'Гений, плэйбой, миллиардер, эрудит, филантроп!...',
            dt_created: 1649060210268
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
            text: 'Обо мне'
        }
    ],
    [TDataSet.PostTag]: [
        {
            id: 1,
            tag_id: 1,
            post_id: 1
        },
        {
            id: 2,
            tag_id: 1,
            post_id: 2
        }
    ]
}
