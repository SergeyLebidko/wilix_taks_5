import React, {useEffect} from 'react';

import {TTag} from "../../types";
import {Chip} from "@mui/material";

type TagCardProp = {
    tag: TTag;
}

const TagCard: React.FC<TagCardProp> = ({tag}) => {
    const id = `tag-card-${tag.id}`;

    // После монтирования - принудительно назначаем компоненту цвет
    useEffect(() => {
        const card = document.querySelector(`#${id} div`);
        if (card !== null){
            (card as HTMLElement).style.backgroundColor = tag.color;
            console.log(tag.color);
        }
    }, []);

    return (
        <div id={id}>
            <Chip
                size="small"
                label={tag.text}
            />
        </div>
    );
}

export default TagCard;
