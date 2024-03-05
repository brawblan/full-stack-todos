import { Link, redirect } from '@tanstack/react-router';
import { useAntToast } from '../hooks/ant-toast';
import { useAuthStore } from '../store/auth';

function LogoutBtn() {
  const [logout] = useAuthStore((state) => [state.logout]);
  const { showNotification } = useAntToast();

  const handleAuth = async () => {
    if (useAuthStore.getState().authBtn === 'Login') {
      redirect({
        replace: true,
        to: '/login',
      });
    } else {
      logout().then((response) => {
        if (!response.ok) {
          showNotification('error', 'Error', response?.error?.message);
        }

        useAuthStore.getState().authBtn = 'Login';
      });
    }

  };

  return (
    <Link onClick={handleAuth} to="/">
      {useAuthStore.getState().authBtn}
    </Link>
  );
}

export default LogoutBtn;