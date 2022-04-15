import React, {useEffect} from 'react';

import {TTag} from '../../../types';
import {Chip} from '@mui/material';
import createColorString from '../../../helpers/utils/createColorString';
import './TagCard.scss';
import getLuma from "../../../helpers/utils/getLuma";

type TagCardProp = {
    tag: TTag;
}

const TagCard: React.FC<TagCardProp> = ({tag}) => {
    const id = `tag-card-${tag.id}`;

    // После монтирования - принудительно назначаем цвет чипу
    useEffect(() => {
        const card = document.querySelector(`#${id} div`) as HTMLElement;
        const [r, g, b] = tag.color;
        card.style.backgroundColor = createColorString(tag.color);
        if (getLuma(r, g, b) < 60) {
            card.style.color = 'white';
        }
    }, []);

    return (
        <div className="tag_card" id={id}>
            <Chip
                size="small"
                label={tag.text}
            />
        </div>
    );
}

export default TagCard;
