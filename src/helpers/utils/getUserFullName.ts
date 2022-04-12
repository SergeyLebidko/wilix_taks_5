import {TUser} from "../../types";

function getUserFullName(user: TUser): string {
    return `${user.first_name} ${user.last_name}`;
}

export default getUserFullName;
