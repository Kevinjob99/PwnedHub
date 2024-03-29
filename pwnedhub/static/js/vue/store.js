const state = {
    apiUrl: API_BASE_URL,
    mail: Array(),
    messages: Array(),
    userInfo: null,
}

const mutations = {
    UPDATE_MAIL(state, payload) {
        state.mail = payload;
    },
    UPDATE_LETTER(state, payload) {
        var index = state.mail.findIndex(function(letter) {
            return letter.id === payload.id;
        })
        state.mail[index] = payload;
    },
    UPDATE_MESSAGES(state, payload) {
        state.messages = payload;
    },
    SET_USER_INFO(state, value) {
      state.userInfo = value;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    UNSET_USER_INFO(state) {
      state.userInfo = null
      localStorage.removeItem("userInfo");
    },
};

const actions = {
    updateMail(context, mail) {
        context.commit("UPDATE_MAIL", mail);
    },
    updateLetter(context, letter) {
        context.commit("UPDATE_LETTER", letter);
    },
    updateMessages(context, messages) {
        context.commit("UPDATE_MESSAGES", messages);
    },
    setUserInfo(context, value) {
        context.commit("SET_USER_INFO", value);
    },
    unsetUserInfo(context) {
        context.commit("UNSET_USER_INFO");
    },
    initUserInfo(context) {
        var user = JSON.parse(localStorage.getItem("userInfo"));
        if (user != null) {
            context.dispatch("setUserInfo", user);
        }
    },
};

const getters = {
    getApiUrl(state) {
        return state.apiUrl;
    },
    getMail(state) {
        return state.mail;
    },
    getLetter(state) {
        return function(id) {
            return state.mail.find(function(letter) {
                return letter.id === id;
            });
        };
    },
    getMessages(state) {
        return state.messages;
    },
    getUserInfo(state) {
        return state.userInfo;
    },
    isLoggedIn(state, getters) {
        if (getters.getUserInfo === null) {
            return false;
        }
        return true;
    },
};

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
});

// initialize the store prior to instantiating the app to ensure
// the router.beforeEach check gets the proper isLoggedIn value
store.dispatch("initUserInfo");
