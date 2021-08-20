import SignUpUser from './SignUpUser';
import AuthUser from './AuthUser';
import SignIn from './SignIn';

class Service {
  public static readonly nameService = 'AuthService';

  public signUpUser: SignUpUser['signUpUser'];

  public authUser: AuthUser['authUser'];

  public signIn: SignIn['signIn'];

  constructor(
    SignUpUserService: SignUpUser,
    AuthUserService: AuthUser,
    SignInService: SignIn
  ) {
    this.signUpUser = SignUpUserService.signUpUser;
    this.authUser = AuthUserService.authUser;
    this.signIn = SignInService.signIn;
  }
}

export default new Service(new SignUpUser(), new AuthUser(), new SignIn());
