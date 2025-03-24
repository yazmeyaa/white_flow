export type OnUpdateFn = (dt: number) => void;

interface ClockResetOptions {
    clearCallbacks?: boolean;
}

export class Clock {
    private _elapsedTimeMs = 0;
    private previousTimeMs = 0;
    private _dt: number = 0;
    private onUpdateCallbacks: Set<OnUpdateFn> = new Set();

    public constructor(clock?: Clock) {
        if (clock) {
            this._elapsedTimeMs = clock.elapsedTime;
            this.previousTimeMs = clock.previousTimeMs;
        }
    }

    public reset(options?: ClockResetOptions): void {
        this._elapsedTimeMs = 0;
        this.previousTimeMs = 0;

        if(options?.clearCallbacks) {
            this.onUpdateCallbacks.clear();
        }
    }

    public get elapsedTime(): number {
        return this._elapsedTimeMs;
    }

    public get dt(): number {
        return this._dt;
    }

    public update(): void {
        const now = performance.now();
        const dt = now - this.previousTimeMs;
        this._dt = dt;
        this._elapsedTimeMs += dt;

        for(const updFn of this.onUpdateCallbacks) {
            updFn(dt);
        }
        this.previousTimeMs = now;
    }

    public onUpdate(fn: OnUpdateFn): void {
        this.onUpdateCallbacks.add(fn);
    }
}