/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
    constructor(val, left = null, right = null) {
      this.val = val;
      this.left = left;
      this.right = right;
    }
  }
  
  class BinaryTree {
    constructor(root = null) {
      this.root = root;
    }
  
    /** minDepth(): return the minimum depth of the tree -- that is,
     * the length of the shortest path from the root to a leaf. */
  
    minDepth(root=this.root) {
        if (!root) return 0;
  
        const left = this.minDepth(root.left);
        const right = this.minDepth(root.right);
    
        return Math.min(left, right) + 1;
      }
  
    /** maxDepth(): return the maximum depth of the tree -- that is,
     * the length of the longest path from the root to a leaf. */
  
    maxDepth(root=this.root) {
        if (!root) return 0;
    
        const left = this.maxDepth(root.left);
        const right = this.maxDepth(root.right);
    
        return Math.max(left, right) + 1;
      }
  
    /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
     * The path doesn't need to start at the root, but you can't visit a node more than once. */
  
    maxSum(root=this.root) {
        let globalMax = -1*Infinity;
    
        function maxSumHelper(root) {
          if (!root) return 0;
    
          let left = maxSumHelper(root.left);
          let right = maxSumHelper(root.right);
          
          let localMax = root.val + left + right;
          if (localMax > globalMax) globalMax = localMax;
    
          return Math.max(Math.max(left, right) + root.val, root.val);
        }
  
        maxSumHelper(root);
        return root ? globalMax : 0;
      }
  
    /** nextLarger(lowerBound): return the smallest value in the tree
     * which is larger than lowerBound. Return null if no such value exists. */
  
    nextLarger(lowerBound) {
        let lub = Infinity;
    
        if (!this.root) return null;
    
        const stack = [this.root];
        while (stack.length > 0) {
          const curr = stack.pop();
          console.log(curr);
          if (lowerBound < curr.val && curr.val < lub){
            lub = curr.val
          }
          if (curr.left) stack.push(curr.left);
          if (curr.right) stack.push(curr.right);
        }
        return lub === Infinity ? null : lub;
      }
  
    /** Further study!
     * areCousins(node1, node2): determine whether two nodes are cousins
     * (i.e. are at the same level but have different parents. ) */
  
    areCousins(node1, node2) {
      if (node1 === this.root || node2 === this.root) return false;
  
      function findLevelAndParent(
        nodeToFind,
        currentNode,
        level = 0,
        data = { level: 0, parent: null }
      ) {
        if (data.parent) return data;
        if (currentNode.left === nodeToFind || currentNode.right === nodeToFind) {
          data.level = level + 1;
          data.parent = currentNode;
        }
        if (currentNode.left) {
          findLevelAndParent(nodeToFind, currentNode.left, level + 1, data);
        }
        if (currentNode.right) {
          findLevelAndParent(nodeToFind, currentNode.right, level + 1, data);
        }
        return data;
      }
  
      let node1Info = findLevelAndParent(node1, this.root);
      let node2Info = findLevelAndParent(node2, this.root);
  
      let sameLevel =
        node1Info && node2Info && node1Info.level === node2Info.level;
      let differentParents =
        node1Info && node2Info && node1Info.parent !== node2Info.parent;
      return sameLevel && differentParents;
    }
  
    /** Further study!
     * serialize(tree): serialize the BinaryTree object tree into a string.
     *
     * Output looks like this:
     *   1 2 # # 3 4 # # 5 # #
     *  Where # represents # children with a pre-order traversal.
     */
  
    static serialize(tree) {
      const values = [];
  
      function traverse(node) {
        if (node) {
          values.push(node.val);
          traverse(node.left);
          traverse(node.right);
        } else {
          values.push("#");
        }
      }
  
      traverse(tree.root);
      return values.join(" ");
    }
  
    /** Further study!
     * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */
  
    static deserialize(stringTree) {
      if (!stringTree) return null;
  
      const values = stringTree.split(" ");
  
      function buildTree() {
        // building a tree starting from the beginning of the array
        if (values.length) {
          const currentVal = values.shift();
  
          if (currentVal === "#") return null;
  
          // remember to convert values back into numbers
          let currentNode = new BinaryTreeNode(+currentVal);
          currentNode.left = buildTree();
          currentNode.right = buildTree();
  
          return currentNode;
        }
      }
  
      const root = buildTree();
      return new BinaryTree(root);
    }
  
    /** Further study!
     * lowestCommonAncestor(node1, node2): find the lowest common ancestor
     * of two nodes in a binary tree. */
  
    lowestCommonAncestor(node1, node2, currentNode=this.root) {
      // base case 1: empty tree
      if (currentNode === null) return null;
  
      // base case 2: root is one of the target nodes
      if (currentNode === node1 || currentNode === node2) return currentNode;
  
      // recursively search the left sub-tree
      const left = this.lowestCommonAncestor(node1, node2, currentNode.left);
  
      // recursively search the right sub-tree
      const right = this.lowestCommonAncestor(node1, node2, currentNode.right);
  
      // if neither left nor right is null, currentNode is the ancestor
      if (left !== null && right !== null) return currentNode;
      
      // if one node is not null, return it
      if (left !== null || right !== null) return left || right;
      
      // left and right are both null, return null
      if (left === null && right === null) return null;
    }
  }
  
  module.exports = { BinaryTree, BinaryTreeNode };
  