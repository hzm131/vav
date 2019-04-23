import request from '@/utils/request';

const baseUrl = '/server';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function Login(params) {
  return request(`${baseUrl}/api/v1/login`, {
    method: 'POST',
    body: params,
  });
}
