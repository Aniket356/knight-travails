class Graph{
    constructor() {
        this.adjList = new Map()
    }

    insertEdge(u, v) {
        if(!(this.adjList.get(u))){
            this.adjList.set(u, [])
        }
        this.adjList.get(u).push(v)
    }

    printGraph() {
        console.log(this.adjList)
    }

    getGraph() {
        return this.adjList
    }
}

const chessKnightGraph = () => {
    // This function will return a graph of all squares to which each square of the chess board is connected to via a knight move.
    const g = new Graph();

    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            if(i - 1 >= 0 && j + 2 <= 7) g.insertEdge([i, j].toString(), [i-1, j+2])
            if(i + 1 <= 7 && j + 2 <= 7) g.insertEdge([i, j].toString(), [i+1, j+2])
            if(i - 2 >= 0 && j + 1 <= 7) g.insertEdge([i, j].toString(), [i-2, j+1])
            if(i + 2 <= 7 && j + 1 <= 7) g.insertEdge([i, j].toString(), [i+2, j+1])
            if(i - 2 >= 0 && j - 1 >= 0) g.insertEdge([i, j].toString(), [i-2, j-1])
            if(i + 2 <= 7 && j - 1 >= 0) g.insertEdge([i, j].toString(), [i+2, j-1])
            if(i - 1 >= 0 && j - 2 >= 0) g.insertEdge([i, j].toString(), [i-1, j-2])
            if(i + 1 <= 7 && j - 2 >= 0) g.insertEdge([i, j].toString(), [i+1, j-2])
        }
    }

    return g
}


// Now do a breadth first search from the initial position and find the final position.

const knightMoves = (initialSquare, finalSquare) => {
    if(initialSquare[0] < 0 || initialSquare[0] > 7 || initialSquare[1] < 0 || initialSquare[1] > 7
        || finalSquare[0] < 0 || finalSquare[0] > 7 || finalSquare[1] < 0 || finalSquare[1] > 7) {
            console.log("Invalid coordinates")
            return []
        }


    const knightGraph = chessKnightGraph()
    const visited = new Set()
    const q = []
    const parent = new Map()

    q.push(initialSquare)
    parent.set(initialSquare.toString(), -1)

    while(q.length > 0){
        const front = q.shift()
        visited.add(front.toString())

        for(const i of knightGraph.getGraph().get(front.toString())){
            if(!visited.has(i.toString())){
                q.push(i)
                parent.set(i.toString(), front)
            }
        }
    }

    let ansArray = []

    ansArray.push(finalSquare)
    let currPos = parent.get(finalSquare.toString())
    while(currPos.toString() !== initialSquare.toString()){
        if(currPos === -1) break

        ansArray.push(currPos)
        currPos = parent.get(currPos.toString())
    }
    if(currPos !== -1)
        ansArray.push(currPos)

    console.log(`You made it in ${ansArray.length - 1} moves! Here's your path:`)
    ansArray = ansArray.reverse()
    for(i of ansArray) console.log(i)

    return ansArray
}

knightMoves([0,0],[4,4])