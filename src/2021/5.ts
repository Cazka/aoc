import { Solver } from 'solver';

export const solver: Solver = { part1, part2 };

interface Point {
    x: number;
    y: number;
}
interface Line {
    start: Point;
    end: Point;
}

class VentMap {
    private lines: Line[];
    grid: number[][] = [];

    constructor(input: string, limit: boolean) {
        this.lines = input.split('\n').map((line) => {
            const [start, end] = line.split(' -> ').map((point) => {
                const [x, y] = point.split(',').map((x) => Number(x));
                return { x, y };
            });
            return { start, end };
        });
        this.#build(limit);
    }

    #build(limit: boolean = true) {
        //not proud of this
        this.lines.forEach((line: Line) => {
            let dirX = line.end.x - line.start.x;
            let dirY = line.end.y - line.start.y;

            if (limit && dirX !== 0 && dirY !== 0) return;

            if (dirX > 0) dirX = 1;
            else if (dirX < 0) dirX = -1;
            if (dirY > 0) dirY = 1;
            else if (dirY < 0) dirY = -1;

            const isXNotEnd = (x): boolean => {
                if (dirX < 0) return x >= line.end.x;
                return x <= line.end.x;
            };
            const isYNotEnd = (y): boolean => {
                if (dirY < 0) return y >= line.end.y;
                return y <= line.end.y;
            };

            for (let x = line.start.x, y = line.start.y; isXNotEnd(x) && isYNotEnd(y); x += dirX, y += dirY) {
                if (this.grid[y] == null) this.grid[y] = [];
                if (this.grid[y][x] == null) this.grid[y][x] = 0;
                this.grid[y][x]++;
            }
        });
    }

    // helping method
    print() {
        [...this.grid].forEach((row) => {
            if (row == null) console.log();
            else console.log([...row].map((x) => x ?? '.').join(' '));
        });
    }
}

function part1(input: string): number {
    const map = new VentMap(input, true);

    let result = 0;

    map.grid.forEach((row) => {
        result += row.reduce((acc, x) => acc + (x >= 2 ? 1 : 0), 0);
    });

    return result;
}

function part2(input: string): number {
    const map = new VentMap(input, false);

    let result = 0;

    map.grid.forEach((row) => {
        result += row.reduce((acc, x) => acc + (x >= 2 ? 1 : 0), 0);
    });

    return result;
}
