import { assert } from "chai";

// example function to test
function sum(a: number, b: number): number {
  return a + b;
}

describe("Calculator Tests", () => {
  it("should return 5 when 2 is added to 3", () => {
    const result = sum(2, 3);
    assert.equal(result, 5);
  });
});
