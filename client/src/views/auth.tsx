import { Link, useRouter } from '@tanstack/react-router';
import { useAuthStore } from '../store/auth';

function AuthView() {
  const [login] = useAuthStore((state) => [state.login]);
  const router = useRouter();

  const handleLogin = () => {
    login('brawblan');
    router.invalidate();
  };

  return (
    <>
      <div>AuthView</div>
      <Link onClick={handleLogin} to="/todos">
        <button type="button">
          Login
        </button>
      </Link>
    </>

  );
}

export default AuthView;