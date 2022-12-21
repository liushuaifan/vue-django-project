// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//     layout: "baseLayout",
//   },
//   mutations: {
//     SET_LAYOUT(state, value){
//       state.layout = value;
//     }
//   },
//   actions: {
//     setLayout({commit}, data){
//       commit('SET_LAYOUT', data);
//     }
//   },
//   modules: {
//   }
// })

import { createStore } from "vuex" 

const store = createStore({
    state: {
        layout: "baseLayout",
    },
    mutations: {
        SET_LAYOUT(state, value){
            //console.log("mutations");
            state.layout = value;
    }
    },
    actions: {
        setLayout({commit}, data){
            //console.log("actions");
            commit('SET_LAYOUT', data);
    }
    },
    modules: {
    }
 })
 
 export default store