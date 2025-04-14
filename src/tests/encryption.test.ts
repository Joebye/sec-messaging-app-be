import { describe, it, expect } from 'vitest';
import crypto from 'crypto';

const AES_KEY = crypto.randomBytes(32);
const IV = crypto.randomBytes(16);

function encrypt(text: string) {
  const cipher = crypto.createCipheriv('aes-256-cbc', AES_KEY, IV);
  return Buffer.concat([cipher.update(text), cipher.final()]);
}

function decrypt(encrypted: Buffer) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', AES_KEY, IV);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString();
}

describe('AES Encryption/Decryption', () => {
  it('should encrypt and decrypt a message correctly', () => {
    const plain = 'hello world';
    const encrypted = encrypt(plain);
    const decrypted = decrypt(encrypted);
    expect(decrypted).toBe(plain);
  });
});