import axios from "axios";

const authData = JSON.parse(localStorage.getItem('fairytales_auth'));
const accessToken = authData ? authData : null;


const instance = axios.create({
  baseURL: 'https://0gdmx7obk4.execute-api.eu-west-1.amazonaws.com/dev/',
  headers: {
    Authorization: `${accessToken}`
  }
});

export const auth = {
  checkAuth() {
    return instance.post(`user/login`, {
      "name": "test",
      "password": "00000"
    }).then((response) => {
      if(response && response.data) {
        localStorage.setItem('fairytales_auth', JSON.stringify(response.data.data));
        instance.defaults.headers = {Authorization: `${response.data.data}`};
      }
      return response
    })
  }
}

export const booksAPI = {
  getBooks() {
    return instance.get(`book/get/list`);
  },
  getAllBookPages(bookId) {
    return instance.get(`book/${bookId}/page/all`);
  },
  getGenreList() {
    return instance.get('genre/list')
  }
}

export const searchAPI = {
  getBooks(title,authorName,genre) {
    return instance.get(`book/get/list?author=${authorName ? authorName : ''}&title=${title ? title : ''}&genre=${genre ? genre : ''}`)
  }
}

