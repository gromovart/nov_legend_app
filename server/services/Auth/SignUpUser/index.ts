type SignUpUserInterface = {
  payload: {
    firstName: string;
    lastName: string;
    middleName: string;
    login: string;
    password: string;
  };
  relations?: {};
};
export default class Service {
  public static readonly nameService = 'signUp';

  public signUpUser = async (
    params: any,
    requestMeta: any = {}
  ): Promise<Object | Error> => {
    console.log('signUpUser');
    return {};
  };
}
