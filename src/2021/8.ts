import { Solver } from 'solver';

export const solver: Solver = { part1, part2 };

function part1(input: string): number {
    const values: string[][][] = input
        .split('\n')
        .map((group) => group.split('|').map((pattern) => pattern.trim().split(' ')));

    const uniqueLengths = [2, 4, 3, 7];

    let result = 0;
    for (let row of values) {
        const output = row[1];
        result += output.reduce((acc, x) => acc + (uniqueLengths.includes(x.length) ? 1 : 0), 0);
    }
    return result;
}

type Segment = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g';
type Pattern = Segment[];
interface SignalPattern {
    inputs: Pattern[];
    outputs: Pattern[];
}

interface Display {
    a: Segment;
    b: Segment;
    c: Segment;
    d: Segment;
    e: Segment;
    f: Segment;
    g: Segment;
}

const patternToNumber = {
    abcefg: 0,
    cf: 1,
    acdeg: 2,
    acdfg: 3,
    bcdf: 4,
    abdfg: 5,
    abdefg: 6,
    acf: 7,
    abcdefg: 8,
    abcdfg: 9,
};

// NOT PROUD OF THIS BUT IT WORKS THANK GOD.
// IF IT LOOKS STUPID BUT WORKS, ITS NOT STUPID! :D
function part2(input: string): number {
    const values: SignalPattern[] = input.split('\n').map((group) => {
        const [inputs, outputs] = group.split('|').map((patterns) =>
            patterns
                .trim()
                .split(' ')
                .map((x) => x.split('') as Pattern)
        );
        return { inputs, outputs };
    });

    let result = 0;

    for (let signalPattern of values) {
        const display: Display = {
            a: null,
            b: null,
            c: null,
            d: null,
            e: null,
            f: null,
            g: null,
        };
        let unknownNumbers = [...signalPattern.inputs];

        //numbers we know for sure
        //1:
        const one: Pattern = unknownNumbers.find((x) => x.length == 2);
        unknownNumbers = unknownNumbers.filter((x) => x !== one);
        //4:
        const four: Pattern = unknownNumbers.find((x) => x.length == 4);
        unknownNumbers = unknownNumbers.filter((x) => x !== four);
        //7:
        const seven: Pattern = unknownNumbers.find((x) => x.length == 3);
        unknownNumbers = unknownNumbers.filter((x) => x !== seven);
        //8:
        const eight: Pattern = unknownNumbers.find((x) => x.length == 7);
        unknownNumbers = unknownNumbers.filter((x) => x !== eight);

        // we know a is in 7 and not in 1
        display.a = seven.filter((s) => !one.includes(s))[0];

        // 6 is the only digit with 6 segments and doesnt include all segments from 1
        const six: Pattern = unknownNumbers
            .filter((p) => p.length == 6)
            .filter((p) => p.includes(display.a))
            .filter((p) => !p.includes(one[0]) || !p.includes(one[1]))[0];
        unknownNumbers = unknownNumbers.filter((x) => x !== six);

        // c is in 8 but not in 6
        display.c = eight.filter((s) => !six.includes(s))[0];

        // f is in 1 and we know c
        display.f = one.filter((s) => s !== display.c)[0];

        // 9 includes 4
        const nine: Pattern = unknownNumbers
            .filter((p) => p.length == 6)
            .filter((p) => p.includes(display.a))
            .filter((p) => p.includes(display.c))
            .filter((p) => p.includes(display.f))
            .filter((p) => four.reduce((acc, x) => acc && p.includes(x), true))[0];
        unknownNumbers = unknownNumbers.filter((x) => x !== nine);

        // g is in 9 but not in 4 and is not a
        display.g = nine.filter((s) => !four.includes(s)).filter((s) => s !== display.a)[0];

        // three is the only one with a, c, f, g and one more
        const three: Pattern = unknownNumbers
            .filter((p) => p.length === 5)
            .filter((p) => p.includes(display.a))
            .filter((p) => p.includes(display.c))
            .filter((p) => p.includes(display.f))
            .filter((p) => p.includes(display.g))[0];
        unknownNumbers = unknownNumbers.filter((x) => x !== three);

        // d is the only unknown in 3
        display.d = three
            .filter((s) => s !== display.a)
            .filter((s) => s !== display.c)
            .filter((s) => s !== display.f)
            .filter((s) => s !== display.g)[0];

        // b is the only unknown in 4
        display.b = four
            .filter((s) => s !== display.c)
            .filter((s) => s !== display.d)
            .filter((s) => s !== display.f)[0];

        // e is the one that is left :)
        // or the only unknown in 8
        display.e = eight
            .filter((s) => s !== display.a)
            .filter((s) => s !== display.b)
            .filter((s) => s !== display.c)
            .filter((s) => s !== display.d)
            .filter((s) => s !== display.f)
            .filter((s) => s !== display.g)[0];

        //now we know all segments
        //reverting the segments
        const displayReverted = {
            [display.a]: 'a',
            [display.b]: 'b',
            [display.c]: 'c',
            [display.d]: 'd',
            [display.e]: 'e',
            [display.f]: 'f',
            [display.g]: 'g',
        } as unknown as Display;

        signalPattern.outputs = signalPattern.outputs.map((p) => p.map((s) => displayReverted[s]));

        const numbers: number[] = signalPattern.outputs.map((p) => patternToNumber[p.sort().join('')]);
        result += numbers.reduce((acc, x) => 10 * acc + x);
    }

    return result;
}
