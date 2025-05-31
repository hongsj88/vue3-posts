import { ref } from 'vue';

/** composable 함수를 만들때 use+함수명으로 하는 것이 관계이다. */
const alerts = ref([]);
export function useAlert() {
  const vAlert = (message, type = 'error') => {
    alerts.value.push({ message, type });

    setTimeout(() => {
      alerts.value.shift();
    }, 2000);
  };
  const vSuccess = message => vAlert(message, 'success');

  return { alerts, vAlert, vSuccess };
}
