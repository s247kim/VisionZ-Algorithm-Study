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

    deleteNext(count?: number): SinglyLinkedListNode<T> {

    }

    getNext(hop?: number): SinglyLinkedListNode<T> | undefined {

    }

    insertNext(value: T): SinglyLinkedListNode<T> {

    }

    updateValue(value: T): SinglyLinkedListNode<T> {

    }

    get value(): T {
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

    static fromArray<A>(source: Array<A>): SinglyLinkedList<A> {

    }

    getNode(index: number): SinglyLinkedListNode<T> | undefined {

    }

    insertFirst(value: T): SinglyLinkedListNode<T> {

    }

    print(): void {

    }
}

function testLinkedList() {
    const LL1 = new SinglyLinkedList<number>();
    console.log(LL1.getNode(0));                        // undefined

    LL1.insertFirst(5);
    const LL1_Last = LL1.getNode(0)?.insertNext(6)
        .insertNext(7)
        .insertNext(8);
    LL1.print();                                              // [5,6,7,8]

    LL1_Last?.updateValue(50);
    LL1.print();                                              // [5,6,7,50]

    const LL1_index1 = LL1.getNode(1);
    console.log(LL1_index1?.getNext()?.value);                // 7
    console.log(LL1_index1?.getNext(2)?.value);          // 50
    console.log(LL1_index1?.getNext(3)?.value);          // undefined

    const LL2 = SinglyLinkedList.fromArray([7, 4, 3, 2]);
    LL2.print();                                              // [7,4,3,2]
}