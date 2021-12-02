import { Solver } from 'solver';

export const solver: Solver = { part1, part2 };

function part1(input: string): number {
    const values: string[] = input.split('\n');

    let position = 0;
    let depth = 0;

    values.forEach((x: string) => {
        let [dir, value]: string[] = x.split(' ');

        switch (dir) {
            case 'forward':
                position += Number(value);
                break;
            case 'down':
                depth += Number(value);
                break;
            case 'up':
                depth -= Number(value);
                break;
        }
    });
    return position * depth;
}

function part2(input: string): number {
    const values: string[] = input.split('\n');

    let position = 0;
    let depth = 0;
    let aim = 0;

    values.forEach((x: string) => {
        const [dir, value]: string[] = x.split(' ');

        switch (dir) {
            case 'forward':
                position += Number(value);
                depth += Number(value) * aim;
                break;
            case 'down':
                aim += Number(value);
                break;
            case 'up':
                aim -= Number(value);
                break;
        }
    });
    return position * depth;
}
