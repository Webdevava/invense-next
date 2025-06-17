import { api } from './api';

interface LoginPayload {
  username: string;
  password: string;
}

interface SignupPayload extends LoginPayload {
  name: string;
}

interface User {
  _id: string;
  name: string;
  is_superadmin?: boolean;
  projectRoles: unknown[];
  __v: number;
}

interface LoginResponse {
  api_version: string;
  item: {
    user: User;
    jwtToken: string;
  };
  kind: string;
  message: string;
}

interface SignupResponse {
  api_version: string;
  item: User | string;
  kind: string;
  message: string;
}

export const AuthService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const res = await api.post<LoginResponse>('/v1/user/login/', payload);

    const { jwtToken, user } = res.data.item;

    localStorage.setItem('accessToken', jwtToken);
    localStorage.setItem('user', JSON.stringify(user));

    return res.data;
  },

  signup: async (payload: SignupPayload): Promise<SignupResponse> => {
    const res = await api.post<SignupResponse>('/v1/user/signup/', payload);

    // If signup is successful, you might want to log the user in automatically
    if (typeof res.data.item !== 'string') {
      localStorage.setItem('user', JSON.stringify(res.data.item));
    }

    return res.data;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  },

  getToken: () => {
    return localStorage.getItem('accessToken');
  },

  getUser: (): User | null => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  },
};
