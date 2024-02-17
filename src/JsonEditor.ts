// Imports
//outside Library
import * as fs from 'fs';
import { FileEditor } from './FileEditor';
import { QuickSort } from './QuickSort';
import { MergeSort } from './MergeSort';
import { BubbleSort } from './BubbleSort';

/**
 * Extends the FileEditor class to add specific functionality for JSON data manipulation.
 *
 * @beta
 * @class
 * @extends FileEditor
 * @export
 */
export class JsonEditor extends FileEditor {
    /**
     * Constructor for JsonEditor class.
     *
     * @param filePath - The JSON file path for either clubs or countries.
     * @param team - The team of either clubs (league) or countries (confederation).
     *
     * @beta
     */
    public constructor(filePath: string, team: string) {
        // Calls the constructor of the base class (FileEditor)
        super(filePath, team);
    }

    /**
     * Retrieves and logs the segmented data from a JSON file based on the rank range.
     *
     * Overrides the base class method to provide a more efficient implementation.
     *
     * @param startRank - The starting rank for segmentation.
     * @param endRank - The ending rank for segmentation.
     *
     * @returns {object[] | null} - An array of objects with the specified rank range or null if not found.
     *
     * @beta
     */
    public getSegmentedDataByRank(startRank: number, endRank: number): object[] | null {
        try {
            // Read and parse JSON data
            const data: any[] = JSON.parse(fs.readFileSync(this.getFilePath(), 'utf-8'));

            // Filter data based on rank range
            const filteredData = data.filter(obj => obj.rank >= startRank && obj.rank <= endRank);

            // Log the filtered data to the console
            if (filteredData.length > 0) {
                console.log(`Objects with rank between ${startRank} and ${endRank}:`, filteredData);
                return filteredData;
            } else {
                console.log(`No objects found with rank between ${startRank} and ${endRank}`);
                return null;
            }
        } catch (error) {
            console.error('Error reading or parsing the JSON file:', error);
            return null;
        }
    }

    /**
     * Adds a random address (city and zip) to the JSON data for each team.
     *
     * @param fileName - The name of the new JSON file with added address data.
     *
     * @beta
     */
    public setAddressData(fileName: string) {
        try {
            // Read the JSON file
            const jsonData = JSON.parse(fs.readFileSync(this.getFilePath(), 'utf-8'));

            // Use faker to generate a random address for each team
            jsonData.forEach((team) => {
                if (this.getTeam() == 'club') {
                    team.location = { 
                        city : this.generateRandomAddress().city, 
                        zip : this.generateRandomAddress().zip};
                } else if (this.getTeam() == 'country') {
                    team.location = {
                        country_Code : this.generateRandomAddress().countryCode
                    }
                }
            });

            // Write the updated data back to the file
            const updatedDataString = JSON.stringify(jsonData, null, 2);
            fs.writeFileSync(`../data/${fileName}.json`, updatedDataString, 'utf-8');

            console.log('Random address added to JSON data successfully!');
        } catch (error) {
            console.error('Error reading or writing the JSON file:', error);
        }
    }

    //SORTING FILES ACCORDING TO NAMES

   /**
 * Sorts the JSON file data using the QuickSort algorithm based on the 'name' property.
 *
 * @remarks
 * This method uses the QuickSort algorithm to efficiently sort the data by names.
 * The sorted data is then written to a new JSON file.
 *
 * @beta
 */
public quickSortFile() {
    const rawData = fs.readFileSync(this.getFilePath(), 'utf8');
    const data = JSON.parse(rawData);

    // Extract names from the data
    const names = data.map((item: any) => item.name);

    // Create an instance of Quicksort and sort the names
    const quicksortInstance = new QuickSort();
    quicksortInstance.sort(names);

    // Create a new array of objects with sorted names
    const sortedData = names.map((name: string, index: number) => {
        const originalIndex = data.findIndex((item: any) => item.name === name);
        return data[originalIndex];
    });

    // Write the sorted array to a new JSON file
    const outputFileName = './sortedData/quickSortDataFile.json';
    fs.writeFileSync(outputFileName, JSON.stringify(sortedData, null, 2));

    console.log(`Sorted data has been written to ${outputFileName}`);
}

/**
 * Sorts the JSON file data using the MergeSort algorithm based on the 'name' property.
 *
 * @remarks
 * This method uses the MergeSort algorithm to efficiently sort the data by names.
 * The sorted data is then written to a new JSON file.
 *
 * @beta
 */
public mergeSortFile() {
    // Read JSON data from file
    const rawData = fs.readFileSync(this.getFilePath(), 'utf8');
    const data = JSON.parse(rawData);

    // Extract names from the data
    const names = data.map((item: any) => item.name);

    // Create an instance of MergeSort and sort the names
    const mergeSortInstance = new MergeSort();
    const sortedNames = mergeSortInstance.sort(names);

    // Create a new array of objects with sorted names
    const sortedData = sortedNames.map((name: string, index: number) => {
        const originalIndex = data.findIndex((item: any) => item.name === name);
        return data[originalIndex];
    });

    // Write the sorted array to a new JSON file
    const outputFileName = './sortedData/mergeSortDataFile.json';
    fs.writeFileSync(outputFileName, JSON.stringify(sortedData, null, 2));

    console.log(`Sorted data using MergeSort has been written to ${outputFileName}`);
}

/**
 * Sorts the data in a JSON file using Bubble Sort and writes the result to a new file.
 *
 * @remarks
 * This method reads JSON data from a file, extracts names, sorts them using Bubble Sort,
 * and writes the sorted data back to a new JSON file.
 *
 * @param inputFilePath - The path to the JSON file containing the unsorted data.
 *
 * @beta
 */
public bubbleSortFile(): void {
    // Read JSON data from file
    const rawData = fs.readFileSync(this.getFilePath(), 'utf8');
    const data = JSON.parse(rawData);

    // Extract names from the data
    const names = data.map((item: any) => item.name);

    // Create an instance of BubbleSort and sort the names
    const bubbleSortInstance = new BubbleSort();
    const sortedNames = bubbleSortInstance.sort(names);

    // Create a new array of objects with sorted names
    const sortedData = sortedNames.map((name: string, index: number) => {
        const originalIndex = data.findIndex((item: any) => item.name === name);
        return data[originalIndex];
    });

    // Write the sorted array to a new JSON file
    const outputFileName = './sortedData/bubbleSortDataFile.json';
    fs.writeFileSync(outputFileName, JSON.stringify(sortedData, null, 2));

    console.log(`Sorted data using BubbleSort has been written to ${outputFileName}`);
}

/**
 * Performs a linear search on the JSON file data based on the 'rank' property.
 *
 * @remarks
 * This method iterates through the data to find the object with the specified rank.
 * It logs the count of checks and the runtime.
 *
 * @param target - The target rank to search for.
 *
 * @returns {object | number} - The object with the specified rank or -1 if not found.
 *
 * @beta
 */
public linearSearch(target: number): object | number {
    const rawData = fs.readFileSync(this.getFilePath(), 'utf8');
    const data = JSON.parse(rawData);

    for (let i = 0; i < data.length; i++) {
        const startTime = performance.now();
        if (data[i].rank === target) {
            console.log(`Linear Search:`)
            console.log(`   count: ${i}`);
            const endTime = performance.now();
            console.log(`   runtime = ${endTime - startTime} milliseconds`);
            return data[i];
        }
    }
    return -1; // indicates the target was not found
}

/**
 * Performs an iterative binary search on the JSON file data based on the 'rank' property.
 *
 * @remarks
 * This method uses an iterative binary search algorithm to efficiently find the object with the specified rank.
 * It logs the count of checks and the runtime.
 *
 * @param target - The target rank to search for.
 *
 * @returns {object | null} - The object with the specified rank or null if not found.
 *
 * @beta
 */
public binarySearchIterative(target: number): object | null {
    const rawData = fs.readFileSync(this.getFilePath(), 'utf8');
    const data = JSON.parse(rawData);
    let low = 0;
    let high = data.length - 1;
    let count = 0;
    while (low <= high) {
        const startTime = performance.now();

        const mid = Math.floor((low + high) / 2);
        const midRank = data[mid].rank;

        if (target < midRank) {
            high = mid - 1;
            count++;
        } else if (target > midRank) {
            low = mid + 1;
            count++;
        } else {
            const endTime = performance.now();
            console.log('Binary Search Iterative')
            console.log(`   count: ${count}`);
            console.log(`   runtime = ${endTime - startTime} milliseconds`);
            return data[mid];
        }
    }
    // Arbitrary value to signify non-existence.
    return null;
}

/**
 * Performs a recursive binary search on the JSON file data based on the 'rank' property.
 *
 * @remarks
 * This method uses a recursive binary search algorithm to efficiently find the object with the specified rank.
 * It logs the count of checks and the runtime.
 *
 * @param target - The target rank to search for.
 *
 * @returns {object | number} - The object with the specified rank or -1 if not found.
 *
 * @beta
 */
public binarySearchRecursive(target: number): object | number {
    const rawData = fs.readFileSync(this.getFilePath(), 'utf8');
    const data = JSON.parse(rawData);
    const startTime = performance.now();
    let search = this.binarySearchRecursiveAux(data, target, 0, data.length - 1);
    const endTime = performance.now();
    console.log(`   runtime = ${endTime - startTime} milliseconds`);
    return search;
}

/**
 * Auxiliary function for recursive binary search.
 *
 * @remarks
 * This function is used by the recursive binary search to perform the search.
 *
 * @param arr - The array of data to search.
 * @param target - The target rank to search for.
 * @param low - The low index of the search range.
 * @param high - The high index of the search range.
 * @param count - The count of checks (optional).
 *
 * @returns {object | number} - The object with the specified rank or -1 if not found.
 *
 * @beta
 */
private binarySearchRecursiveAux(arr, target: number, low: number, high: number, count = 0): object | number {
    const mid = Math.floor((low + high) / 2);
    if (low > high) return -1;

    if (target < arr[mid].rank) {
        return this.binarySearchRecursiveAux(arr, target, low, mid - 1, count + 1);
    } else if (target > arr[mid].rank) {
        return this.binarySearchRecursiveAux(arr, target, mid + 1, high, count + 1);
    } else {
        console.log(`Binary Search Recursive`)
        console.log(`   count: ${count}`);
        return arr[mid];
    }
}
}
