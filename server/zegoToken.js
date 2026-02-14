/**
 * Zego Token04 generator for server-side auth.
 * Based on ZEGOCLOUD/zego_server_assistant (Node.js).
 */
import crypto from 'crypto';

const ErrorCode = {
  success: 0,
  appIDInvalid: 1,
  userIDInvalid: 3,
  secretInvalid: 5,
  effectiveTimeInSecondsInvalid: 6,
};

function RndNum(a, b) {
  return Math.ceil((a + (b - a)) * Math.random());
}

function makeRandomIv() {
  const str = '0123456789abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += str.charAt(Math.floor(Math.random() * str.length));
  }
  return result;
}

function getAlgorithm(key) {
  switch (key.length) {
    case 16:
      return 'aes-128-cbc';
    case 24:
      return 'aes-192-cbc';
    case 32:
      return 'aes-256-cbc';
    default:
      throw new Error('Invalid key length: ' + key.length);
  }
}

function aesEncrypt(plainText, key, iv) {
  const cipher = crypto.createCipheriv(getAlgorithm(key), Buffer.from(key), Buffer.from(iv, 'utf8'));
  cipher.setAutoPadding(true);
  const encrypted = cipher.update(plainText, 'utf8');
  const final = cipher.final();
  return Buffer.concat([encrypted, final]);
}

/**
 * Generate Token04 for Zego UIKit.
 * @param {number} appId - Zego App ID
 * @param {string} userId - User ID
 * @param {string} secret - 32-byte Server Secret
 * @param {number} effectiveTimeInSeconds - Token TTL (e.g. 3600)
 * @param {string} payload - Optional payload (use '' for simple auth)
 * @returns {string} Token string
 */
export function generateToken04(appId, userId, secret, effectiveTimeInSeconds, payload = '') {
  if (!appId || typeof appId !== 'number') {
    throw Object.assign(new Error('appID invalid'), { errorCode: ErrorCode.appIDInvalid });
  }
  if (!userId || typeof userId !== 'string') {
    throw Object.assign(new Error('userId invalid'), { errorCode: ErrorCode.userIDInvalid });
  }
  if (!secret || typeof secret !== 'string' || secret.length !== 32) {
    throw Object.assign(new Error('secret must be a 32 byte string'), { errorCode: ErrorCode.secretInvalid });
  }
  if (typeof effectiveTimeInSeconds !== 'number' || effectiveTimeInSeconds <= 0) {
    throw Object.assign(new Error('effectiveTimeInSeconds invalid'), { errorCode: ErrorCode.effectiveTimeInSecondsInvalid });
  }

  const createTime = Math.floor(Date.now() / 1000);
  const tokenInfo = {
    app_id: appId,
    user_id: userId,
    nonce: RndNum(-2147483648, 2147483647),
    ctime: createTime,
    expire: createTime + effectiveTimeInSeconds,
    payload: payload || '',
  };

  const plainText = JSON.stringify(tokenInfo);
  const iv = makeRandomIv();
  const encryptBuf = aesEncrypt(plainText, secret, iv);

  const b1 = Buffer.allocUnsafe(8);
  const b2 = Buffer.allocUnsafe(2);
  const b3 = Buffer.allocUnsafe(2);
  b1.writeBigInt64BE(BigInt(tokenInfo.expire), 0);
  b2.writeUInt16BE(iv.length, 0);
  b3.writeUInt16BE(encryptBuf.length, 0);

  const buf = Buffer.concat([
    b1,
    b2,
    Buffer.from(iv, 'utf8'),
    b3,
    encryptBuf,
  ]);

  return '04' + buf.toString('base64');
}
