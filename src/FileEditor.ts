// Imports
// Otside Libraries
import * as fs from 'fs';
import { faker } from '@faker-js/faker';


import { Clubs } from './Clubs';
import { Countries } from './Countries';

/** 
 * Manages reading, writing, and editing files, and performs operations on JSON data.
 *
 * @beta
 * @class
 * @export
 */
export class FileEditor {
  // Private attributes
  private filePath: string;
  private team: string;

  /** 
   * Constructor for FileEditor class.
   *
   * @param filePath - The JSON file path for either clubs or countries.
   * @param team - The team of either clubs (league) or countries (confederation).
   *
   * @beta
   */
  public constructor(filePath: string, team: string) {
    this.filePath = filePath;
    this.team = team;
  }

  /** 
   * Returns the file path.
   *
   * @return - The JSON file of clubs/countries.
   *
   * @beta
   */
  public getFilePath() {
    return this.filePath;
  }

  /** 
   * Returns the team (club/league or country/confederation).
   *
   * @return - The team of club (league) or country (confederation).
   * 
   * @beta
   */
  public getTeam() {
    return this.team;
  }

  /** 
   * Asynchronously creates a CSV file with all the JSON Objects.
   *
   * This method reads the JSON data from the specified file path, converts it into an array of objects,
   * and then generates a CSV file using the `setJSONToCSV` method.
   *
   * @param fileName - The name of the new CSV file.
   *
   * @beta
   */
  public async setCSVFile(fileName: string) {
    try {
      // Retrieve JSON data
      const rankings = await this.getJSONData();
      
      // Create and save CSV file
      this.setJSONToCSV(rankings, fileName);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  /** 
   * Gets data based on the specified rank.
   *
   * This method reads the JSON data from the specified file path, parses it, and searches for an object
   * with the specified rank. If found, the object is logged to the console; otherwise, null is returned.
   *
   * @param target - The target rank to search for in the JSON data.
   *
   * @returns {object | null} - The object with the specified rank or null if not found.
   *
   * @beta
   */
  public getDataByRank(target: number)  {
    try {
      // Read and parse JSON data
      const data = JSON.parse(fs.readFileSync(this.getFilePath(), 'utf-8'));

      // Find object with the specified rank
      const result = data.find(obj => obj.rank === target);

      // Log the result to the console
      console.log(result);

      // Return the result (object or null)
      return result;
    } catch (error) {
      console.error('Error reading or parsing the JSON file:', error);
      return null;
    }
  }

  /** 
   * Writes a CSV version of the clubs/countries JSON file.
   *
   * @param objArray - The JSON objects of Clubs/Countries stored in an array.
   * @param keys - The keys of the JSON objects of Clubs/Countries.
   *
   * @return - All the JSON data printed in CSV format.
   *
   * @beta
   (private)
   */
  private JSONToCSV(objArray: string[] | number[], keys: string[]): string {
    // Provides the column headers and data below them, places ',' in between to look like CSV format
    return [keys.join(','), ...objArray.map(
      // Formats the data to fall under each column of keys, if the data is undefined then it is replaced by an empty string
      (row: any) => keys.map((k: any) => row[k] || '').join(',')
      // When one object is read, it is separated from the other object using a newline
    )].join('\n');
  }

  /** 
   * Sets the JSON File into a CSV file otherwise displays the error.
   *
   * @param objArray - The JSON objects of Clubs/Countries stored in an array.
   * @param fileName - The name of the new CSV File.
   *
   * @beta
   */
  public setJSONToCSV(objArray: string[] | number[], fileName: string) {
    try {
      let keys = []
      if (this.getTeam() == 'club') {
        // Creates the keys for clubs
        keys = ['rank', 'prev_rank', 'name', 'league', 'off', 'def', 'spi'];
      } else {
        // Creates the keys for countries
        keys = ['rank', 'name', 'confed', 'off', 'def', 'spi'];
      }
      // Stores CSV data into a constant 
      const csvData = this.JSONToCSV(objArray, keys);
      
      // Writes the CSV file into the chosen file name
      fs.writeFile(`../data/${fileName}.csv`, csvData, 'utf8', function(err) {
        if (err) {
          console.log('Some error occurred - file either not saved or corrupted file saved.');
        } else {
          console.log('It\'s saved!');
        }
      });
    } catch (jsonErr) {
      console.error('Error parsing JSON:', jsonErr);
    }
  }

  /** 
   * Creates JSON Objects and stores them in an array.
   *
   * @returns {Promise<any[]>} - A promise that resolves with an array of JSON objects (Clubs or Countries).
   *
   * @beta
   */
  public getJSONData(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      // Initialize an array to store ranking objects
      const rankings: any[] = [];
  
      // Read the JSON file
      fs.readFile(this.getFilePath(), 'utf8', (err, data) => {
        // Handle any errors that might occur during file reading
        if (err) {
          console.error('Error reading JSON file:', err);
          reject(err);
          return;
        }
        
        try {
          // Parse the JSON data
          const jsonRankings = JSON.parse(data);
  
          // Create Ranking objects from JSON data
          for (const i in jsonRankings) {
            const objectData = jsonRankings[i];
  
            let object: any;
            if (this.getTeam() == 'club') {
              object = new Clubs(
                objectData.rank,
                objectData.prev_rank,
                objectData.name,
                objectData.league,
                objectData.off,
                objectData.def,
                objectData.spi,
              );
            } else {
              object = new Countries(
                objectData.rank,
                objectData.name,
                objectData.confed,
                objectData.off,
                objectData.def,
                objectData.spi,
              );
            }
  
            // Stores the objects in the rankings array
            rankings.push(object);
          }
          resolve(rankings);
        } catch (jsonErr) {
          // Handle errors that might occur during JSON parsing
          console.error('Error parsing JSON:', jsonErr);
          reject(jsonErr);
        }
      });
    });
  }

  /** 
   * Segments the JSON data based on the rank property within a specified range.
   *
   * @param startRank - The starting rank for segmentation.
   * @param endRank - The ending rank for segmentation.
   *
   * @returns {Promise<T[] | null>} - A promise that resolves with the segmented data.
   *
   * @beta
   */
  private async segmentDataByRank<T extends { rank: number }>(startRank: number, endRank: number): Promise<T[] | null> {
    try {
      // Retrieve all data from the JSON file
      const allData = await this.getJSONData();
  
      // Cast the retrieved data to an array of objects with 'rank' property
      const allDataArray = allData as T[];
  
      // Filter data based on rank range
      const segmentedData = allDataArray.filter((obj) => obj.rank >= startRank && obj.rank <= endRank);
  
      // Return the segmented data
      return segmentedData;
    } catch (error) {
      // Handle any errors that might occur during the segmentation process
      console.error(error);
      throw error;
    }
  }

  /** 
   * Retrieves and logs the segmented data from a JSON file based on the rank range.
   *
   * @param startRank - The starting rank for segmentation.
   * @param endRank - The ending rank for segmentation.
   *
   * @beta
   */
  public getSegmentedDataByRank<T extends { rank: number }>(startRank: number, endRank: number) {
    // Call the segmentDataByRank method to get the segmented data
    this.segmentDataByRank<T>(startRank, endRank)
        .then((data) => {
            // Log the segmented data to the console
            console.log(data);
        })
        .catch((error) => {
            // Handle any errors that might occur during the segmentation process
            console.log(error);
        });
  }

  /** 
   * Generates a random location for both Clubs and Countries, but mostly countries.
   *
   * @returns {Object} - An object with randomly generated city and zip code and country code
   *
   * @beta
   */
  public generateRandomAddress(): { city: string; zip: string, countryCode : string } {
    return {
      city: faker.location.city(),
      zip: faker.location.zipCode(),
      countryCode : faker.location.countryCode()
    };
  }


}
