import { Solver } from 'solver';

export const solver: Solver = { part1, part2 };

function part1(input: string): number {
    const values: number[] = input.split(',').map((x) => Number(x));

    values[1] = 12;
    values[2] = 2;

    try {
        runProgram(values);
    } catch (err) {
        console.log(`error: ${err.message}`);
        return -1;
    }

    return values[0];
}

function part2(input: string): number {
    const backup: number[] = input.split(',').map((x) => Number(x));
    let target = 19690720;

    // bruteforce time?
    for (let noun = 0; noun < 99; noun++) {
        for (let verb = 0; verb < 99; verb++) {
            let values = [...backup];

            values[2] = noun;
            values[1] = verb;

            try {
                runProgram(values);
            } catch (err) {
                console.log(`error: ${err.message}`);
                return -1;
            }

            if (values[0] === target) return 100 * values[1] + values[2];
        }
    }
    return -1;
}

function runProgram(values: number[]): void {
    let i = 0;
    while (true) {
        switch (values[i]) {
            case 1:
                // addition
                values[values[i + 3]] = values[values[i + 1]] + values[values[i + 2]];
                i += 4;
                break;
            case 2:
                // multiply
                values[values[i + 3]] = values[values[i + 1]] * values[values[i + 2]];
                i += 4;
                break;
            case 99:
                //finish
                return;
            default:
                throw new Error(`invalid op code: ${values[i]}`);
        }
    }
}
