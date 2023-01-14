import { askQuestion } from "../utils/waitForInput";
import { BinaryLike, createCipheriv, randomBytes, scrypt } from "crypto";

(async () => {
    const plainText = await askQuestion("중요한 정보를 입력하세요");
    const secret = await askQuestion("암호를 설정하세요");

    const salt = randomBytes(64);
    const password = await makePassword(secret, salt, 24);
    const iv = randomBytes(64);

    const cipherText = encrypt(plainText, password, iv);
    console.log(`\n\nYour cipherText is:\n${cipherText}\n\n`);
})();

async function makePassword(secret: BinaryLike, salt: BinaryLike, length: number): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        scrypt(secret, salt, length, (err, derivedKey) => {
            if (err) return reject(err);
            return resolve(derivedKey);
        });
    });
}

function encrypt(plainText: string, password: BinaryLike, iv: BinaryLike): string {
    const cipher = createCipheriv("aes-192-gcm", password, iv);

    let encrypted = cipher.update(plainText, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}


