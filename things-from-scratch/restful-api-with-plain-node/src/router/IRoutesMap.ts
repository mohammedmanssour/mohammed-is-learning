import IMethod from './IMethod';
import Route from './Route';

type IRoutesMap = {
  GET?: Route[];
  HEAD?: Route[];
  POST?: Route[];
  PUT?: Route[];
  PATCH?: Route[];
  DELETE?: Route[];
};

export default IRoutesMap;
