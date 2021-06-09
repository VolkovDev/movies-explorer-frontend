export const BASE_URL = "https://api.avolk.ru";
// export const BASE_URL = "http://localhost:3000";

const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .then((data) => data);
}

const register = (email, password, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email, password, name
    })
  })
    .then((res) => {
      try {
        if (res.status === 200) {
          return res.json();
        }
      } catch (err) {
        return err;
      }
    })
    .then((res) => {
      return res;
    });
}

const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "email": email,
      "password": password
    })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
    });
}

export { checkToken, register, authorize, };
