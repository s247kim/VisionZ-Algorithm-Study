import * as crypto from "crypto";
import { askQuestion } from "../utils/waitForInput";

(async () => {
    const encoding = "base64";

    const { publicKey, privateKey } = await generateKeyPair();
    console.log(publicKey.export({ type: "pkcs1", format: "pem" }).toString(encoding));
    console.log(privateKey.export({ type: "pkcs1", format: "pem" }).toString(encoding));

    const plainText = await askQuestion("중요한 정보를 입력하세요");
    const cipherText = crypto.publicEncrypt(publicKey, Buffer.from(plainText));
    console.log(`CipherText: ${cipherText.toString(encoding)}`);

    const decryptedText = crypto.privateDecrypt(privateKey, cipherText);
    console.log(`Successful Decrypt: ${decryptedText.toString()}`);

    function generateKeyPair(): Promise<{ publicKey: crypto.KeyObject, privateKey: crypto.KeyObject }> {
        return new Promise((resolve, reject) => {
            crypto.generateKeyPair("rsa", { modulusLength: 2048 },
                (err, publicKey, privateKey) => {
                    if (err) return reject(err);
                    return resolve({ publicKey, privateKey });
                }
            );
        });
    }
})();
