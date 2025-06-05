import axios from 'axios';
import { isRef, ref, unref, watchEffect } from 'vue';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
const defaultConfig = {
  method: 'get',
};
export const useAxios = (url, config = {}, options = {}) => {
  const response = ref(null);
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);
  const { onSuccess, onError } = options;

  const { params } = config;
  const execute = () => {
    data.value = null;
    error.value = null;
    loading.value = true;

    axios(url, { ...defaultConfig, ...config, params: unref(params) })
      .then(res => {
        response.value = res;
        data.value = res.data;
        if (onSuccess) {
          onSuccess(res);
        }
      })
      .catch(err => {
        error.value = err;
        if (onError) {
          onError(err);
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };
  if (isRef(params)) {
    watchEffect(execute);
  } else {
    watchEffect(execute);
  }
  return {
    // aysnc, await를 안 기다려도 안되는 이유는 이미 반응형으로 연결되어 있기때문문
    response,
    data,
    error,
    loading,
  };
};
