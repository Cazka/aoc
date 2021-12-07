import { Solver } from 'solver';

export const solver: Solver = { part1, part2 };

function part1(input: string): number {
    const values = input
        .split(',')
        .map((x) => Number(x))
        .sort((a, b) => a - b);

    const middle = values[Math.floor(values.length / 2)];

    return values.reduce((acc, x) => acc + Math.abs(x - middle), 0);
}

function sumGauss(a) {
    return (a * (a + 1)) / 2;
}
function part2(input: string): number {
    const values = input.split(',').map((x) => Number(x));

    let biggestValue = values.reduce((acc, x) => Math.max(acc, x));
    let cheapest = Infinity;

    for (let i = 0; i < biggestValue; i++) {
        const fuel = values.reduce((acc, x) => acc + sumGauss(Math.abs(x - i)), 0);
        if (fuel < cheapest) {
            cheapest = fuel;
        }
    }
    return cheapest;
}
