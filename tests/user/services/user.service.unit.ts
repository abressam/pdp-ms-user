import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { UserService } from '@app/modules/user/services/user.service';
import {
  mockUser,
  mockUserId,
  mockPutUserReq,
  mockDeleteUserRes,
  mockGetUserRes,
} from '../mocks/user-mock';
import { mockSecret } from '../../session/mocks/session-mock';
import { User } from '@app/modules/user/models/user.model';

describe('UserService', () => {
  let userService: UserService;
  let configService: ConfigService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        UserService,
        {
          provide: getModelToken(User),
          useValue: {
            findByPk: jest.fn((userId) => {
              return userId ? mockUser : false;
            }),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    configService = moduleRef.get(ConfigService);
    userService = moduleRef.get(UserService);
  });

  describe('getUser', () => {
    it('should return success', async () => {
      const { user } = await userService.getUser(mockUserId);

      expect(user).toStrictEqual(mockUser);
    });
  });

  describe('putUser', () => {
    it('should return success', async () => {
      jest.spyOn(configService, 'get').mockReturnValueOnce(mockSecret);

      expect(
        await userService.putUser(mockUserId, mockPutUserReq),
      ).toStrictEqual(mockGetUserRes);
    });

    it('should throw an error', async () => {
      jest.spyOn(configService, 'get').mockReturnValueOnce(mockSecret);

      await userService.putUser(undefined, undefined).catch((error) => {
        expect(error.message).toBe('No user found');
      });
    });
  });

  describe('deleteUser', () => {
    it('should return success', async () => {
      expect(await userService.deleteUser(mockUserId)).toStrictEqual(
        mockDeleteUserRes,
      );
    });
  });
});
