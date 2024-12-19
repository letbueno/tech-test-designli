export const useNotification = () => {
  function requestNotificationPermission() {
    if (Notification.permission === "granted") {
      return true;
    } else if (Notification.permission === "denied") {
      return false;
    } else {
      return new Promise((resolve) => {
        Notification.requestPermission().then((permission) => {
          resolve(permission === "granted");
        });
      });
    }
  }

  const showNotification = ({
    title,
    body,
  }: {
    title: string;
    body: string;
  }) => {
    if (requestNotificationPermission()) {
      new Notification(title, { body });
    }
  };

  return { showNotification, requestNotificationPermission };
};
