import axios from 'axios';
import { isRef, ref, unref, watchEffect } from 'vue';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const defaultConfig = {
  method: 'get',
};
const defaultOptions = { immediate: true };
export const useAxios = (url, config = {}, options = {}) => {
  const response = ref(null);
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const { onSuccess, onError, immediate } = { ...defaultOptions, ...options };

  // 넘어온 params는 ref함수로 선언한 반응형객체이므로 wrapping을 풀어주어야 한다.
  const { params } = config;
  const execute = body => {
    data.value = null;
    error.value = null;
    loading.value = true;
    //unref로 wrapping을 풀어준다.
    axios(unref(url), {
      ...defaultConfig,
      ...config,
      params: unref(params),
      data: typeof body === 'object' ? body : {},
    })
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

  if (isRef(params) || isRef(url)) {
    watchEffect(execute);
  } else {
    if (immediate) {
      execute();
    }
  }
  return {
    // aysnc, await를 안 기다려도 안되는 이유는 이미 반응형으로 연결되어 있기때문문
    response,
    data,
    error,
    loading,
    execute,
  };
};
