import { useAlertStore } from '@/stores/alert';
import { storeToRefs } from 'pinia';

/** composable 함수를 만들때 use+함수명으로 하는 것이 관계이다. */

export const useAlert = () => {
  const { alerts } = storeToRefs(useAlertStore());

  const { vAlert, vSuccess } = useAlertStore();
  return { alerts, vAlert, vSuccess };
};
