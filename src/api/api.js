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
















// // JSON
// let fairytalesList = [
//   {
//     id: 1,
//     title:"The Snow Queen",
//     author:"Hans Christian Andersen",
//     image:"https://s3.eu-west-1.amazonaws.com/fairytalesbucket/img/1618645584328.jpeg",
//     owner:null,
//     price:'12.06',
//     isNew:true,
//     published:true,
//     createdAt:'2021-04-09T07:34:39.282Z',
//     updatedAt:'2021-05-12T10:45:37.873Z',
//     bookSound:{
//       id:1,
//       book_id:1,
//       file:'https://fairytalesbucket.s3-eu-west-1.amazonaws.com/sound/book_1.mp3',
//       regions: [
//         {
//           id: "be98be14-76d7-4f57-b55d-002db487a7af",
//           start: 1.4210854715202004e-14,
//           end: 71.78936708860758,
//           data: {
//             pageNumber: 1
//           }
//         },
//         {
//           id:"be98be14-76d7-4f57-b55d-002db487a7af",
//           start: 71.78936708860759,
//           end: 144.22548523206711,
//           data: {
//             pageNumber: 3
//           }
//         },
//         {
//           id:"be98be14-76d7-4f57-b55d-002db487a7af",
//           start: 144.22548523206711,
//           end: 217.48715119482887,
//           data: {
//             pageNumber: 5
//           }
//         },
//       ],
//       createdAt:"2021-04-12T08:47:38.138Z",
//       updatedAt:"2021-04-12T08:47:38.138Z",
//     },
//     bookGenre:[
//       {
//         id: 12,
//         book: 14,
//         genre_id: 1,
//         genres:{
//           id:1,
//           title: 'Advantages'
//         }
//       },
//       {
//         id: 13,
//         book: 14,
//         genre_id: 2,
//         genres:{
//           id:1,
//           title: 'Learning'
//         }
//       },
//
//     ]
//
//   }
// ]
