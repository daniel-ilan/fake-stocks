import axios from "axios";
import router from "../../router";

const dbInstance = axios.create({
  baseURL: "https://stock-traders-9ed14.firebaseio.com/",
});

const authInstance = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1",
});

const state = {
  idToken: null,
  userId: null,
  user: null,
};
const mutations = {
  authUser(state, userData) {
    state.userId = userData.userId;
    state.idToken = userData.token;
  },
  storeUser(state, user) {
    state.user = user;
  },
  clearAuthData(state) {
    console.log(state);
    state.idToken = null;
    state.userId = null;
    state.user = null;
  },
};
const actions = {
  setLogOutTimer({ dispatch }, expirationTime) {
    setTimeout(() => {
      dispatch("logOut");
    }, expirationTime * 1000);
  },
  signIn({ commit, dispatch }, authData) {
    authInstance
      .post(
        "/accounts:signInWithPassword?key=AIzaSyBGn9NOG0B3Hi4Wb46RYbSe0ZGBeVOC7SE",
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        }
      )
      .then(res => {
        commit("authUser", {
          token: res.data.idToken,
          userId: res.data.localId,
        });
        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expiresionDate", expirationDate);
        localStorage.setItem("userId", res.data.localId);
        dispatch("setLogOutTimer", res.data.expiresIn);
        dispatch("loadData", {
          userId: res.data.localId,
          token: res.data.idToken,
        });
        dispatch("initStocks", res.data.idToken);
      })
      .catch(error => console.log(error));
  },
  signUp({ commit, dispatch }, authData) {
    authInstance
      .post("/accounts:signUp?key=AIzaSyBGn9NOG0B3Hi4Wb46RYbSe0ZGBeVOC7SE", {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      })
      .then(res => {
        console.log(res);
        commit("authUser", {
          token: res.data.idToken,
          userId: res.data.localId,
        });
        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expiresionDate", expirationDate);
        localStorage.setItem("userId", res.data.localId);
        dispatch("storeUser", authData);
        dispatch("setLogOutTimer", res.data.expiresIn);
        dispatch("initStocks", res.data.idToken);
      })
      .catch(error => console.log(error));
  },
  storeUser({ state }, userData) {
    if (!state.idToken) {
      return;
    }
    dbInstance
      .put("/users/" + state.userId + ".json?auth=" + state.idToken, userData)
      .then(res => {
        console.log("storeUser: ", res);
      })
      .catch(error => {
        console.log(error);
      });
  },
  getUser({ commit, state }) {
    if (!state.idToken) {
      return;
    }
    dbInstance
      .get("/users.json" + "?auth=" + state.idToken)
      .then(res => {
        console.log(res);
        const data = res.data;
        const users = [];
        for (let key in data) {
          const user = data[key];
          user.id = key;
          users.push(user);
        }
        console.log(users);
        commit("storeUser", users[0]);
      })
      .catch(error => console.log(error));
  },
  logOut({ commit }) {
    commit("clearAuthData");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.replace("/signIn");
  },
  tryAutoLogIn({ commit }) {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const expiresionDate = localStorage.getItem("expiresionDate");
    const now = new Date();
    if (now >= expiresionDate) {
      return;
    }
    const userId = localStorage.getItem("userId");
    commit("authUser", {
      token: token,
      userId: userId,
    });
  },
};
const getters = {
  user(state) {
    return state.user ? null : state.userId;
  },
  token(state) {
    return state.idToken;
  },
  isAuthenticated(state) {
    return state.idToken !== null;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
