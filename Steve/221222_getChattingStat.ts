import { input221222 } from "../Questions/221222_getChattingStat";

const Output221222 = {
    mostTalkativePerson: "",
    mostTalkativeInRoom: {},
    mostBusyPerson: "",
};

// Write a function to build a chat statistic.
// Find who is the most talkative person overall
// Find who is the most talkative person in each room
// Find who is participating in most chat room
// Time Complexity expectation: O(n)
function getChattingStat(input221222) {
    // 1. Find the most talkative person overall
    const mostTalkativePersonOverallMap = new Map();
    input221222.forEach(({ senderId }) => {
        if (!mostTalkativePersonOverallMap[senderId]) mostTalkativePersonOverallMap[senderId] = 1;

        mostTalkativePersonOverallMap[senderId] += 1;
    });

    let overallMsgCount = 0;
    let mostTalkativePerson;
    for (let person in mostTalkativePersonOverallMap) {
        let currentPerson = person;
        let currentPersonMsgCount = mostTalkativePersonOverallMap[currentPerson];
        if (currentPersonMsgCount > overallMsgCount) {
            overallMsgCount = currentPersonMsgCount;
            mostTalkativePerson = currentPerson;
        }
    }
    Output221222.mostTalkativePerson = mostTalkativePerson;

    // 2. Find the most talkative person in each room
    const msgsPerChatRoomMap = new Map();
    input221222.forEach(({ chatRoomId, senderId }) => {
        if (!msgsPerChatRoomMap[chatRoomId]) msgsPerChatRoomMap[chatRoomId] = new Map();

        if (!msgsPerChatRoomMap[chatRoomId][senderId]) {
            msgsPerChatRoomMap[chatRoomId][senderId] = 1;
        }
        msgsPerChatRoomMap[chatRoomId][senderId] += 1;
    });

    for (let room in msgsPerChatRoomMap) {
        Output221222.mostTalkativeInRoom[room] = "";
        let keys = Object.keys(msgsPerChatRoomMap[room]);
    }

    // 3. Find the person participating in most chat room
    const participatingRooms = new Map();
    for (let chat in input221222) {
        let chatRoomId = input221222[chat].chatRoomId;
        let senderId = input221222[chat].senderId;

        if (!participatingRooms[senderId]) participatingRooms[senderId] = [chatRoomId];
        participatingRooms[senderId].push(chatRoomId);
    }

    const senderAppearanceInEachRoom = new Map();
    for (let sender in participatingRooms) {
        senderAppearanceInEachRoom[sender] = new Set(participatingRooms[sender]);
    }

    return Output221222;
}

console.log(getChattingStat(input221222));
