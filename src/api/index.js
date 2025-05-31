import axios from 'axios';

function create(baseURL, options) {
  const instance = axios.create(
    Object.assign({
      baseURL: baseURL,
      options,
    }),
  );
  // const instance = axios.create({
  //   baseURL: baseURL,
  //   ...options,
  // });
  return instance;
}

export const posts = create(`${import.meta.env.VITE_APP_API_URL}posts`);
// export const posts = create('http://localhost:5000/po÷sts');
// development http://localhost:5000/posts
// prd: http://localhost:5000/posts
