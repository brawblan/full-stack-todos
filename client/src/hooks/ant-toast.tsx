import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const useAntToast = () => {
  const [_, contextHolder] = notification.useNotification();

  const showNotification = (toastType: NotificationType, message: string, description?: string) => {
    notification[toastType as NotificationType]({
      message,
      description,
    });
  };

  return { showNotification, contextHolder };
};
