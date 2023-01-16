import { askQuestion } from "../utils/waitForInput";
import * as crypto from "crypto";

(async () => {
    const algorithm = "sha256";
    const encoding = "base64";

    let inputText = await askQuestion("정보를 입력하세요");
    console.log(`hash: ${hashInput(inputText)}`);

    inputText = await askQuestion("비교할 정보를 입력하세요");
    console.log(`hash: ${hashInput(inputText)}`);

    function hashInput(inputText: string): string {
        return crypto.createHash(algorithm).update(inputText).digest(encoding);
    }
})();