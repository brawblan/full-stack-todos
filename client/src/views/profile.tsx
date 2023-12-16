import { FileRoute, Link } from '@tanstack/react-router';
import { useAuthStore } from '../store/auth';

export const Route = new FileRoute('/profile').createRoute({
  component: ProfileView,
});

function ProfileView() {
  const [logout] = useAuthStore((state) => [state.logout]);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div>ProfileView</div>
      <Link onClick={handleLogout} to="/todos">
        <button type="button">
          Logout
        </button>
      </Link>
    </>
  );
}

export default ProfileView;