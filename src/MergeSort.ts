
//Merge Sort how does it work?
// Divide and conquer
// divide array into 2 halves until each array contains one element
// determine the minimum value and add to the empty set. Add the mazimum value at the end
// repeat for all other items until you have two sorted sets
// To sort the last set
// Examine the first value of each and choose the minimum to put in last set
// repeat until sorted
// One issue is that implementations is sometimes not in place
//
// Time Complexity
// O(logn) -> depends on how many items you need to divide by 2
// In each of the log(n) levels there are n number of items
// Therefore O(nlogn)
// As the number of items increase, the amount of time accelerates quickly(but not as fast as O(n^2))
// Imports
//Outside Library
import { performance } from "perf_hooks";

/**
 * MergeSort class for sorting an array of strings using the MergeSort algorithm.
 *
 * @remarks
 * This class provides a mergesort implementation to efficiently sort an array of strings.
 * It includes methods for sorting and merging, as well as details on how the algorithm works.
 *
 * @beta
 */
export class MergeSort {
    arrClone: string[];
    private count: number = 0;

    /**
     * Sorts the input array of strings using the MergeSort algorithm.
     *
     * @remarks
     * This method initiates the mergesort process, logs the runtime, and count of iterations.
     *
     * @param arr - The array of strings to be sorted.
     *
     * @returns {string[]} - The sorted array of strings.
     *
     * @beta
     */
    public sort(arr: string[]): string[] {
        this.count = 0;
        const startTime = performance.now();
        // Clone array for sorting
        this.arrClone = this.MergeSort(arr); // arr.length = 7
        const endTime = performance.now();
        const runTime = endTime - startTime;
        console.log(`   runtime: ${runTime} milliseconds`);
        return this.arrClone;
    }

    /**
     * Recursive function for performing the MergeSort algorithm.
     *
     * @remarks
     * This method recursively divides and sorts the array using the mergesort algorithm.
     * It also logs the count of iterations and prints the count when the depth is zero.
     *
     * @param arr - The array of strings to be sorted.
     * @param depth - The depth of recursion (optional).
     *
     * @returns {string[]} - The sorted array of strings.
     *
     * @beta
     */
    private MergeSort(arr: string[], depth: number = 0): string[] {
        this.count++;
        if (arr.length <= 1) {
            return arr;
        }
        const mid = Math.floor(arr.length / 2); // 3
        let left: any = arr.slice(0, mid);
        let right: any = arr.slice(mid, arr.length);

        left = this.MergeSort(left, depth + 1);
        right = this.MergeSort(right, depth + 1);

        if (depth === 0) {
            console.log(`Merge Sort`);
            console.log(`   count: ${this.count}`);
        }
        return this.merge(left, right);
    }

    /**
     * Merges two sorted arrays into a single sorted array.
     *
     * @remarks
     * This method merges two sorted arrays into a single sorted array.
     *
     * @param left - The left sorted array.
     * @param right - The right sorted array.
     *
     * @returns {string[]} - The merged and sorted array.
     *
     * @beta
     */
    private merge(left, right): string[] {
        let leftIndex = 0;
        let rightIndex = 0;
        let merged = [];

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] > right[rightIndex]) {
                merged.push(right[rightIndex]);
                rightIndex++;
            } else {
                merged.push(left[leftIndex]);
                leftIndex++;
            }
        }

        merged = merged.concat(left.slice(leftIndex));
        merged = merged.concat(right.slice(rightIndex));
        return merged;
    }
}
