// pf.test.ts
// Vitest tests for pure functions

import { expect, test } from "vitest";

test("misc", () => {
    expect(1 + 1).toBe(2);
    expect(1 + 1).not.toBe(3);
    expect([1, 2, 3]).toContain(2);

    const obj = { a: 1, b: 2 };
    expect(obj).toHaveProperty("a");
    expect(obj).toEqual({ a: 1, b: 2 });

    expect(() => {
        throw new Error("error");
    }).toThrow();
    expect(1).toBeTruthy();
});
