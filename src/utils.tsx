import {DIGITS, DIGITS_PASS_COUNT, LETTERS, LETTERS_PASS_COUNT, SPECS, SPECS_PASS_COUNT} from "./settings";

function* randomSequence(seq: string, count: number): Generator<string> {
    for (let index = 0; index < count; index++) {
        yield seq[Math.floor(Math.random() * seq.length)];
    }
}

export function createPassword(): string {
    const buffer: string[] = [
        ...Array.from(randomSequence(LETTERS, LETTERS_PASS_COUNT)),
        ...Array.from(randomSequence(DIGITS, DIGITS_PASS_COUNT)),
        ...Array.from(randomSequence(SPECS, SPECS_PASS_COUNT))
    ];

    const result: string[] = [];
    do {
        result.push(buffer.splice(Math.floor(Math.random() * buffer.length), 1)[0]);
    } while (buffer.length);
    return result.join('');
}

export function getDateStringForTimestamp(timestamp: number): string {
    const monthList = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря'
    ];
    const date = new Date(timestamp);
    const d = '' + date.getDate();
    const m = monthList[date.getMonth()];
    const y = '' + date.getFullYear();
    return `${d} ${m} ${y}`;
}
