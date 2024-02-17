// Imports
import * as fs from 'fs';
//IMported Library
import * as csv from 'fast-csv'; // documentation https://c2fo.github.io/fast-csv/docs/introduction/example
import { FileEditor } from './FileEditor';

/**
 * Extends the FileEditor class to add specific functionality for CSV data manipulation.
 *
 * @beta
 * @class
 * @extends FileEditor
 * @export
 */
export class CSVEditor extends FileEditor {
    /**
     * Constructor for CSVEditor class.
     *
     * @param filePath - The CSV file path for either clubs or countries.
     * @param team - The team of either clubs (league) or countries (confederation).
     *
     * @beta
     */
    public constructor(filePath: string, team: string) {
        // Calls the constructor of the base class (FileEditor)
        super(filePath, team);
    }

    /**
     * Overrides the base class method to deal with CSV parse, searches through data and returns a row by the rank.
     *
     * @param target - The rank to search for (default is 1).
     *
     * @returns {void}
     *
     * @beta
     */
    public getDataByRank(target: number = 1): void {
        try {
            const results: any[] = [];

            fs.createReadStream(this.getFilePath())
                .pipe(csv.parse())
                .on('data', (data: any) => {
                    if (data[0] !== 'rank') {
                        results.push(data);
                    }
                })
                .on('end', () => {
                    const result = results.find(row => parseInt(row[0]) === target);
                    if (result) {
                        console.log(result);
                    } else {
                        console.log(`No row with ${target}`);
                    }
                });
        } catch (error) {
            console.error(`Error reading CSV file: ${error}`);
        }
    }

    /**
     * Overrides the base class method to deal with CSV parse, display rows based on rank range.
     *
     * @param startRank - The starting rank for segmentation.
     * @param endRank - The ending rank for segmentation.
     *
     * @returns {string[][] | null} - An array of string arrays with the specified rank range or null if not found.
     *
     * @beta
     */
    public getSegmentedDataByRank(startRank: number, endRank: number): string[][] | null {
        try {
            const results: string[][] = [];

            fs.createReadStream(this.getFilePath())
                .pipe(csv.parse())
                .on('data', (data: string[]) => {
                    const currentRank = parseInt(data[0]);
                    if (currentRank >= startRank && currentRank <= endRank) {
                        results.push(data);
                    }
                })
                .on('end', () => {
                    if (results.length > 0) {
                        console.log(`Rows with rank between ${startRank} and ${endRank}:`, results);
                    } else {
                        console.log(`No rows found with rank between ${startRank} and ${endRank}`);
                    }
                });

            return results.length > 0 ? results : null;
        } catch (error) {
            console.error('Error reading or parsing the CSV file:', error);
            return null;
        }
    }

    /**
     * Overrides the base class method to add city and zip to the CSV data.
     *
     * @param fileName - The name of the new CSV file with added address data.
     *
     * @returns {void}
     *
     * @beta
     */
    public setAddressData(fileName: string): void {
        const teams = [];
        let count = 0;
        const city = ['city'];
        const zip = ['zip'];
        const countryCode = ['country code']

        fs.createReadStream(this.getFilePath())
            .pipe(csv.parse({ delimiter: ',' })) // Skip header row
            .on('data', (row) => {
                const randomAddress = this.generateRandomAddress();

                if (this.getTeam() == 'club') {
                const team = {
                    rank: row[0],
                    name: row[1],
                    team: row[2],
                    off: row[3],
                    def: row[4],
                    spi: row[5],
                    city: city[count],
                    zip: zip[count]
                };
                teams.push(team);
                count++;
                city.push(randomAddress.city);
                zip.push(randomAddress.zip);
            } else if (this.getTeam() == 'country') {
                const team = {
                    rank: row[0],
                    name: row[1],
                    team: row[2],
                    off: row[3],
                    def: row[4],
                    spi: row[5],
                    countryCode: countryCode[count]
                };
                teams.push(team);
                count++;
                countryCode.push(randomAddress.countryCode);
            }})
            .on('end', () => {
                const outputFilePath = `../data/${fileName}.csv`;

                const writableStream = fs.createWriteStream(outputFilePath);

                writableStream.on('finish', () => {
                    console.log('Random addresses added to CSV data successfully!');
                });

                csv.write(teams)
                    .pipe(writableStream);
            });
    }
}