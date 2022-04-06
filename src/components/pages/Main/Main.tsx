import React from 'react';
import {useSelector} from 'react-redux';

import {allListDoneSelector} from '../../../store';

const Main: React.FC = () => {
    const allListDone = useSelector(allListDoneSelector);

    return (
        <div>
            {allListDone ? 'Wilix Blog' : 'загрузка...'}
        </div>
    );
}

export default Main;
