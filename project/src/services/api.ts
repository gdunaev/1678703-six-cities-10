import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import {getToken} from './token';
import { BACKEND_URL, REQUEST_TIMEOUT } from '../const';
import {StatusCodes } from 'http-status-codes';
import {toast} from 'react-toastify';
import { store } from '../store/index';
import {setCommentLoadingStatus} from '../store/general-process/general-process';
import {APIRoute} from '../const';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && shouldDisplayError(error.response)) {

        const url = error.response.config.url;
        const commentUrl = APIRoute.CommentsOffer.replace('id', '');
        const method = error.response.config.method;

        if(url && url.includes(commentUrl) && method === 'post') {
          store.dispatch(setCommentLoadingStatus(false));
        }
        if(error.response.status !== StatusCodes.UNAUTHORIZED) {
          toast.warn(error.response.data.error);
        }
      }

      throw error;
    }
  );

  return api;
};
