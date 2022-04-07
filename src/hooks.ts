import {useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';

import {ERROR_SHOW_TIMEOUT} from './settings';
import {loggedUserSlice} from './store';

const {resetLoggedUserError} = loggedUserSlice.actions;

export function useLoggedUserErrorControl(hasShowError: boolean) {
    const dispatch = useDispatch();
    const errorTimer: { current: NodeJS.Timeout | undefined } = useRef();

    const resetError = (): void => {
        dispatch(resetLoggedUserError());
    }

    const resetTimer = (): void => {
        if (typeof errorTimer.current !== 'undefined') clearTimeout(errorTimer.current);
    }

    // Сбрасываем таймер при размонтировании компонента и удаляем ошибку немедленно
    useEffect(() => {
        return () => {
            resetError();
            resetTimer();
        }
    }, []);

    // Если возникла ошибка входа - запускаем таймер, которые отключит её отображение через заданное время
    useEffect(() => {
        if (hasShowError) {
            errorTimer.current = setTimeout(() => resetError(), ERROR_SHOW_TIMEOUT);
        }
    }, [hasShowError]);
}
