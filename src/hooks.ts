import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {ERROR_SHOW_TIMEOUT} from './settings';
import {loggedUserErrorSelector, loggedUserSlice, loggedUserStatusSelector} from './store';

const {resetLoggedUserError} = loggedUserSlice.actions;

// Хук, позволяющий контролировать отображение ошибок при выполнении "сетевых" операций
// с учетной записью, таких как вход и регистрация.
// Первый возвращаемый параметр - признак ожидания выполнения запроса.
// Второй возвращаемый параметр - ошибка, возникшая при выполнении операции.
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

export function useNavigator(){
    const navigate = useNavigate();

    return {
        toMain: () => navigate('/'),
        toLogout: () => navigate('/logout'),
        toCreatePost: () => navigate('/create_post')
    }
}
