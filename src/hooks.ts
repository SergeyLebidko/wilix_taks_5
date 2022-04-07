import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {ERROR_SHOW_TIMEOUT} from './settings';
import {loggedUserErrorSelector, loggedUserSlice, loggedUserStatusSelector} from './store';

const {resetLoggedUserError} = loggedUserSlice.actions;

export function useLoggedUserErrorControl(): [boolean, string | null] {
    const dispatch = useDispatch();

    const loggedUserError = useSelector(loggedUserErrorSelector);
    const loggedUserStatus = useSelector(loggedUserStatusSelector);
    const hasUserDataPending = loggedUserStatus === 'pending';
    const hasUserDataError = loggedUserStatus === 'error';

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
        if (hasUserDataError) {
            errorTimer.current = setTimeout(() => resetError(), ERROR_SHOW_TIMEOUT);
        }
    }, [hasUserDataError]);

    return [hasUserDataPending, loggedUserError];
}
