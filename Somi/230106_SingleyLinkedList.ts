interface ISinglyLinkedListNode<T> {
    /**
     * Get the node located at the specified hop away from this node
     *
     * Return the next node if the hop is not provided (default is 1)
     * Return undefined if reached the end of the list
     * Time Complexity: O(n) where n is hop
     */
    getNext(hop?: number): SinglyLinkedListNode<T> | undefined;

    /**
     * Insert a new node after this node, and return the inserted node
     *
     * Time Complexity: O(1)
     */
    insertNext(value: T): SinglyLinkedListNode<T>;

    /**
     * Delete next node(s), and return itself for further chaining
     *
     * Delete the next node only if count is not provided (default is 1)
     * Time Complexity: O(n) when n is count
     */
    deleteNext(count?: number): SinglyLinkedListNode<T>;

    /**
     * Update the value and return itself for further chaining
     */
    updateValue(value: T): SinglyLinkedListNode<T>;

    get value(): T;
}

class SinglyLinkedListNode<T> implements ISinglyLinkedListNode<T> {
    private m_value: T;
    private next: SinglyLinkedListNode<T> | undefined;

    constructor(value: T, next?: SinglyLinkedListNode<T>) {
        this.m_value = value;
        this.next = next;
    }

    getNext(hop?: number): SinglyLinkedListNode<T> | undefined {
        if (hop == undefined) {
            return this.next;
        }
        let currentNode: SinglyLinkedListNode<T> | undefined = this;
        while (hop > 0) {
            currentNode = currentNode?.next;
            hop--;
        }
        return currentNode;
    }

    insertNext(value: T): SinglyLinkedListNode<T> {
        let currentNode: SinglyLinkedListNode<T> | undefined = this;
        let newNode: SinglyLinkedListNode<T> | undefined = new SinglyLinkedListNode(value);
        newNode.next = currentNode.next; // newNode를 currentNode의 next와 연결
        currentNode.next = newNode; // next를 가리키던 currentNode를 newNode를 가리키게 하면서 current-new-next로 삽입이 일어남
        return newNode;
    }

    updateValue(value: T): SinglyLinkedListNode<T> {
        this.m_value = value;
        return this;
    }

    deleteNext(count?: number): SinglyLinkedListNode<T> {
        let currentNode: SinglyLinkedListNode<T> | undefined = this;

        if (!count) {
            currentNode.next = currentNode.next?.next;
        }
        currentNode.next = this.getNext(count)?.next;
        return currentNode;
    }

    get value(): T {
        // get은 value() 함수로 클래스 밖에서 private인 m_value도 dot notation으로 접근할 수 있게 해줌
        return this.m_value;
    }
}

interface ISinglyLinkedList<T> {
    /**
     * Return the node at specified index.
     *
     * Return undefined if not found
     */
    getNode(index: number): SinglyLinkedListNode<T> | undefined;

    /**
     * Insert a node at index 0
     */
    insertFirst(value: T): SinglyLinkedListNode<T>;

    /**
     * Prints the linked list similar to console.log an Array
     */
    print(): void;
}

class SinglyLinkedList<T> implements ISinglyLinkedList<T> {
    private head?: SinglyLinkedListNode<T>;

    // constructor(head: SinglyLinkedListNode<T>) {
    //     this.head = head;
    // }

    static fromArray<A>(source: Array<A>): SinglyLinkedList<A> {
        let list = new SinglyLinkedList<A>();
        let lastNode = list.head; // undefined, for loop 안에 변화를 감지하려면 loop를 통해 그 바깥의 variable을 업데이트 해주기
        for (const value of source) {
            if (!list.head) {
                let node = new SinglyLinkedListNode(value);
                list.head = node;
                lastNode = node; // variable 업데이트
            } else {
                lastNode = lastNode?.insertNext(value); // variable 업데이트
            }
        }
        return list;
    }

    getNode(index: number): SinglyLinkedListNode<T> | undefined {
        return this.head?.getNext(index);
    }

    insertFirst(value: T): SinglyLinkedListNode<T> {
        let oldHead = this.head;
        let newHead = new SinglyLinkedListNode(value, oldHead);
        this.head = newHead;
        return newHead;
    }

    print(): void {
        // console.log("-- " + this.head?.value);
        // console.log("second: " + this.head?.getNext()?.value);
        // console.log("third: " + this.head?.getNext()?.getNext()?.value);

        let output = new Array<T>(); // 여기 그냥 빈 배열 넣으면 타입에러 뜸
        let currentNode = this.head;
        while (currentNode) {
            output.push(currentNode.value);
            currentNode = currentNode.getNext();
        }
        console.log(output);
    }
}

function testLinkedList() {
    const LL1 = new SinglyLinkedList<number>();
    console.log(LL1.getNode(0)); // undefined

    LL1.insertFirst(5);
    console.log(LL1.getNode(0)); // 5
    const LL1_Last = LL1.getNode(0)?.insertNext(6).insertNext(7).insertNext(8);
    LL1.print(); // [5,6,7,8]

    LL1_Last?.updateValue(50);
    LL1.print(); // [5,6,7,50]

    const LL1_index1 = LL1.getNode(1);
    console.log(LL1_index1?.getNext()?.value); // 7
    console.log(LL1_index1?.getNext(2)?.value); // 50
    console.log(LL1_index1?.getNext(3)?.value); // undefined

    const LL2 = SinglyLinkedList.fromArray([7, 4, 3, 2]);
    LL2.print(); // [7,4,3,2]
}
testLinkedList();
