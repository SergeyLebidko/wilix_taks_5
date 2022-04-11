import {DIGITS, DIGITS_PASS_COUNT, LETTERS, LETTERS_PASS_COUNT, SPECS, SPECS_PASS_COUNT} from '../../constants';
import randomSequence from './randomSequence';

function createPassword(): string {
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

export default createPassword;
