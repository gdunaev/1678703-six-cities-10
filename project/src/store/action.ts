import {createAction} from '@reduxjs/toolkit';
import { ActionType } from '../const';


export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (value) => ({
  payload: value,
}));


