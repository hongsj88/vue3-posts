import { posts } from '.';

// const posts = [
//   { id: 1, title: '제목1', content: '내용1', createdAt: '2021-01-01' },
//   { id: 2, title: '제목2', content: '내용2', createdAt: '2022-02-02' },
//   { id: 3, title: '제목3', content: '내용3', createdAt: '2023-03-03' },
//   { id: 4, title: '제목4', content: '내용4', createdAt: '2024-04-04' },
//   { id: 5, title: '제목5', content: '내용5', createdAt: '2025-05-05' },
// ];

export function getPosts(params) {
  return posts.get('/', { params });
}

export function getPostById(id) {
  return posts.get(`/${id}`);
}

export function createPost(data) {
  console.log('insret date : ', data);
  return posts.post('', data);
}
export function updatePost(id, data) {
  // return posts.put(`/${id}`, data);
  //console.log('update data:::', data);
  return posts.patch(`/${id}`, data);
}
export function deletePost(id) {
  console.log(id);
  return posts.delete(`/${id}`);
}
