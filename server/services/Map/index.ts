import GetAllMapMarker from './GetAllMapMarker';

class Service {
  public static readonly nameService = 'MapService';

  public GetAllMapMarker: GetAllMapMarker['getAllMapMarker'];

  constructor(GetAllService: GetAllMapMarker) {
    this.GetAllMapMarker = GetAllService.getAllMapMarker;
  }
}

export default new Service(new GetAllMapMarker());
