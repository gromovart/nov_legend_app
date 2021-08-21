import GetAll from './GetAll';

class Service {
  public static readonly nameService = 'MapService';

  public getAll: GetAll['getAll'];

  constructor(GetAllService: GetAll) {
    this.getAll = GetAllService.getAll;
  }
}

export default new Service(new GetAll());
