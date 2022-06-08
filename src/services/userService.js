import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';
import { fetchWrapper } from '../helpers/fetch-wrapper';


const { publicRuntimeConfig } = getConfig();
const baseUrl = '' //`${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
  user: userSubject.asObservable(),
  get userValue () { return userSubject.value },
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete
};

function login(username, account) {
   //return fetchWrapper.post(`${baseUrl}/authenticate`, { account})    
        //.then(user => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            //userSubject.next(user);
           //localStorage.setItem('user', JSON.stringify(username));
           //localStorage.setItem('wallet', JSON.stringify(account));
            //return user;
          
        //});
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    localStorage.removeItem('wallet');
    userSubject.next(null);
    Router.push('/');
    //Router.push('/account/login');
}


export async function register(user) {
    //return fetchWrapper.post(`${baseUrl}/uregister`, user);
}

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(x => {
            // update stored user if the logged in user updated their own record
            if (id === userSubject.value.id) {
                // update local storage
                const user = { ...userSubject.value, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // publish updated user to subscribers
                userSubject.next(user);
            }
            return x;
        });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}

