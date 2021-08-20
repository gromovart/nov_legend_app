type SignInUserInterface = {
  payload: {
    login: string;
    password: string;
  };
  relations?: {};
};
export default class Service {
  public static readonly nameService = 'SignIn';

  public signIn = async (
    params: any,
    requestMeta: any = {}
  ): Promise<Object | Error> => {
    console.log('SignIn');
    return {};
  };
}
