import { askQuestion } from "../utils/waitForInput";
import { BinaryLike, CipherGCMTypes, createCipheriv, createDecipheriv, randomBytes, scrypt } from "crypto";

(async () => {
    const algorithm: CipherGCMTypes = "aes-192-gcm";
    const keyLength = 24;
    const encoding = "base64";
    const separator = "$$";

    const plainText = await askQuestion("중요한 정보를 입력하세요");
    const secret = await askQuestion("암호를 설정하세요");

    const cipherText = await encrypt(plainText, secret);
    console.log(`\n\nYour cipherText is:\n${cipherText}\n\n`);

    const confirmSecret = await askQuestion("암호를 입력하세요");
    const decryptedText = await decrypt(cipherText, confirmSecret);
    console.log(`\n\nSuccessful Decryption:\n${decryptedText}\n\n`);

    async function makePassword(secret: BinaryLike, salt: BinaryLike, length: number): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            scrypt(secret, salt, length, (err, derivedKey) => {
                if (err) return reject(err);
                return resolve(derivedKey);
            });
        });
    }

    async function encrypt(plainText: string, secret: string): Promise<string> {
        const salt = randomBytes(64);
        const password = await makePassword(secret, salt, keyLength);
        const iv = randomBytes(64);
        const cipher = createCipheriv(algorithm, password, iv);

        const encrypted = Buffer.concat([cipher.update(plainText), cipher.final()]);
        return makeCipherText(encrypted, salt, iv, cipher.getAuthTag());
    }

    async function decrypt(cipherText: string, secret: string): Promise<string> {
        const { encryptedData, salt, iv, tag } = parseCipherText(cipherText);
        const confirmPassword = await makePassword(secret, salt, keyLength);
        const decipher = createDecipheriv(algorithm, confirmPassword, iv);
        decipher.setAuthTag(tag);

        const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
        return decrypted.toString("utf8");
    }

    function makeCipherText(encryptedData: Buffer, salt: Buffer, iv: Buffer, tag: Buffer): string {
        return `${encryptedData.toString(encoding)}${separator}${salt.toString(encoding)}${separator}${iv.toString(encoding)}${separator}${tag.toString(encoding)}`;
    }

    function parseCipherText(cipherText: string): { encryptedData: Buffer; salt: Buffer; iv: Buffer; tag: Buffer } {
        const [encryptedData, salt, iv, tag] = cipherText.split(separator);
        return {
            encryptedData: Buffer.from(encryptedData, encoding),
            salt: Buffer.from(salt, encoding),
            iv: Buffer.from(iv, encoding),
            tag: Buffer.from(tag, encoding)
        };
    }
})();
