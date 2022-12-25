import { v4 } from "uuid";
import { genQuestionFile, printJSON } from "./utils/helper";
import { faker } from "@faker-js/faker";

const MEMBER_COUNT = 5;
const CHAT_LENGTH_PER_ROOM = 20;
const CHAT_ROOM_COUNT = 5;

type Message = {
    timestamp: number;
    chatRoomId: string;
    senderId: string;
    message: string;
}

(() => {
    const memberIds = new Array<string>();
    for (let i = 0; i < MEMBER_COUNT; i++) {
        memberIds.push(v4());
    }

    const messageHistory = new Array<Message>();
    for (let i = 0; i < CHAT_ROOM_COUNT; i++) {
        const chatRoomId = v4();
        const participantIds = faker.helpers.arrayElements(memberIds, faker.datatype.number({
            min: 2,
            max: MEMBER_COUNT
        }));

        for (let j = 0; j < CHAT_LENGTH_PER_ROOM; j++) {
            const timestamp = +(faker.date.recent(10));
            const senderId = faker.helpers.arrayElement(participantIds);
            const message = faker.lorem.sentence();

            messageHistory.push({
                timestamp,
                chatRoomId,
                senderId,
                message
            });
        }
    }

    genQuestionFile(__filename, messageHistory);
})();

