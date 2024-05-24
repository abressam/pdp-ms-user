import { PutUserReqDto } from '@app/modules/user/dtos/requests/put-user-req.dto';
import { DeleteUserResDto } from '@app/modules/user/dtos/responses/delete-user-res.dto';
import { GetUserResDto } from '@app/modules/user/dtos/responses/get-user-res.dto';
import { User } from '@app/modules/user/models/user.model';

export const mockUserId = 1;
export const mockPassword = 'abc';
export const mockIsAdmin = true;
export const mockPasswordEncode =
  'e5c994559c1ea11d6f6b217ada2cc66828a1643d9f179126a16c87104aadb4642ea5db4ba2a7be40beed0b93aaef58058cd4f7701f26a607da3d5abebf4ff45f';

export const mockUserReq = {
  userId: mockUserId,
} as Request | any;

export const mockPutUserReq = {
  name: 'Test',
  password: mockPassword,
} as PutUserReqDto;

export const mockDeleteUserRes = {
  statusCode: 200,
  message: 'User successfully deleted',
} as DeleteUserResDto;

export const mockGetUserRes = {
  user: {
    name: 'Test',
    email: 'test@email.com',
    is_admin: true,
  },
} as GetUserResDto | any;

export const mockUser = {
  id: mockUserId,
  name: 'Test',
  password: mockPasswordEncode,
  email: 'test@email.com',
  is_admin: true,
  dataValues: mockGetUserRes.user,
  destroy: () => {},
} as User;
