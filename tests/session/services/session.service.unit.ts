import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { SessionService } from '@app/modules/session/services/session.service';
import { mockUser } from '../../user/mocks/user-mock';
import {
  mockGetCredentialsReq,
  mockPostCredentialsReq,
} from '../mocks/session-mock';
import { User } from '@app/modules/user/models/user.model';

describe('SessionService', () => {
  let sessionService: SessionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          ignoreEnvVars: true,
          ignoreEnvFile: true,
          load: [
            () => ({
              auth: {
                salt: '',
              },
            }),
          ],
        }),
      ],
      providers: [
        SessionService,
        {
          provide: getModelToken(User),
          useValue: {
            findByPk: jest.fn((userId) => {
              return userId ? mockUser : false;
            }),
            findOne: jest.fn(async ({ where }) => {
              return where.email ? mockUser : false;
            }),
            findOrCreate: jest.fn(async ({ where }) => {
              return where.email ? [mockUser, true] : [mockUser, false];
            }),
          },
        },
      ],
    }).compile();

    sessionService = moduleRef.get(SessionService);
  });

  describe('postLogin', () => {
    it('should throw an invalid secret key', async () => {
      await sessionService.postLogin(mockGetCredentialsReq).catch((error) => {
        expect(error.message).toBe('secretOrPrivateKey must have a value');
      });
    });

    it('should throw an invalid session', async () => {
      mockGetCredentialsReq.email = null;
      await sessionService.postLogin(mockGetCredentialsReq).catch((error) => {
        expect(error.message).toBe('Invalid session');
      });
    });

    it('should throw an error', async () => {
      await sessionService.postLogin(undefined).catch((error) => {
        expect(error.message).toBeTruthy();
      });
    });
  });

  describe('postCredentials', () => {
    it('should throw an invalid user', async () => {
      await sessionService
        .postCredentials(mockPostCredentialsReq)
        .catch((error) => {
          expect(error.message).toBe('User already exists');
        });
    });

    it('should throw an error', async () => {
      mockPostCredentialsReq.email = null;
      await sessionService
        .postCredentials(mockPostCredentialsReq)
        .catch((error) => {
          expect(error.message).toBeTruthy();
        });
    });
  });
});
