import * as crypto from "crypto";
import { askQuestion } from "../utils/waitForInput";

(async () => {
    const algorithm = "sha256";
    const encoding = "base64";

    const { publicKey, privateKey } = await generateKeyPair();

    const plainText = await askQuestion("보증할 메세지를 적어주세요");
    const signature = crypto.sign(algorithm, Buffer.from(plainText), privateKey);
    console.log(`Signature: ${signature.toString(encoding)}`);

    let isVerified = crypto.verify(algorithm, Buffer.from(plainText), publicKey, signature);
    console.log(isVerified ? "signature valid\n\n" : "signature invalid\n\n");

    const temperedMessage = await askQuestion("보증된 메세지를 변형해보세요");
    isVerified = crypto.verify(algorithm, Buffer.from(temperedMessage), publicKey, signature);
    console.log(isVerified ? "signature valid" : "signature invalid");

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
