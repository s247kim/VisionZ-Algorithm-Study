import { ISinglyLinkedList, ISinglyLinkedListNode } from "../Questions/230106_SingleyLinkedList";

class SinglyLinkedListNodeSolution<T> implements ISinglyLinkedListNode<T> {
    private m_value: T;
    private next: ISinglyLinkedListNode<T> | undefined;

    constructor(value: T, next?: ISinglyLinkedListNode<T>) {
        this.m_value = value;
        this.next = next;
    }

    getNext(hop?: number): ISinglyLinkedListNode<T> | undefined {
        if (hop === 0) return this;
        if (!hop || hop === 1) return this.next;

        let node = this.next;
        for (let i = 0; i < hop - 1; i++) {
            if (!node) return undefined;
            node = node.getNext();
        }

        return node;
    }

    deleteNext(count?: number): ISinglyLinkedListNode<T> {
        if (count === 0) return this;
        if (!count) count = 1;

        this.next = this.getNext(count + 1);
        return this;
    }

    insertNext(value: T): ISinglyLinkedListNode<T> {
        this.next = new SinglyLinkedListNodeSolution(value, this.next);
        return this.next;
    }

    updateValue(value: T): ISinglyLinkedListNode<T> {
        this.m_value = value;
        return this;
    }

    get value(): T {
        return this.m_value;
    }
}

class SinglyLinkedListSolution<T> implements ISinglyLinkedList<T> {
    private head?: ISinglyLinkedListNode<T>;

    static fromArray<A>(source: Array<A>): ISinglyLinkedList<A> {
        const list = new SinglyLinkedListSolution<A>();
        if (!source.length) return list;

        let node = list.insertFirst(source[0]);
        for (let i = 1; i < source.length; i++) {
            node = node.insertNext(source[i]);
        }

        return list;
    }

    getNode(index: number): ISinglyLinkedListNode<T> | undefined {
        if (!this.head) return undefined;
        return this.head.getNext(index);
    }

    insertFirst(value: T): ISinglyLinkedListNode<T> {
        this.head = new SinglyLinkedListNodeSolution(value, this.head);
        return this.head;
    }

    print(): void {
        if (!this.head) {
            console.log("[ ]");
            return;
        }

        let logText = "[ ";

        let node: ISinglyLinkedListNode<T> | undefined = this.head;
        while (node) {
            logText += node.value;
            node = node.getNext();
            if (node) logText += ", ";
        }

        logText += " ]";
        console.log(logText);
    }
}

// noinspection DuplicatedCode
(() => {
    const LL1 = new SinglyLinkedListSolution<number>();
    console.log(LL1.getNode(0));                        // undefined

    const LL1_Last = LL1.insertFirst(5)
        .insertNext(6)
        .insertNext(7)
        .insertNext(8);
    LL1.print();                                              // [5,6,7,8]

    LL1_Last?.updateValue(50);
    LL1.print();                                              // [5,6,7,50]

    const LL1_index1 = LL1.getNode(1);
    console.log(LL1_index1?.getNext()?.value);                // 7
    console.log(LL1_index1?.getNext(2)?.value);          // 50
    console.log(LL1_index1?.getNext(3)?.value);          // undefined

    const LL2 = SinglyLinkedListSolution.fromArray([7, 4, 3, 2]);
    LL2.print();                                              // [7,4,3,2]
    LL2.insertFirst(9);
    LL2.print();                                              // [9,7,4,3,2]
    LL2.getNode(1)?.deleteNext(2);
    LL2.print();                                              // [9,7,2]
})();