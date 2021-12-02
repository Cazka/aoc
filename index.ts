import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
import { Solver } from 'solver';

dotenv.config();

async function getInput(year: string, day: string): Promise<string> {
    const session = process.env['SESSION'];
    if (session == null) {
        throw new Error('SESSION env variable is empty');
    }

    const URL = `https://adventofcode.com/${year}/day/${day}/input`;
    const options = {
        headers: {
            Cookie: `session=${session}`,
        },
    };

    const res = await fetch(URL, options);
    const body = await res.text();

    if (!res.ok) {
        throw new Error(`couldn't get input from ${URL}`);
    }

    return body.trim();
}

async function main() {
    if (process.argv.length != 4) {
        console.log('Wrong arguments!');
        console.log('Usage:   node index.js <year> <day>');
        console.log('Example: node index.js 2021 12');
        process.exit();
    }

    const year = process.argv[2];
    const day = process.argv[3];

    const input: string = await (async () => {
        try {
            return getInput(year, day);
        } catch (err) {
            console.log(`error: ${err.message}`);
            process.exit();
        }
    })();

    const { solver }: { solver: Solver } = await (async () => {
        try {
            return import(`./src/${year}/${day}.js`);
        } catch {
            console.log(`error: no solver for ${year}-${day}`);
            process.exit();
        }
    })();

    console.log(`solution part 1: ${solver.part1(input)}`);
    console.log(`solution part 2: ${solver.part2(input)}`);
}

main();
