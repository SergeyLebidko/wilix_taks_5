import {useNavigate} from 'react-router-dom';

function useNavigator() {
    const navigate = useNavigate();

    return {
        toMain: () => navigate('/'),
        toLogout: () => navigate('/logout'),
        toCreatePost: () => navigate('/create_post')
    }
}

export default useNavigator;
