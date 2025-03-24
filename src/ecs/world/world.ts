import {ComponentsManager} from "@/ecs/components";

export class World {
    public readonly components: ComponentsManager;

    constructor() {
        this.components = new ComponentsManager();
    }
}