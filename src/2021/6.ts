import { Solver } from 'solver';

export const solver: Solver = { part1, part2 };

const START_AGE = 6;
const NEW_FISH_AGE = 8;

class Fish {
    constructor(public age: number) {}

    advance() {
        if (this.age === 0) this.age = START_AGE;
        else this.age--;
    }
}

class Simulation {
    private fishes: Fish[] = [];

    constructor(input: string) {
        const values = input.split(',').map((x) => Number(x));

        values.forEach((age) => this.fishes.push(new Fish(age)));
    }

    simulateDays(days: number) {
        for (let i = 0; i < days; i++) {
            this.simulateDay();
        }
    }

    simulateDay() {
        const babyFishes = [];
        this.fishes.forEach((fish) => {
            if (fish.age == 0) babyFishes.push(new Fish(NEW_FISH_AGE));
            fish.advance();
        });

        this.fishes = [...this.fishes, ...babyFishes];
    }

    getPopulation() {
        return this.fishes.length;
    }
}

const SIMULATION_DAYS_PART1 = 80;

function part1(input: string): number {
    const simulation = new Simulation(input);
    simulation.simulateDays(SIMULATION_DAYS_PART1);
    return simulation.getPopulation();
}

const SIMULATION_DAYS_PART2 = 256;

function part2(input: string): number {
    const values = input.split(',').map((x) => Number(x));

    // represents states for day1, day2, ..., NEW_FISH_AGE fishies.
    const states: number[] = Array(NEW_FISH_AGE + 1).fill(0);

    // place each fish at his state index.
    values.forEach((fish) => states[fish]++);

    for (let i = 0; i < SIMULATION_DAYS_PART2; i++) {
        // fishies at state[0] will produce one fish and reset their cycle;
        const readyFishies = states[0];

        //day1, day2, ..., last day will advance one day
        for (let i = 1; i < states.length; i++) {
            states[i - 1] = states[i];
        }
        states[states.length - 1] = 0;

        //day0:
        //we let the fishies produce a child
        states[NEW_FISH_AGE] += readyFishies;
        //we let the fishies restart their cycle
        states[START_AGE] += readyFishies;
    }
    return states.reduce((acc, x) => acc + x);
}
