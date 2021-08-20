import SignUpUser from './SignUpUser';

class Service {
  public static readonly nameService = 'AuthService';

  public signUpUser: SignUpUser['signUpUser'];

  constructor(SignUpUserService: SignUpUser) {
    this.signUpUser = SignUpUserService.signUpUser;
  }
}

export default new Service(new SignUpUser());
