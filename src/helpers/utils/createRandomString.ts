import randomSequence from './randomSequence';
import {LETTERS} from '../../constants';

function createRandomString(size = 10): string {
    return Array.from(randomSequence(LETTERS, size)).join('');
}

export default createRandomString;
