import {TColorParts} from '../../types';

function createColorString(colorPars: TColorParts): string {
    const [r, g, b] = colorPars;
    return `rgb(${r},${g},${b})`;
}

export default createColorString;
