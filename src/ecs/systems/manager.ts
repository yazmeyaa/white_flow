import {ISystem} from "@/ecs";
import {Clock} from "@/clock";
import {World} from "@/ecs/world";

export class SystemsManager {
    private readonly systems: Map<string, ISystem> = new Map();

    public compute(world: World, clock: Clock): void {
        for(const system of this.list()) {
            system.compute(world, clock)
        }
    }

    public addSystem(name: string, system: ISystem): void {
        if (this.systems.has(name)) {
            throw new SystemAlreadyExistError(name);
        }

        this.systems.set(name, system);
    }

    public list(): IterableIterator<ISystem> {
        return this.systems.values();
    }

    public get(name: string): ISystem {
        if (!this.systems.has(name)) {
            throw new SystemNotFoundError(name);
        }

        return this.systems.get(name)!;
    }
}

export class SystemNotFoundError extends Error {
    constructor(name: string) {
        const message = `System with name ${name} does not exist`;
        super(message);
    }

}

export class SystemAlreadyExistError extends Error {
    constructor(name: string) {
        const message = `System with name ${name} already exists`
        super(message);
    }
}
