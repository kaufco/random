import { assertPresent, presentOrElse } from '@kobayami/guards';
import { double, int } from '@kobayami/number-types';

/**
 * An LCG random number generator that resembles the behavior of `java.util.random`, i.e.:
 *
 * ```
 *     x(n+1) = (x(n) * a + c) % m
 * ```
 *
 * with _m = 2^48_, _a = 25214903917_ and _c = 11_.
 */
export class Random {
    /**
     * Creates a new random number generator with an optional seed.
     *
     * Note that the seed in this implementation only has 48 bits of precision and therefore
     * will generate the same numbers a `java.util.random` only if _0 <= seed < 2^48_
     */
    constructor(seed?: bigint) {
        seed = presentOrElse(seed, () => BigInt((Math.random() * 0x100000000) ^ 0));
        this.seed = (seed ^ a) & mask;
    }

    private seed: bigint;

    private nextRandom32Bit(): number {
        this.seed = (this.seed * a + c) & mask;
        return Number(this.seed >> shrBits);
    }

    /**
     * Returns a random number in the interval _0_ (inclusive) to _1_ (exclusive).
     */
    public random(): double;

    /**
     * Returns a random number in the interval _0_ (inclusive) to _end_ (exclusive).
     */
    public random(end: double): double;

    /**
     * Returns a random number in the interval _start_ (inclusive) to _end_ (exclusive).
     */
    public random(start: double, end: double): double;

    public random(startOrEnd?: double, end?: double): double {
        return this._random(startOrEnd, end);
    }

    private _random(startOrEnd?: number, end?: number): number {
        const start = end === undefined ? 0 : assertPresent(startOrEnd, 0);
        end = assertPresent(end, assertPresent(startOrEnd, 1));
        return (this.nextRandom32Bit() / 0x100000000) * (end - start) + start;
    }

    /**
     * Returns a random integer number in the interval _-2^31_ (inclusive) to _2^31-1_ (inclusive).
     */
    randomInt(): int;

    /**
     * Returns a random integer number in the interval _0_ (inclusive) to _end-1_ (inclusive).
     */
    randomInt(end: int): int;

    /**
     * Returns a random integer number in the interval _start_ (inclusive) to _end-1_ (inclusive).
     */
    randomInt(start: int, end: int): int;

    randomInt(startOrEnd?: int, end?: int): int {
        if (end === undefined && startOrEnd === undefined) return this.nextRandom32Bit() ^ 0;
        return this._random(startOrEnd, end) ^ 0;
    }
}

const a = 25214903917n;

const c = 11n;

const mask = 0xffffffffffffn;

const shrBits = 16n;
