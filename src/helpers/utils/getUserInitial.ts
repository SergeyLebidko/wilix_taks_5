import {TUser} from '../../backend/types';

function getUserInitial(user: TUser): string {
    return `${user.first_name[0]}${user.last_name[0]}`;
}

export default getUserInitial;
