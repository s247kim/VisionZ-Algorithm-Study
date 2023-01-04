import { input221222, Input221222, Output221222 } from "../Questions/221222_getChattingStat";
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
function getChattingStat(input: Input221222): Output221222 {
    // 1. Find the most talkative person overall
    const mostTalkativePersonOverall = {};
    input.forEach(({ senderId }) => {
        if (!mostTalkativePersonOverall[senderId]) mostTalkativePersonOverall[senderId] = 0;
        mostTalkativePersonOverall[senderId] += 1;
    });

    let overallMsgCount = 0;
    let mostTalkativePerson;
    for (const person in mostTalkativePersonOverall) {
        const currentPerson = person;
        const currentPersonMsgCount = mostTalkativePersonOverall[currentPerson];
        if (currentPersonMsgCount >= overallMsgCount) {
            overallMsgCount = currentPersonMsgCount;
            mostTalkativePerson = currentPerson;
        }
    }
    Output221222.mostTalkativePerson = mostTalkativePerson;

    // 2. Find the most talkative person in each room
    const msgsPerChatRoom = {};
    input.forEach(({ chatRoomId, senderId }) => {
        if (!msgsPerChatRoom[chatRoomId]) msgsPerChatRoom[chatRoomId] = {};
        if (!msgsPerChatRoom[chatRoomId][senderId]) msgsPerChatRoom[chatRoomId][senderId] = 0;
        msgsPerChatRoom[chatRoomId][senderId] += 1;
    });

    for (const room in msgsPerChatRoom) {
        let msgCount = 0;
        let mostTalkativeInRoom;
        for (const sender in msgsPerChatRoom[room]) {
            if (msgsPerChatRoom[room][sender] >= msgCount) {
                msgCount = msgsPerChatRoom[room][sender];
                mostTalkativeInRoom = sender;
            }
        }
        Output221222.mostTalkativeInRoom[room] = mostTalkativeInRoom;
    }

    // 3. Find the person participating in most chat room
    const participatingRooms = {};
    for (const chat in input) {
        const chatRoomId = input[chat].chatRoomId;
        const senderId = input[chat].senderId;

        if (!participatingRooms[senderId]) participatingRooms[senderId] = [chatRoomId];
        participatingRooms[senderId].push(chatRoomId);
    }

    const senderAppearanceInEachRoom = {};
    for (const sender in participatingRooms) {
        senderAppearanceInEachRoom[sender] = new Set(participatingRooms[sender]);
    }

    return Output221222;
}

console.log(getChattingStat(input221222));
