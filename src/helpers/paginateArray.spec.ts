import { paginateArray } from "./paginateArray"; // Import the paginateArray function

describe("paginateArray", () => {
    it("should paginate an array into subarrays of the specified size", () => {
        const inputArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const pageSize = 3;

        const result = paginateArray(inputArray, pageSize);

        expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    });

    it("should handle an empty array", () => {
        const inputArray: number[] = [];
        const pageSize = 5;

        const result = paginateArray(inputArray, pageSize);

        expect(result).toEqual([]);
    });

    it("should handle a page size larger than the array length", () => {
        const inputArray = [1, 2, 3, 4, 5];
        const pageSize = 10;

        const result = paginateArray(inputArray, pageSize);

        expect(result).toEqual([[1, 2, 3, 4, 5]]);
    });

});
