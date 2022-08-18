
import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {dataProcess} from './data-process/data-process';
import {generalProcess} from './general-process/general-process';
import {userProcess} from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataProcess.reducer,
  [NameSpace.General]: generalProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});
