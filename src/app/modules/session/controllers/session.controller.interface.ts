import { GetUserResDto } from '@app/modules/user/dtos/responses/get-user-res.dto';
import { PostLoginResDto } from '@app/modules/session/dtos/responses/post-login-res.dto';
import { PostLoginReqDto } from '@app/modules/session/dtos/requests/post-login-req.dto';
import { PostCredentialsReqDto } from '@app/modules/session/dtos/requests/post-credentials-req.dto';

export interface SessionControllerInterface {
  postLogin(query: PostLoginReqDto): Promise<PostLoginResDto>;
  postCredentials(body: PostCredentialsReqDto): Promise<GetUserResDto>;
}
