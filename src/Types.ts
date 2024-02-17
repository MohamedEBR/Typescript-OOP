/**
 * Interface representing statistics for a ranking.
 * It includes methods to retrieve various statistics such as rank, name, association, off, def, and spi.
 *
 * @interface
 * @export
 * @beta
 */
export interface Statistics {
    getRank() : number;
    getName(): string;
    getOff(): number;
    getDef(): number;
    getSpi(): number;
  }
  
  
  
  /**
   * Represents a row in a CSV file where keys are strings.
   * The values are also strings since CSV data is typically represented as strings.
   *
   * @type
   * @export
   * @beta
   */
  export type CsvRow = { [key: string]: string };