import { Random } from '../lib';

describe('Test Suite', () => {
    it('randomInt: Java behavior', () => {
        for (const sample of javaSamples) {
            const rand = new Random(sample.seed);
            for (const expected of sample.sequence) {
                expect(rand.randomInt()).toBe(expected);
            }
        }
    });

    it('random, randomInt', () => {
        for (const sample of javaSamples) {
            const rand0 = new Random(sample.seed);
            const rand05 = new Random(sample.seed);
            const rand5k = new Random(sample.seed);
            const rand50k = new Random(sample.seed);

            let sum0 = 0;
            let sum05 = 0;
            let sum5k = 0;
            let sum50k = 0;

            const count = 100000;
            for (let i = 0; i < count; i++) {
                sum0 += rand0.randomInt();
                sum05 += rand05.random();
                const v5k = rand5k.random(2000, 8000);
                sum5k += v5k;
                const v50k = rand50k.randomInt(22000, 78000);
                sum50k += v50k;
                if (i < 250) {
                    expect(v5k).toBeGreaterThanOrEqual(2000);
                    expect(v5k).toBeLessThan(8000);
                    expect(v50k).toBeGreaterThanOrEqual(22000);
                    expect(v50k).toBeLessThan(78000);
                }
            }

            expect(sum0 / (0x100000000 * count)).toBeCloseTo(0, 2);
            expect(sum05 / count).toBeCloseTo(0.5, 2);
            expect(sum5k / count).toBeCloseTo(5000, -2);
            expect(sum50k / count).toBeCloseTo(50000, -3);
        }
    });
});

const javaSamples = [
    {
        seed: 1923968746n,
        sequence: [
            1721706244, -1782519548, 1594903409, 204238332, -1341885442, 262843573, 965261839, -1246838436, 1855311698,
            -1269314523, -1707186091, -682481949, -450990488, 1859822843, -1249525154, -1409347870, 966343599,
            -886054980, -466691077, 966476517,
        ],
    },
    {
        seed: 739526n,
        sequence: [
            422076215, 2037369383, -1610522235, 441498972, 523479860, 280293237, 1454834592, -2030151253, -1713620549,
            634792683, -1010720545, 790826894, 502682571, -265952784, 912960442, 693108653, -42725438, 1099733132,
            26378448, -1370282153,
        ],
    },
    {
        seed: 0n,
        sequence: [
            -1155484576, -723955400, 1033096058, -1690734402, -1557280266, 1327362106, -1930858313, 502539523,
            -1728529858, -938301587, 1431162155, 1085665355, 1654374947, -1661998771, -65105105, -73789608, -518907128,
            99135751, -252332814, 755814641,
        ],
    },
    {
        seed: 1n,
        sequence: [
            -1155869325, 431529176, 1761283695, 1749940626, 892128508, 155629808, 1429008869, -1465154083, -138487339,
            -1242363800, 26273138, 655996946, -155886662, 685382526, -258276172, -1915244828, -226796111, -382464772,
            -270230103, 2092024379,
        ],
    },
    {
        seed: 123n,
        sequence: [
            -1188957731, 1018954901, -39088943, 1295249578, 1087885590, -1829099982, -1680189627, 1111887674,
            -833784125, -1621910390, -535098017, -1935747844, -1219562352, 696711130, 308881275, -1366603797,
            -875052456, 1149563170, -1809396988, 1041944832,
        ],
    },
];
