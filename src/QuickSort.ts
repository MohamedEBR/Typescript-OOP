// Imports
//Otside Library
import { performance } from "perf_hooks";

/**
 * QuickSort class for sorting an array of strings using the QuickSort algorithm.
 *
 * @remarks
 * This class provides a quicksort implementation to efficiently sort an array of strings.
 * It includes methods for sorting and partitioning, as well as a helper function for finding
 * the median of three values.
 *
 * @beta
 */
export class QuickSort {
    private count: number = 0;

    /**
     * Sorts the input array of strings using the QuickSort algorithm.
     *
     * @remarks
     * This method initiates the quicksort process and logs the runtime and count of iterations.
     *
     * @param arr - The array of strings to be sorted.
     *
     * @beta
     */
    public sort(arr: string[]) {
        this.count = 0; // resets the count before starting a new sort
        const startTime = performance.now();
        this.quicksort(arr, 0, arr.length - 1);
        const endTime = performance.now();
        const runTime = endTime - startTime;
        console.log(`   runtime: ${runTime} milliseconds`);
    }

    /**
     * Recursive function for performing the quicksort algorithm.
     *
     * @remarks
     * This method recursively divides and sorts the array using the quicksort algorithm.
     * It also logs the count of iterations and prints the count when the depth is zero.
     *
     * @param arr - The array of strings to be sorted.
     * @param start - The starting index of the subarray.
     * @param end - The ending index of the subarray.
     * @param depth - The depth of recursion (optional).
     *
     * @beta
     */
    private quicksort(arr: string[], start: number, end: number, depth: number = 0) {
        if (start <= end) {
            this.count++;
            const pivotIndex = this.medianOfThree(arr, start, Math.floor((start + end) / 2), end);
            const pivot = this.partition(arr, start, end, pivotIndex);

            this.quicksort(arr, start, pivot - 1, depth + 1);
            this.quicksort(arr, pivot + 1, end, depth + 1);
            if (depth === 0) {
                console.log(`Quick Sort`);
                console.log(`   count: ${this.count}`);
            }
        }
    }

    /**
     * Partitions the array for the quicksort algorithm.
     *
     * @remarks
     * This method rearranges the elements in the array such that elements smaller than
     * the pivot are on the left and elements larger than the pivot are on the right.
     *
     * @param arr - The array of strings to be sorted.
     * @param start - The starting index of the subarray.
     * @param end - The ending index of the subarray.
     * @param pivotIndex - The index of the pivot element.
     *
     * @returns {number} - The index of the pivot element after partitioning.
     *
     * @beta
     */
    private partition(arr: string[], start: number, end: number, pivotIndex: number): number {
        this.swap(arr, pivotIndex, end);
        const pivot = arr[end];
        let i = start;

        for (let j = start; j < end; j++) {
            if (arr[j] < pivot) {
                this.swap(arr, i, j);
                i++;
            }
        }

        this.swap(arr, i, end);
        return i;
    }

    /**
     * Swaps two elements in the array.
     *
     * @remarks
     * This method swaps the elements at positions a and b in the array.
     *
     * @param arr - The array of strings.
     * @param a - The index of the first element.
     * @param b - The index of the second element.
     *
     * @beta
     */
    private swap(arr: string[], a: number, b: number) {
        const tmp = arr[a];
        arr[a] = arr[b];
        arr[b] = tmp;
    }

    /**
     * Finds the median of three values in the array.
     *
     * @remarks
     * This method compares three values in the array and returns the index of the median value.
     *
     * @param arr - The array of strings.
     * @param i - The index of the first value.
     * @param j - The index of the second value.
     * @param k - The index of the third value.
     *
     * @returns {number} - The index of the median value.
     *
     * @beta
     */
    private medianOfThree(arr: any[], i: number, j: number, k: number): number {
        const a = arr[i];
        const b = arr[j];
        const c = arr[k];

        if ((a - b) * (c - a) >= 0) {
            return i;
        } else if ((b - a) * (c - b) >= 0) {
            return j;
        } else {
            return k;
        }
    }
}
