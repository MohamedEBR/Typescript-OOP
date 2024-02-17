import { performance } from "perf_hooks";

/**
 * BubbleSort class for sorting an array of strings using the Bubble Sort algorithm.
 *
 * @remarks
 * This class provides a bubble sort implementation to efficiently sort an array of strings.
 * It includes methods for sorting and details on how the algorithm works.
 *
 * @beta
 */
export class BubbleSort {
    private count: number = 0;

    /**
     * Sorts the input array of strings using the Bubble Sort algorithm.
     *
     * @remarks
     * This method initiates the bubble sort process, logs the runtime, and count of iterations.
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
        // Sort array using bubble sort
        this.bubbleSort(arr);
        const endTime = performance.now();
        const runTime = endTime - startTime;
        console.log(`   runtime: ${runTime} milliseconds`);
        return arr;
    }

    /**
     * Performs the Bubble Sort algorithm on the input array.
     *
     * @remarks
     * This method iteratively compares and swaps adjacent elements until the array is sorted.
     * It also logs the count of iterations and prints the count.
     *
     * @param arr - The array of strings to be sorted.
     *
     * @beta
     */
    private bubbleSort(arr: string[]): void {
        const n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                // Compare adjacent elements and swap if necessary
                if (arr[j] > arr[j + 1]) {
                    this.swap(arr, j, j + 1);
                }
                this.count++;
            }
        }
        console.log(`Bubble Sort`);
        console.log(`   count: ${this.count}`);
    }

    /**
     * Swaps two elements in the input array.
     *
     * @remarks
     * This method swaps two elements in the array at the specified indices.
     *
     * @param arr - The array in which elements are to be swapped.
     * @param a - The index of the first element to be swapped.
     * @param b - The index of the second element to be swapped.
     *
     * @beta
     */
    private swap(arr: string[], a: number, b: number): void {
        const tmp = arr[a];
        arr[a] = arr[b];
        arr[b] = tmp;
    }
}
