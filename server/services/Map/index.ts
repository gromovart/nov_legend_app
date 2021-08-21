import GetAllMapMarker from './GetAllMapMarker';
import GetAllMapCategory from './GetAllMapCategory';

class Service {
  public static readonly nameService = 'MapService';

  public GetAllMapMarker: GetAllMapMarker['getAllMapMarker'];

  public GetAllMapCategory: GetAllMapCategory['getAllMapCategory'];

  constructor(
    GetAllMapMarkerService: GetAllMapMarker,
    GetAllMapCategoryService: GetAllMapCategory
  ) {
    this.GetAllMapMarker = GetAllMapMarkerService.getAllMapMarker;
    this.GetAllMapCategory = GetAllMapCategoryService.getAllMapCategory;
  }
}

export default new Service(new GetAllMapMarker(), new GetAllMapCategory());
