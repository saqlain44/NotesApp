import { AUTH, LOGOUT } from "../constants/actionTypes";
const user = {
    firstName: "",
    lastName: "",
    initials: ""
}

const authReducer = (state = user, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem("data", JSON.stringify(action.payload))
            return state;
        case LOGOUT:
            console.log("logout")
            localStorage.clear();
            return state;
        default:
            return state;
    }
}

export default authReducer;


