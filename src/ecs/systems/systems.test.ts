import {beforeEach, describe, expect, test} from "@jest/globals";
import {ISystem} from "@/ecs";
import {SystemsManager} from "@/ecs/systems/manager";
import {Clock} from "@/clock";
import {World} from "@/ecs/world";

describe("[ECS] - Systems", () => {
    let counter = 0;
    let manager = new SystemsManager();

    beforeEach(() => {
        counter = 0;
        manager = new SystemsManager();
    })

    const incrementalSystem = {
        compute() {
            counter += 1;
        }
    } satisfies ISystem;

    test("Should be able to collect systems", () => {
        manager.addSystem("counter_increment", incrementalSystem);
        manager.addSystem("counter_increment_1", incrementalSystem);
        manager.addSystem("counter_increment_2", incrementalSystem);

        const list = manager.list()
        let len = 0;
        for (const _ of list) {
            len++;
        }

        expect(len).toBe(3);
    })

    test("Should process systems correctly", () => {
        manager.addSystem("counter_increment", incrementalSystem);
        const worldMock = {} as World;
        const clockMock = {} as Clock;

        for (const system of manager.list()) {
            system.compute(worldMock, clockMock);
        }

        expect(counter).toEqual(1);
    })
})