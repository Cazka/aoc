import { Solver } from 'solver';

export const solver: Solver = { part1, part2 };

function part1(input: string): number {
    const values: number[] = input.split('\n').map((x) => Number(x));
    // there is an empty new line at the end
    values.pop();

    return values.reduce((acc, x) => acc + Math.floor(x / 3) - 2, 0);
}

function part2(input: string): number {
    const values: number[] = input.split('\n').map((x) => Number(x));
    // there is an empty new line at the end
    values.pop();

    const calcFuel = (mass: number) => {
        const fuel = Math.floor(mass / 3) - 2;
        return fuel < 0 ? 0 : fuel + calcFuel(fuel);
    };

    return values.reduce((acc, x) => acc + calcFuel(x), 0);
}
