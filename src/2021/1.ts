import { Solver } from '../solver';

export const solver: Solver = { part1, part2 };

function part1(input: string): number {
    const values: number[] = input.split('\n').map((x) => Number(x));
    let result = 0;

    for (let i = 1; i < values.length; i++) {
        if (values[i] > values[i - 1]) result++;
    }

    return result;
}

const sliding_window_size = 3;

function part2(input: string): number {
    const values: number[] = input.split('\n').map((x) => Number(x));
    const sliding_window = values.slice(0, sliding_window_size);
    let result = 0;

    for (let i = sliding_window_size; i < values.length; i++) {
        const sum_previous = sliding_window.reduce((acc, x) => acc + x);

        sliding_window.shift();
        sliding_window.push(values[i]);

        const sum_current = sliding_window.reduce((acc, x) => acc + x);

        if (sum_current > sum_previous) result++;
    }

    return result;
}
