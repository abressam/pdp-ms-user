import {
  getJsonWebToken,
  checkJsonWebToken,
  encodePassword,
} from '@app/modules/session/utils/session.util';
import {
  mockUserId,
  mockPassword,
  mockIsAdmin,
  mockPasswordEncode,
} from '../../user/mocks/user-mock';
import {
  mockSecret,
  mockSalt,
  mockJwtValid,
  mockJwtExpired,
} from '../mocks/session-mock';

describe('SessionUtil', () => {
  describe('getJsonWebToken', () => {
    it('should return success', () => {
      const jwt = getJsonWebToken(mockUserId, mockIsAdmin, mockSecret);
      expect(jwt.split('.')).toHaveLength(3);
    });
  });

  describe('checkJsonWebToken', () => {
    it('should return success', () => {
      const isValid = checkJsonWebToken(mockJwtValid, mockSecret);
      expect(isValid).toBeTruthy();
    });

    it('should throw an error', () => {
      expect(() => checkJsonWebToken(mockJwtExpired, mockSecret)).toThrowError(
        'jwt expired',
      );
    });
  });

  describe('encodePassword', () => {
    it('should return success', () => {
      const password = encodePassword(mockPassword, mockSalt);
      expect(password).toBe(mockPasswordEncode);
    });
  });
});
