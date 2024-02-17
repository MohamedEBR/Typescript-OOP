// Imports the Ranking class from "./Ranking"
import { Ranking } from "./Ranking";

/** 
 * Represents a country with attributes inherited from the Ranking class.
 * Adds a specific attribute 'confed' for the confederation of the country.
 *
 * @beta
 * @class
 * @export
 */
export class Countries extends Ranking {

    /**
     * Constructor for the Countries class.
     *
     * @constructor
     * @param rank - The rank of the country.
     * @param name - The name of the country.
     * @param confed - The confederation of the country.
     * @param off - The offensive stat of the country.
     * @param def - The defensive stat of the country.
     * @param spi - The Schedule Performance Index (SPI) of the country.
     *
     * @beta
     */
    public constructor(
        rank: number,
        name: string,
        private confed: string,
        off: number,
        def: number,
        spi: number,
    ) {
        // Calls the constructor of the parent class (Ranking) with necessary parameters.
        super(rank, name, off, def, spi);
        // Sets the specific attribute 'confed' for the country.
        this.confed = confed;
    }

    /**
     * Returns the private attribute 'confed'.
     * 
     * @returns {string} - The confederation of the country.
     *
     * @beta
     */
    public getConfed(): string {
        return this.confed;
    }    
}
