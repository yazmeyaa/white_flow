import {World} from "@/ecs/world";
import {Clock} from "@/clock";

export interface ISystem {
    compute(world: World, clock: Clock): void
}