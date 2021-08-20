import * as I from './Strategies/interfaces';
import AuthControllers from '.';

const authService: any = () => ({
  [I.Strategies.static]: async (request, token) => {
    return AuthControllers.authUser(request, token);
  },
});

export default authService;
