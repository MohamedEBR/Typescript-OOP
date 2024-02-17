// Imports the Statistics interface from Types.ts
import { Statistics } from './Types';

/** 
 * Creates objects that carry the attributes of each club or country within the JSON Files.
 * Implements the Statistics interface for type-checking.
 *
 * @beta
 * @class
 * @export
 */
export class Ranking implements Statistics {

  // Private Attribute rank
  private rank: number;
  // Private Attribute name
  private name: string;
  // Private Attribute off
  private off: number;
  // Private Attribute def
  private def: number;
  // Private Attribute spi
  private spi: number;
  // Private Attribute avgOff
  private avgOff: number | null = null;
  // Private Attribute avgDef
  private avgDef: number | null = null;
  // Private Attribute avgSpi
  private avgSpi: number | null = null;

  /**  
   * Constructor for the Ranking class.
   *
   * @constructor
   * @param rank - The rank of the country/club.
   * @param name - The name of the country/club.
   * @param off - The offensive stat of the country/club.
   * @param def - The defensive stat of the country/club.
   * @param spi - The Schedule Performance Index (SPI) of the country/club.
   *
   * @beta
   */
  public constructor(
    rank: number,
    name: string,
    off: number,
    def: number,
    spi: number,
  ) {
    this.rank = rank;
    this.name = name;
    this.off = off;
    this.def = def;
    this.spi = spi;
  }

 /**
   * Returns the private attribute rank.
   * 
   * @returns {number} - The rank of the country/club.
   *
   * @beta
   */
  public getRank(): number {
    return this.rank;
  }
  
   /**
   * Returns the private attribute name.
   * 
   * @returns {string} - The name of the country/club.
   *
   * @beta
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Returns the private attribute off.
   * 
   * @returns {number} - The offensive stat of the country/club.
   *
   * @beta
   */
  public getOff(): number {
    return this.off;
  }

    /**
   * Returns the private attribute def.
   * 
   * @returns {number} - The defensive stat of the country/club.
   *
   * @beta
   */
  public getDef(): number {
    return this.def;
  }

    /**
   * Returns the private attribute spi.
   * 
   * @returns {number} - The Schedule Performance Index (SPI) of the country/club.
   *
   * @beta
   */
  public getSpi(): number {
    return this.spi;
  }

   /**
   * Returns the private attribute avgOff.
   * 
   * @returns {number | null} - The average offensive stat of all countries/clubs.
   *
   * @beta
   */
  public getAvgOff(): number | null {
    return this.avgOff;
  }

   /**
   * Returns the private attribute avgDef.
   * 
   * @returns {number | null} - The average defensive stat of all countries/clubs.
   *
   * @beta
   */
  public getAvgDef(): number | null {
    return this.avgDef;
  }

   /**
   * Returns the private attribute avgSpi.
   * 
   * @returns {number | null} - The average Schedule Performance Index (SPI) of all countries/clubs.
   *
   * @beta
   */
  public getAvgSpi(): number | null {
    return this.avgSpi;
  }

  /**
   * Provides the average stats of either offensive, defensive, or SPI of all countries, clubs.
   * TASK: INTEGER DIVISION
   *
   * @param  allStats - The array of stats of all countries/clubs.
   *
   * @returns {string} - The average value of the array.
   *
   * @beta
   */
  public setAvg(allStats: number[]): string {
    let divident: number = 0;
    // Adds all values of the stats and stores them in divident.
    for (const i in allStats) {
      divident += allStats[i];
    }
    // Divides the divident with the divisor to get the average.
    const divisor = allStats.length;
    const quotient = divident / divisor;
    return quotient.toFixed(2);
  }

  /** 
   * Gets all the offense, defense, and SPI stats from an object stored in an array
   * and stores their averages in the 3 attributes: avgOff, avgDef, avgSpi.
   * TASK: TYPE CONVERSION
   *
   * @param  data - The array of data containing the clubs and countries.
   *
   * @returns {void}
   *
   * @beta
  */
  public setAverages(data : any[]): void {
    const offValues: number[] = [];
    const defValues: number[] = [];
    const spiValues: number[] = [];

    // Gets the stats and stores them in each array.
    for (const obj of data) {
      offValues.push(obj.getOff());
      defValues.push(obj.getDef());
      spiValues.push(obj.getSpi());
    }

    // TYPE CONVERSION
    // Parses the stats values into floats and sets the average.
    this.avgOff = parseFloat(this.setAvg(offValues));
    this.avgDef = parseFloat(this.setAvg(defValues));
    this.avgSpi = parseFloat(this.setAvg(spiValues));
  }
}
