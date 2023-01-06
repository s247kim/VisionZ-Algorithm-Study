import { input221222, Input221222, Output221222 } from "../Questions/221222_getChattingStat";

// Write a function to build a chat statistic.
// Find who is the most talkative person overall
// Find who is the most talkative person in each room
// Find who is participating in most chat room
// Time Complexity expectation: O(n)

type SenderId = string; //* type alias, mostTalkativePerson이나 mostBusyPerson의 타입 지정을 string 대신에 alias인 SenderId로 지정하면 그 안에 할당될 값이 sender의 id임이 더 직관적으로 다가옴
type ChatRoomId = string;

// public, protected, private -> access modifier
//* public 은 클라스의 외부에서 접근 가능
//* private 은 클라스 내에서만 접근 가능, 클라스의 외부에서 접근 불가능
//* protected 는 클라스 내부, 그리고 상속받은 자식 클라스에서 접근 가능

class ChatStat {
    //* chatCount는 update가 불가하고 읽어오기만 할 수 있음. chatCount의 key로 |(pipeline)을 통해 ChatRoomId나 모든 챗이 다 들어가는 All 이 들어갈 수 있음.
    //* chatCount의 value로는 SenderId(string 타입)를 key로 가지고 number를 value로 가지는 맵이 들어감
    //* new Map<type, type>() --> 빈 소괄호만 오면 empty map이고
    //* new Map<type, type>([[keyN, valueN]]) --> 소괄호 안에 중첩배열 형태가 오면 initialized map 임
    private readonly chatCount = new Map<ChatRoomId | "All", Map<SenderId, number>>([["All", new Map()]]);

    //* chatRoomCount는 SenderId(string 타입)를 key로 가지고 ChatRoomId(string 타입)로 이루어진 Set을 value로 가지는 맵임
    private readonly chatRoomCount = new Map<SenderId, Set<ChatRoomId>>();

    private mostTalkativePerson: SenderId = "";
    private mostTalkativeInRoom: { [chatRoomId: ChatRoomId]: SenderId } = {};
    private mostBusyPerson: SenderId = "";

    //* ingestStream는 string 타입의 chatRoomId와 senderId라는 parameter를 받고 리턴 값은 없는(void) 함수임, 안에서 2개의 함수를 호출함
    public ingestStream(chatRoomId: ChatRoomId, senderId: SenderId): void {
        this.updateChatCount(chatRoomId, senderId);
        this.updateRoomCount(chatRoomId, senderId);
    }

    //* getStat 함수가 호출되면 리턴값의 형태는 41-43번째 줄 같이 Output221222의 형태여야 함
    public getStat(): Output221222 {
        console.log(this.chatCount);
        console.log(this.chatRoomCount);
        return {
            mostTalkativePerson: this.mostTalkativePerson,
            mostTalkativeInRoom: this.mostTalkativeInRoom,
            mostBusyPerson: this.mostBusyPerson,
        };
    }
    //* getAllChatCounts는 리턴값으로 SenderId와 number를 페어로 가진 맵을 가짐
    private getAllChatCounts(): Map<SenderId, number> {
        //* allChats에는 chatCount 맵에서 키가 All인 맵의 value를 가져와서 할당, 없으면 new Map 할당 (근데 21번째 줄에서 이미 All 넣고 initialize해서 무조건 있는 거 아님?)
        const allChats = this.chatCount.get("All") || new Map();

        if (!this.chatCount.has("All")) {
            //* chatCount 맵에 All이 없으면 All 과 allChats를 key와 value로 가지는 짝을 set 함
            this.chatCount.set("All", allChats);
        }
        return allChats;
    }

    //* getRoomChatCounts 는 chatRoomId를 param으로 받아서 SenderId와 number 페어의 맵(roomChats)을 리턴하는 함수
    private getRoomChatCounts(chatRoomId: ChatRoomId): Map<SenderId, number> {
        const roomChats = this.chatCount.get(chatRoomId) || new Map();
        if (!this.chatCount.has(chatRoomId)) {
            //* chatCount 맵에 chatRoomId가 없으면 chatRoomId를 key로 roomChats 맵을 value로 set 함. chatCount 맵은 계속 업데이트 되고 있음
            this.chatCount.set(chatRoomId, roomChats);
        }
        return roomChats;
    }

    //* senderId를 param으로 받아 ChatRoomId Set를 리턴하는 함수. 나중에 이 세트의 사이즈로 busiest person을 찾아낼 수 있겠음
    private getRoomListForPerson(senderId: SenderId): Set<ChatRoomId> {
        const roomList = this.chatRoomCount.get(senderId) || new Set();
        if (!this.chatRoomCount.has(senderId)) {
            this.chatRoomCount.set(senderId, roomList);
        }
        return roomList;
    }

    private updateChatCount(chatRoomId: ChatRoomId, senderId: SenderId): void {
        //* senderId와 채팅의 수로 이루어진 맵
        const allChats = this.getAllChatCounts();
        //* msgCountInAll에는 allChats 안의 senderId의 value, 없으면 0을 할당
        const msgCountInAll = allChats.get(senderId) || 0;
        //* senderId의 msgCountInAll 1 증가
        allChats.set(senderId, msgCountInAll + 1);

        //* compareTalkOverall 함수를 불러서 mostTalkativePerson을 업데이트
        this.compareTalkOverall(senderId);

        //* SenderId와 채팅의 수로 이루어진 맵
        const roomChats = this.getRoomChatCounts(chatRoomId);
        //* msgCountInRoom에는 roomChats 안의 senderId의 value, 없으면 0을 할당
        const msgCountInRoom = roomChats.get(senderId) || 0;
        //* senderId의 msgCountInRoom 1 증가
        roomChats.set(senderId, msgCountInRoom + 1);

        //* compareTalkInRoom 함수를 불러서 mostTalkativeInRoom을 업데이트
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
        //* senderId가 참여한 chatRoomId를 모으는 Set
        const roomList = this.getRoomListForPerson(senderId);
        //*새로 받은 chatRoomId추가
        roomList.add(chatRoomId);
        //* compareBusyPerson 함수를 불러서 mostBusyPerson의 세트 사이즈와 senderId의 세트 사이즈를 비교해 mostBusyPerson을 업데이트
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
    const chatStat = new ChatStat(); //* ChatStat 클래스의 인스턴스를 만듦

    input.forEach((chatData) => {
        //* chatData 받아온 거 구조분해할당해서 chatRoomId, senderId 뽑아내서
        const { chatRoomId, senderId } = chatData;
        //* chatStat의 메소드인 ingestStream에 전달하면 함수가 우르르 불림
        chatStat.ingestStream(chatRoomId, senderId);
    });

    return chatStat.getStat(); //* forEach 다 돌면 Output221222의 형태로 값 리턴
}

console.log(getChattingStat(input221222));
