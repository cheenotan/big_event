import state from "./state"

export default {
    SET_TOKEN(state,data) {
        state.myToken = data
    },
    SET_USERINFO(state,data) {
        state.userinfo = data
    },
    SET_SIDEINFO(state,data) {
        state.sideinfo = data
    },
    GET_USER_INFO(state,data) {
        state.userinfo = data
    }
}