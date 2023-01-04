import { input221222, Input221222, Output221222 } from "../Questions/221222_getChattingStat";

// Write a function to build a chat statistic.
// Find who is the most talkative person overall
// Find who is the most talkative person in each room
// Find who is participating in most chat room
// Time Complexity expectation: O(n)

type SenderId = string; // type alias
type ChatRoomId = string;

// public, protected, private -> access modifier

class ChatStat {
    private readonly chatCount = new Map<ChatRoomId | "All", Map<SenderId, number>>([["All", new Map()]]);
    private readonly chatRoomCount = new Map<SenderId, Set<ChatRoomId>>();

    private mostTalkativePerson: SenderId = "";
    private mostTalkativeInRoom: { [chatRoomId: ChatRoomId]: SenderId } = {};
    private mostBusyPerson: SenderId = "";

    public ingestStream(chatRoomId: ChatRoomId, senderId: SenderId): void {
        this.updateChatCount(chatRoomId, senderId);
        this.updateRoomCount(chatRoomId, senderId);
    }

    public getStat(): Output221222 {
        console.log(this.chatCount);
        console.log(this.chatRoomCount);
        return {
            mostTalkativePerson: this.mostTalkativePerson,
            mostTalkativeInRoom: this.mostTalkativeInRoom,
            mostBusyPerson: this.mostBusyPerson
        };
    }

    private getAllChatCounts(): Map<SenderId, number> {
        const allChats = this.chatCount.get("All") || new Map();
        if (!this.chatCount.has("All")) {
            this.chatCount.set("All", allChats);
        }
        return allChats;
    }

    private getRoomChatCounts(chatRoomId: ChatRoomId): Map<SenderId, number> {
        const roomChats = this.chatCount.get(chatRoomId) || new Map();
        if (!this.chatCount.has(chatRoomId)) {
            this.chatCount.set(chatRoomId, roomChats);
        }
        return roomChats;
    }

    private getRoomListForPerson(senderId: SenderId): Set<ChatRoomId> {
        const roomList = this.chatRoomCount.get(senderId) || new Set();
        if (!this.chatRoomCount.has(senderId)) {
            this.chatRoomCount.set(senderId, roomList);
        }
        return roomList;
    }

    private updateChatCount(chatRoomId: ChatRoomId, senderId: SenderId): void {
        const allChats = this.getAllChatCounts();
        const msgCountInAll = allChats.get(senderId) || 0;
        allChats.set(senderId, msgCountInAll + 1);

        this.compareTalkOverall(senderId);

        const roomChats = this.getRoomChatCounts(chatRoomId);
        const msgCountInRoom = roomChats.get(senderId) || 0;
        roomChats.set(senderId, msgCountInRoom + 1);

        this.compareTalkInRoom(chatRoomId, senderId);
    }

    private compareTalkOverall(senderId: SenderId): void {
        if (!this.mostTalkativePerson || this.mostTalkativePerson === senderId) {
            // first chat message or this is the most talkative person already
            this.mostTalkativePerson = senderId;
            return;
        }

        // compare the chat count with the currently most talkative person
        const allChats = this.getAllChatCounts();
        const chatCountForSender = allChats.get(senderId) || 0;
        const chatCountForCurrentBest = allChats.get(this.mostTalkativePerson) || 0;

        if (chatCountForSender > chatCountForCurrentBest) {
            this.mostTalkativePerson = senderId;
        }
    }

    private compareTalkInRoom(chatRoomId: ChatRoomId, senderId: SenderId): void {
        if (!this.mostTalkativeInRoom[chatRoomId] || this.mostTalkativeInRoom[chatRoomId] === senderId) {
            // first chat message for the room or this is the most talkative person in the room already
            this.mostTalkativeInRoom[chatRoomId] = senderId;
            return;
        }

        const chatsInRoom = this.getRoomChatCounts(chatRoomId);
        const chatCountForSender = chatsInRoom.get(senderId) || 0;
        const chatCountForCurrentBest = chatsInRoom.get(this.mostTalkativeInRoom[chatRoomId]) || 0;

        if (chatCountForSender > chatCountForCurrentBest) {
            this.mostTalkativeInRoom[chatRoomId] = senderId;
        }
    }

    private updateRoomCount(chatRoomId: ChatRoomId, senderId: SenderId): void {
        const roomList = this.getRoomListForPerson(senderId);
        roomList.add(chatRoomId);

        this.compareBusyPerson(senderId);
    }

    private compareBusyPerson(senderId: SenderId): void {
        if (!this.mostBusyPerson || this.mostBusyPerson === senderId) {
            // first chat message or this is the most busy person
            this.mostBusyPerson = senderId;
            return;
        }

        // compare the room count with the currently most busy person
        if (this.getRoomListForPerson(senderId).size > this.getRoomListForPerson(this.mostBusyPerson).size) {
            this.mostBusyPerson = senderId;
        }
    }
}

function getChattingStat(input: Input221222): Output221222 {
    const chatStat = new ChatStat();

    input.forEach(chatData => {
        const { chatRoomId, senderId } = chatData;
        chatStat.ingestStream(chatRoomId, senderId);
    });

    return chatStat.getStat();
}

console.log(getChattingStat(input221222));