import dayjs from 'dayjs';
// import { globalComponents } from '@/plugins/global-components';

export default {
  install(app) {
    app.config.globalProperties.$dayjs = dayjs;
    app.provide('dayjs', dayjs);
  },
};
