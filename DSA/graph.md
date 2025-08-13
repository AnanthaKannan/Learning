## Graph
* Directed (single way connection) 
* UnDirected (both way connection) (like facebook friends one person cam be mutual to multiple)

### Understanding
* Vertices (nodes) – the entities in the graph.
* Edges – connections between vertices.
* Directed vs Undirected – one-way vs two-way connections.
* Weighted vs Unweighted – edges can have costs/weights.
* Cyclic vs Acyclic – whether cycles exist.
* Connected vs Disconnected – whether all nodes are reachable.

### Adjacency Matrix – better for dense graphs.
```js
const matrix: number[][] = [
  [0, 1, 1, 0], // A
  [1, 0, 0, 1], // B
  [1, 0, 0, 1], // C
  [0, 1, 1, 0]  // D
];

```

### Adjacency List – efficient for sparse graphs
```js
type Graph = Record<string, string[]>;

const graph: Graph = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "D"],
  D: ["B", "C"]
};

```


### BFS and DFS
It is means how we are going to Traversal the nodes
* DFS (Depth First Search) – explores as far as possible before backtracking.
* BFS (Breadth First Search) – explores neighbors level by level.


[BFS vs DFS](https://www.youtube.com/shorts/n6U5kbez_WM)


### Examples
```js
type Vertex = string; // you can change to number if needed

class Graph {
  private adjacencyList: Map<Vertex, Vertex[]>;

  constructor() {
    this.adjacencyList = new Map();
  }

  // Add a new vertex to the graph
  addVertex(vertex: Vertex): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  // Add an edge (undirected by default)
  addEdge(vertex1: Vertex, vertex2: Vertex, directed = false): void {
    if (!this.adjacencyList.has(vertex1)) this.addVertex(vertex1);
    if (!this.adjacencyList.has(vertex2)) this.addVertex(vertex2);

    this.adjacencyList.get(vertex1)!.push(vertex2);
    if (!directed) {
      this.adjacencyList.get(vertex2)!.push(vertex1);
    }
  }

  // BFS Traversal
  bfs(start: Vertex): Vertex[] {
    const visited = new Set<Vertex>();
    const queue: Vertex[] = [start];
    const result: Vertex[] = [];

    while (queue.length) {
      const vertex = queue.shift()!;
      if (!visited.has(vertex)) {
        visited.add(vertex);
        result.push(vertex);
        queue.push(...this.adjacencyList.get(vertex)!);
      }
    }
    return result;
  }

  // DFS Traversal (Recursive)
  dfsRecursive(start: Vertex): Vertex[] {
    const result: Vertex[] = [];
    const visited = new Set<Vertex>();

    const dfs = (vertex: Vertex) => {
      if (!vertex || visited.has(vertex)) return;
      visited.add(vertex);
      result.push(vertex);
      for (const neighbor of this.adjacencyList.get(vertex)!) {
        dfs(neighbor);
      }
    };

    dfs(start);
    return result;
  }

  // DFS Traversal (Iterative)
  dfsIterative(start: Vertex): Vertex[] {
    const stack: Vertex[] = [start];
    const visited = new Set<Vertex>();
    const result: Vertex[] = [];

    while (stack.length) {
      const vertex = stack.pop()!;
      if (!visited.has(vertex)) {
        visited.add(vertex);
        result.push(vertex);
        stack.push(...this.adjacencyList.get(vertex)!);
      }
    }
    return result;
  }

  // Print the graph
  printGraph(): void {
    for (const [vertex, edges] of this.adjacencyList.entries()) {
      console.log(`${vertex} -> ${edges.join(", ")}`);
    }
  }
}

// Example Usage
const g = new Graph();
g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "E");
g.addEdge("D", "F");

g.printGraph();
console.log("BFS:", g.bfs("A"));
console.log("DFS Recursive:", g.dfsRecursive("A"));
console.log("DFS Iterative:", g.dfsIterative("A"));

```