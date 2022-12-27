import * as fs from "fs/promises";
import * as path from "path";

const makePrettyJSON = (serializableData: any): string => JSON.stringify(serializableData, null, 4);
export const printJSON = (serializableData: any): void => {
    console.log(makePrettyJSON(serializableData));
};

export const genQuestionFile = async (filename: string, serializableData: any): Promise<void> => {
    const { name, dir, base } = path.parse(filename);

    const dateStr = name.slice(0, 6);
    const funcStr = name.slice(7);
    const content = `export const input${dateStr} = ${makePrettyJSON(serializableData)};
    \nexport type Input${dateStr} = typeof input${dateStr};\nexport type Output${dateStr} = any;
    \nfunction ${funcStr}(input: Input${dateStr}): Output${dateStr} {
    // Your code goes here
    return null as any;\n}\n`;

    await fs.writeFile(path.resolve(dir, "../", base), content);
};