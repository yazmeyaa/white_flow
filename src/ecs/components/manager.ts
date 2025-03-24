import {Bitmap} from "bitmap-index";

export type ComponentsInitOptions<T = any> = {
    readonly initialValue: () => T
}

export type ComponentName = string;

export type ComponentsConstructorOptions = {
    initialComponents?: Record<ComponentName, ComponentsInitOptions>
}

export class ComponentsManager {
    private readonly components: Map<string, ComponentsStorage> = new Map();

    constructor(opts?: ComponentsConstructorOptions) {
        if (opts?.initialComponents) {
            for (const componentName in opts.initialComponents) {
                const storage = new ComponentsStorage({
                    initialValue: opts.initialComponents[componentName].initialValue
                })
                this.components.set(componentName, storage);
            }
        }
    }

    public clear(): void {
        for(const componentName of this.components.keys()) {
            this.components.delete(componentName);
        }
    }

    public addComponent(componentName: string, options: ComponentsInitOptions): void {
        this.components.set(componentName, new ComponentsStorage({
            initialValue: options.initialValue,
        }))
    }

    public get<T extends object>(componentName: string): ComponentsStorage<T> {
        const component = this.components.get(componentName);
        if (!component) {
            throw new Error(`Component ${componentName} not found`);
        }
        return this.components.get(componentName) as ComponentsStorage<T>;
    }
}

type EntityID = number;

export type ComponentsStorageConstructorOptions<T = unknown> = {
    initialValue: () => T;
}

export class ComponentsStorage<T extends Record<string, any> = Record<string, any>> {
    private readonly components: Map<EntityID, T> = new Map();
    public readonly bitmap: Bitmap = new Bitmap()
    private readonly initialValue: () => T;

    constructor(opts: ComponentsStorageConstructorOptions<T>) {
        this.initialValue = opts.initialValue
    }

    public list(): IterableIterator<T> {
        return this.components.values()
    }

    public add(entityID: EntityID): void {
        this.bitmap.set(entityID)
        this.components.set(entityID, this.initialValue())
    }

    public set(entityID: EntityID, value: T): void {
        this.bitmap.set(entityID)
        this.components.set(entityID, value)
    }

    public remove(entityID: EntityID): void {
        this.components.delete(entityID)
        this.bitmap.remove(entityID);
    }

    public get(entityID: EntityID): T | null {
        return this.components.get(entityID) ?? null;
    }
}