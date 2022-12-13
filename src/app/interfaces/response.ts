import { Page } from '../models/forms-data/page';
/* eslint-disable @typescript-eslint/naming-convention */
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface ApiResponsePaginate<T> {
  success: boolean;
  message?: string;
  data?: Paginate<T>;
}
export interface Paginate<T>{
  current_page: number;
  data: T;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}
