import { FileRoute } from '@tanstack/react-router';
import { checkUserAndRedirect } from '../utilities/user';

export const Route = new FileRoute('/').createRoute({
  beforeLoad: () => checkUserAndRedirect('/todos'),
});
