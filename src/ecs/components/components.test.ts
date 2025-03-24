import {beforeEach, describe, expect, test} from "@jest/globals";
import {ComponentsInitOptions, ComponentsManager} from "@/ecs/components/manager";

type Position = {
    x: number;
    y: number;
}

const positionComponentName = "position";

const createPositionFn = (): Position => ({
    x: 0,
    y: 0,
})

const positionInitOptions: ComponentsInitOptions = {
    initialValue: createPositionFn
}

describe("[ECS] - Components", () => {
    const manager = new ComponentsManager()

    beforeEach(() => {
        manager.clear();
    })

    test("Should register component correctly", () => {
        manager.addComponent(positionComponentName, positionInitOptions)

        const store = manager.get(positionComponentName)
        expect(store).not.toBeNull();
    })

    test("Should set and get components", () => {
        const entityID = 42;
        manager.addComponent(positionComponentName, positionInitOptions)
        const store = manager.get<Position>(positionComponentName)!
        store.set(entityID, {x: 1, y: 1})
        const pos = store.get(entityID)
        expect(pos).not.toBeNull()
        expect(pos).toEqual({x: 1, y: 1})
    })

    test("Should init component correctly", () => {
        // manager.addComponent(positionComponentName, positionInitOptions)
        manager.addComponent(positionComponentName, {
            initialValue: () => ({x: 11, y: 22})
        })
        const store = manager.get<Position>(positionComponentName)!
        expect(store).not.toBeNull()
        store.add(42)
        const pos = store.get(42)!
        expect(pos).not.toBeNull()
        expect(pos).toEqual({x: 11, y: 22})
    })

    test("Should modify elements correctly", () => {
        const entityID = 12;
        manager.addComponent("some_primitive", {
            initialValue: () => ({value: 0}),
        })

        const store = manager.get<{value: number}>("some_primitive")!
        store.set(entityID, {value: 42});
        const component = store.get(entityID)!
        expect(component).not.toBeNull()
        expect(component.value).toBe(42);
        component.value = 24;

        const component2 = store.get(entityID)!;
        expect(component2).not.toBeNull()
        expect(component2.value).toBe(24);
    })

    test("Should remove component", () => {
        manager.addComponent(positionComponentName, positionInitOptions)
        const store = manager.get<Position>(positionComponentName)!
        store.add(1);
        const pos = store.get(1)
        expect(pos).not.toBeNull()
        store.remove(1);
        expect(store.get(1)).toBeNull()
    })
})