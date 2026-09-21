export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  image: string;
  password?: string;
}

export interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}
