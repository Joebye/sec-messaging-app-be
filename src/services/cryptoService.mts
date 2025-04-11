import crypto from 'crypto';

// --- AES --- //
export const encryptAES = (text: string, key: Buffer, iv: Buffer): string => {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  return Buffer.concat([cipher.update(text), cipher.final()]).toString('base64');
};

export const decryptAES = (enc: string, key: Buffer, iv: Buffer): string => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  return Buffer.concat([decipher.update(Buffer.from(enc, 'base64')), decipher.final()]).toString();
};

// --- RSA --- //
export const generateRSAKeys = () => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
  });
  return { publicKey, privateKey };
};

export const rsaEncrypt = (publicKey: string, data: string): string => {
  return crypto.publicEncrypt(publicKey, Buffer.from(data)).toString('base64');
};

export const rsaDecrypt = (privateKey: string, enc: string): string => {
  return crypto.privateDecrypt(privateKey, Buffer.from(enc, 'base64')).toString();
};