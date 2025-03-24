import {Clock} from "@/clock";

export class Engine {
    public readonly clock: Clock = new Clock()

    private processTick(): void {
    }

    private update(): void {
        this.processTick();
        this.clock.update();
    }
}