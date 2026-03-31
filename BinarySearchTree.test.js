const BinarySearchTree = require('./BinarySearchTree');

describe('BinarySearchTree', () => {
    let bst;

    beforeEach(() => {
        bst = new BinarySearchTree();
    });

    // ── isEmpty ────────────────────────────────────────────────────────────────
    describe('isEmpty', () => {
        test('returns true for a new tree', () => {
            expect(bst.isEmpty()).toBe(true);
        });

        test('returns false after inserting a value', () => {
            bst.insert(10);
            expect(bst.isEmpty()).toBe(false);
        });
    });

    // ── insert ─────────────────────────────────────────────────────────────────
    describe('insert', () => {
        test('inserts the first value as root', () => {
            bst.insert(10);
            expect(bst.root.value).toBe(10);
        });

        test('inserts smaller values to the left', () => {
            bst.insert(10);
            bst.insert(5);
            expect(bst.root.left.value).toBe(5);
        });

        test('inserts larger values to the right', () => {
            bst.insert(10);
            bst.insert(15);
            expect(bst.root.right.value).toBe(15);
        });

        test('ignores duplicate values', () => {
            bst.insert(10);
            bst.insert(10);
            expect(bst.root.left).toBeNull();
            expect(bst.root.right).toBeNull();
        });

        test('returns the tree instance for chaining', () => {
            expect(bst.insert(10)).toBe(bst);
        });
    });

    // ── search ─────────────────────────────────────────────────────────────────
    describe('search', () => {
        beforeEach(() => {
            [10, 5, 15, 3, 7].forEach(v => bst.insert(v));
        });

        test('returns true for the root', () => {
            expect(bst.search(10)).toBe(true);
        });

        test('returns true for a left-subtree value', () => {
            expect(bst.search(5)).toBe(true);
        });

        test('returns true for a right-subtree value', () => {
            expect(bst.search(15)).toBe(true);
        });

        test('returns false for a value not in the tree', () => {
            expect(bst.search(99)).toBe(false);
        });

        test('returns false on an empty tree', () => {
            expect(new BinarySearchTree().search(10)).toBe(false);
        });
    });

    // ── min / max ──────────────────────────────────────────────────────────────
    describe('min', () => {
        test('returns null for an empty tree', () => {
            expect(bst.min()).toBeNull();
        });

        test('returns the minimum value', () => {
            [10, 5, 15, 3, 7].forEach(v => bst.insert(v));
            expect(bst.min()).toBe(3);
        });

        test('returns the only value in a single-node tree', () => {
            bst.insert(42);
            expect(bst.min()).toBe(42);
        });
    });

    describe('max', () => {
        test('returns null for an empty tree', () => {
            expect(bst.max()).toBeNull();
        });

        test('returns the maximum value', () => {
            [10, 5, 15, 3, 7].forEach(v => bst.insert(v));
            expect(bst.max()).toBe(15);
        });

        test('returns the only value in a single-node tree', () => {
            bst.insert(42);
            expect(bst.max()).toBe(42);
        });
    });

    // ── delete ─────────────────────────────────────────────────────────────────
    describe('delete', () => {
        beforeEach(() => {
            [10, 5, 15, 3, 7, 12, 20].forEach(v => bst.insert(v));
        });

        test('deletes a leaf node', () => {
            bst.delete(3);
            expect(bst.search(3)).toBe(false);
        });

        test('deletes a node with one child', () => {
            bst.insert(6);
            bst.delete(7);
            expect(bst.search(7)).toBe(false);
            expect(bst.search(6)).toBe(true);
        });

        test('deletes a node with two children', () => {
            bst.delete(5);
            expect(bst.search(5)).toBe(false);
            expect(bst.search(3)).toBe(true);
            expect(bst.search(7)).toBe(true);
        });

        test('deletes the root', () => {
            bst.delete(10);
            expect(bst.search(10)).toBe(false);
            expect(bst.inorder()).toEqual([3, 5, 7, 12, 15, 20]);
        });

        test('does nothing when deleting a value not in the tree', () => {
            bst.delete(99);
            expect(bst.inorder()).toEqual([3, 5, 7, 10, 12, 15, 20]);
        });

        test('returns the tree instance for chaining', () => {
            expect(bst.delete(3)).toBe(bst);
        });
    });

    // ── height ─────────────────────────────────────────────────────────────────
    describe('height', () => {
        test('returns -1 for an empty tree', () => {
            expect(bst.height()).toBe(-1);
        });

        test('returns 0 for a single-node tree', () => {
            bst.insert(10);
            expect(bst.height()).toBe(0);
        });

        test('returns the correct height for a multi-level tree', () => {
            [10, 5, 15, 3].forEach(v => bst.insert(v));
            expect(bst.height()).toBe(2);
        });
    });

    // ── inorder traversal ──────────────────────────────────────────────────────
    describe('inorder', () => {
        test('returns an empty array for an empty tree', () => {
            expect(bst.inorder()).toEqual([]);
        });

        test('returns values in ascending sorted order', () => {
            [10, 5, 15, 3, 7].forEach(v => bst.insert(v));
            expect(bst.inorder()).toEqual([3, 5, 7, 10, 15]);
        });
    });

    // ── preorder traversal ─────────────────────────────────────────────────────
    describe('preorder', () => {
        test('returns an empty array for an empty tree', () => {
            expect(bst.preorder()).toEqual([]);
        });

        test('visits root before children', () => {
            [10, 5, 15, 3, 7].forEach(v => bst.insert(v));
            expect(bst.preorder()).toEqual([10, 5, 3, 7, 15]);
        });
    });

    // ── postorder traversal ────────────────────────────────────────────────────
    describe('postorder', () => {
        test('returns an empty array for an empty tree', () => {
            expect(bst.postorder()).toEqual([]);
        });

        test('visits root after children', () => {
            [10, 5, 15, 3, 7].forEach(v => bst.insert(v));
            expect(bst.postorder()).toEqual([3, 7, 5, 15, 10]);
        });
    });

    // ── levelOrder traversal ───────────────────────────────────────────────────
    describe('levelOrder', () => {
        test('returns an empty array for an empty tree', () => {
            expect(bst.levelOrder()).toEqual([]);
        });

        test('returns values level by level', () => {
            [10, 5, 15, 3, 7].forEach(v => bst.insert(v));
            expect(bst.levelOrder()).toEqual([10, 5, 15, 3, 7]);
        });
    });
});
