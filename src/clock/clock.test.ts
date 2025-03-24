import {beforeEach, describe, expect, jest, test} from "@jest/globals";
import {Clock} from "@/clock/clock";

describe("[Core] - Clock", () => {
    let clock = new Clock();
    let currentTimeMs = 0;
    const performanceNowStep = 10;

    beforeEach(() => {
        currentTimeMs = 0;
        clock.reset({clearCallbacks: true});
    })

    jest.spyOn(globalThis.performance, "now").mockImplementation(() => {
        return currentTimeMs += performanceNowStep;
    })


    test("Should initiate clock correctly", () => {
        expect(clock.elapsedTime).toBe(0);
        expect(clock.dt).toBe(0);
    })

    test("Clock should update correctly", () => {
        expect(clock.elapsedTime).toBe(0);
        expect(clock.dt).toBe(0);

        clock.update();
        expect(clock.elapsedTime).toBe(performanceNowStep);
        expect(clock.dt).toBe(performanceNowStep);

        clock.update();
        expect(clock.elapsedTime).toBe(performanceNowStep * 2);
        expect(clock.dt).toBe(performanceNowStep);
    })

    test("Should apply callbacks correctly", () => {
        let x = 0;
        clock.onUpdate((dt) => {
            x += dt;
        });
        clock.update();

        expect(x).toBe(performanceNowStep);
    })
})