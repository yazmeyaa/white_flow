import {World} from "@/ecs/world";

export interface ISystem {
    compute(world: World): void
}