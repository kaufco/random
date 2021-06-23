# @kobayami/random

## Installation

```sh
npm install --save @kobayami/random
```

## Version and License

- Latest version: 1.0.0
- License: [MIT](https://kobayami.github.io/random/LICENSE.md)
- [Changes](https://kobayami.github.io/random/CHANGES.md)

## Summary

An LCG random number generator that resembles the behavior of `java.util.Random`.
This means the `randomInt()` method of this generator will generate the same number sequence as
`java.util.Random.nextInt()` when both are initialized with the same seed.

The purpose of this package is to provide a random number generator
that can be initialized with seeds as to create reproducible random number sequences,
because JS `Math.random()` does not provide such a feature.

## Usage Example

```ts
import { Random } from "@kobayami/random";

const WIDTH = 640;
const HEIGHT = 480;

const rand = new Random(1923968746);

function getRandomPixelPosition(): {x: number; y: number} {
    return {
        x: rand.randomInt(WIDTH),
        y: rand.randomInt(HEIGHT)
    }
}
```

## See Also

- [API Documentation](https://kobayami.github.io/random/docs/modules.html)
- [Project Homepage](https://kobayami.github.io/random)
- [Project on GitHub](https://github.com/kobayami/random)
- [Issues](https://github.com/kobayami/random/issues)
