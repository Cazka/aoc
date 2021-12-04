import { Solver } from 'solver';

export const solver: Solver = { part1, part2 };

class Board {
    private numbers: number[][];
    private marked: boolean[][];

    constructor(board: number[][]) {
        this.numbers = board;
        this.marked = [...Array(this.numbers.length)].map(() => Array(this.numbers[0].length).fill(false));
    }

    markNumber(num: number): void {
        this.numbers.forEach((row, ri) => {
            const ci = row.indexOf(num);
            if (ci >= 0) this.marked[ri][ci] = true;
        });
    }

    checkBoard(): boolean {
        //check rows
        for (let row of this.marked) {
            if (row.reduce((acc, x) => acc && x)) return true;
        }

        //check columns
        for (let ci = 0; ci < this.marked[0].length; ci++) {
            if (this.marked.reduce((acc, row) => acc && row[ci], true)) return true;
        }
    }

    getSum(): number {
        let sum = 0;

        for (let [ri, row] of this.numbers.entries()) {
            for (let [ci, num] of row.entries()) {
                if (!this.marked[ri][ci]) sum += num;
            }
        }

        return sum;
    }

    //helping method
    print() {
        this.numbers.forEach((row) => {
            const printRow = row.map((x) => x.toString().padStart(2, ' '));
            console.log(printRow.join(' '));
        });
        this.marked.forEach((row) => {
            const printRow = row.map((x) => ' ' + (x ? 'x' : 'o'));
            console.log(printRow.join(' '));
        });
    }
}

function readBoards(values: string[]): Board[] {
    const boards: Board[] = [];
    while (values.length > 0) {
        //remove empty new line
        values.shift();
        //read 5x5 board
        const board: number[][] = [];
        for (let i = 0; i < 5; i++) {
            board.push(
                values
                    .shift()
                    .trim()
                    .split(/\s+/)
                    .map((x) => Number(x))
            );
        }
        boards.push(new Board(board));
    }

    return boards;
}

function part1(input: string): number {
    const values: string[] = input.split('\n');
    const draw_sequence: number[] = values
        .shift()
        .split(',')
        .map((x) => Number(x));
    const boards: Board[] = readBoards(values);

    for (let draw of draw_sequence) {
        boards.forEach((b) => b.markNumber(draw));

        for (let b of boards) {
            if (b.checkBoard()) return b.getSum() * draw;
        }
    }
    return -1;
}

function part2(input: string): number {
    const values: string[] = input.split('\n');
    const draw_sequence: number[] = values
        .shift()
        .split(',')
        .map((x) => Number(x));
    const boards: Board[] = readBoards(values);

    let lastWin: [Board, number];

    for (let draw of draw_sequence) {
        boards.forEach((b) => b.markNumber(draw));

        boards.forEach((b, bi) => {
            if (b.checkBoard()) {
                lastWin = [b, draw];
                boards.splice(bi, 1);
            }
        });
    }

    return lastWin[0].getSum() * lastWin[1];
}
