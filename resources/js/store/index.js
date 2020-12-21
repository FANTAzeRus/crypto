import Axios from "axios";
import { createStore } from "vuex";
import { v4 as uuidv4 } from "uuid";

export default createStore({
    state: {
        theme: "light",
        currency: [],
        c_currency: [],
    },

    actions: {
        toggleTheme({ commit, state }) {
            commit("setTheme", state.theme === "light" ? "dark" : "light");
        },
        init({ commit }) {
            Axios.get("/api/init").then((response) => {
                if (response.data.success) {
                    commit("init", {
                        c: response.data.currency,
                        cc: response.data.c_currency,
                    });
                }
            });
        },
        convert({ commit }, payload) {
            let url = `/api/convert/${payload.from}-${payload.to}`;
            Axios.get(url).then((response) => {
                if (response.data.success) {
                    let summ = payload.summ;
                    let val = response.data.ticker.price * summ;
                    if (typeof payload.callback === "function") {
                        payload.callback(val.toFixed(3));
                    }
                }
            });
        },
    },

    mutations: {
        setTheme(state, theme) {
            state.theme = theme;
        },
        init(state, payload) {
            state.currency = payload.c;
            state.c_currency = payload.cc;
        },
        setCurrency(state, payload) {
            state.currency[payload.key] = payload.data;
        },
    },
});
