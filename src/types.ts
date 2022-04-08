// Тип сортировки постов - по дате, по пользователю, по заголовку
export enum TSortType {
    ByDate = 'date',
    ByUser = 'user',
    ByTitle = 'title'
}

// Направление сортировки - от меньшего к большему и от большего к меньшему
export enum TSortDirection {
    ToUp = 'to_up',
    ToDown = 'to_down'
}
