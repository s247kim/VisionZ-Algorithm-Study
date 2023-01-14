import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

export async function askQuestion(question: string): Promise<string> {
    const answer = await rl.question(`Q. ${question}: `);
    rl.pause();
    return answer;
}