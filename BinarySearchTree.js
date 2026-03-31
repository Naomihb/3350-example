class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // Check if the tree is empty
    isEmpty() {
        return this.root === null;
    }

    // Insert a value into the BST
    insert(value) {
        const newNode = new Node(value);
        if (this.isEmpty()) {
            this.root = newNode;
            return this;
        }
        let current = this.root;
        while (true) {
            if (value === current.value) {
                return this;
            }
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }

    // Search for a value in the BST; returns true if found, false otherwise
    search(value) {
        let current = this.root;
        while (current !== null) {
            if (value === current.value) {
                return true;
            }
            current = value < current.value ? current.left : current.right;
        }
        return false;
    }

    // Find the minimum value in the BST
    min() {
        if (this.isEmpty()) {
            return null;
        }
        let current = this.root;
        while (current.left !== null) {
            current = current.left;
        }
        return current.value;
    }

    // Find the maximum value in the BST
    max() {
        if (this.isEmpty()) {
            return null;
        }
        let current = this.root;
        while (current.right !== null) {
            current = current.right;
        }
        return current.value;
    }

    // Delete a value from the BST
    delete(value) {
        this.root = this._deleteNode(this.root, value);
        return this;
    }

    _deleteNode(node, value) {
        if (node === null) {
            return null;
        }
        if (value < node.value) {
            node.left = this._deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this._deleteNode(node.right, value);
        } else {
            // Node to delete found
            if (node.left === null && node.right === null) {
                return null;
            }
            if (node.left === null) {
                return node.right;
            }
            if (node.right === null) {
                return node.left;
            }
            // Node has two children: replace with in-order successor (min of right subtree)
            let successor = node.right;
            while (successor.left !== null) {
                successor = successor.left;
            }
            node.value = successor.value;
            node.right = this._deleteNode(node.right, successor.value);
        }
        return node;
    }

    // Return the height of the tree (-1 for an empty tree)
    height() {
        return this._heightOf(this.root);
    }

    _heightOf(node) {
        if (node === null) {
            return -1;
        }
        return 1 + Math.max(this._heightOf(node.left), this._heightOf(node.right));
    }

    // In-order traversal: left → root → right (sorted ascending)
    inorder() {
        const result = [];
        this._inorder(this.root, result);
        return result;
    }

    _inorder(node, result) {
        if (node !== null) {
            this._inorder(node.left, result);
            result.push(node.value);
            this._inorder(node.right, result);
        }
    }

    // Pre-order traversal: root → left → right
    preorder() {
        const result = [];
        this._preorder(this.root, result);
        return result;
    }

    _preorder(node, result) {
        if (node !== null) {
            result.push(node.value);
            this._preorder(node.left, result);
            this._preorder(node.right, result);
        }
    }

    // Post-order traversal: left → right → root
    postorder() {
        const result = [];
        this._postorder(this.root, result);
        return result;
    }

    _postorder(node, result) {
        if (node !== null) {
            this._postorder(node.left, result);
            this._postorder(node.right, result);
            result.push(node.value);
        }
    }

    // Level-order (breadth-first) traversal
    levelOrder() {
        if (this.isEmpty()) {
            return [];
        }
        const result = [];
        const queue = [this.root];
        while (queue.length > 0) {
            const node = queue.shift();
            result.push(node.value);
            if (node.left !== null) {
                queue.push(node.left);
            }
            if (node.right !== null) {
                queue.push(node.right);
            }
        }
        return result;
    }
}

module.exports = BinarySearchTree;
