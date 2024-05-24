import { PostLoginReqDto } from '@app/modules/session/dtos/requests/post-login-req.dto';
import { PostCredentialsReqDto } from '@app/modules/session/dtos/requests/post-credentials-req.dto';
import { PostLoginResDto } from '@app/modules/session/dtos/responses/post-login-res.dto';
import { mockPasswordEncode } from '../../user/mocks/user-mock';

export const mockSalt = '1234567890' as string;
export const mockSecret = '1234567890' as string;

export const mockJwtValid =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywiaWF0IjoxNzEzMzYwMTI0LCJleHAiOjguNjRlKzY1fQ.eAAHP_kufAyxRL1txJ7MDIHmOr1h7ljEamEItfSL3_c' as string;
export const mockJwtExpired =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywiaWF0IjoxNzEzMzYwMzY2LCJleHAiOjE3MTMzNjAzNjZ9.zsRt1gDjJMRdmErKkFhpmsXRcSjmYCIitTOB_8XNGc0' as string;

export const mockGetCredentialsReq = {
  email: 'test@email.com',
  password: mockPasswordEncode,
} as PostLoginReqDto;

export const mockPostCredentialsReq = {
  name: 'Test',
  email: 'test@email.com',
  password: mockPasswordEncode,
  is_admin: true,
} as PostCredentialsReqDto;

export const mockGetCredentialsRes = {
  jwt: mockJwtValid,
} as PostLoginResDto;

export const mockValidRequest = {
  headers: {
    authorization: `Bearer ${mockJwtValid}`,
  },
} as Request | any;

export const mockEmptyRequest = {
  headers: {
    authorization: undefined,
  },
} as Request | any;

export const configMock = () => ({
  auth: {
    salt: mockSalt,
    secret: mockSecret,
  },
});
