import axios from 'axios';

export default {
    namespaced: 'user',
    state: {
        username: localStorage.getItem('username') || '',
        identity: localStorage.getItem('identity') || ''
    },
    actions: {
        login({ commit, state }, data) {
            new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: '/admin/account/login',
                    data,
                    withCredentials: true,
                }).then(res => {
                    const { message, status } = res.data;
                    if (status === 0) {
                        state.username = message.uname;
                        state.identity = message.realname;
                        localStorage.setItem('username', message.uname);
                        localStorage.setItem('identity', message.realname);

                        resolve(message);
                    }
                })
            })
        },

        handleExit({ state }, fn) {
            axios({
                method: 'get',
                url: '/admin/account/logout',
                withCredentials: true
            }).then(res => {
                const { message, status } = res.data;
                if (status === 0) {
                    localStorage.removeItem('username');
                    localStorage.removeItem('identity');
                    fn();
                }
            })
        }
    }

}