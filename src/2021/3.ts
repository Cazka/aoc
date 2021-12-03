import { Solver } from 'solver';

export const solver: Solver = { part1, part2 };

function part1(input: string): number {
    const values: string[] = input.split('\n');
    const ones: number[] = Array(values[0].length).fill(0);

    values.forEach((x) => {
        for (let i = 0; i < ones.length; i++) {
            ones[i] += Number(x.charAt(i));
        }
    });

    const gamma = ones.map((x) => (x > values.length / 2 ? 1 : 0)).join('');
    const epsilon = ones.map((x) => (x < values.length / 2 ? 1 : 0)).join('');

    return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

function part2(input: string): number {
    const values: string[] = input.split('\n');

    let oxygen: string[] = [...values];
    let co2: string[] = [...values];

    for (let i = 0; i < values[0].length; i++) {
        if (oxygen.length > 1) {
            let ones = oxygen.reduce((acc, x) => acc + Number(x.charAt(i)), 0);

            if (ones >= oxygen.length / 2) {
                oxygen = oxygen.filter((x) => x.charAt(i) === '1');
            } else {
                oxygen = oxygen.filter((x) => x.charAt(i) === '0');
            }
        }

        if (co2.length > 1) {
            let ones = co2.reduce((acc, x) => acc + Number(x.charAt(i)), 0);

            if (ones < co2.length / 2) {
                co2 = co2.filter((x) => x.charAt(i) === '1');
            } else {
                co2 = co2.filter((x) => x.charAt(i) === '0');
            }
        }
    }

    return parseInt(oxygen[0], 2) * parseInt(co2[0], 2);
}
