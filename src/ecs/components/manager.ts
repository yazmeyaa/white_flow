// import {Bitmap} from "bitmap-index";
import {Component} from "@/ecs/components/component";

export class ComponentsManager {
    private readonly components: Map<string, Component> = new Map();

    public register(name: string, component: Component): void {
        if (this.components.has(name)) {
            throw new ComponentAlreadyRegistered(name, component);
        }
        this.components.set(name, component);
    }

    public get(name: string): Component | null {
        return this.components.get(name) ?? null;
    }
}

// type EntityID = number;

// export class ComponentsList {
//     private readonly components: Map<EntityID, Component> = new Map();
//     private readonly bm = new Bitmap();
// }

class ComponentAlreadyRegistered extends Error {
    public readonly name: string;
    public readonly component: Component;

    constructor(name: string, component: Component) {
        const message = `Component already registered: ${name}`;
        super(message);
        this.component = component;
        this.name = name;
    }
}