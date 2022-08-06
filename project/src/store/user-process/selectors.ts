import {NameSpace} from '../../const';
import {State, AuthorizationType} from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationType => state[NameSpace.User].authorizationStatus;
