import {TColorParts} from '../../types';

function createColorString(colorPars: TColorParts): string {
    const [h, s, l] = colorPars;
    return `hsl(${h},${s}%,${l}%)`;
}

export default createColorString;
