// Imports the Ranking class from "./Ranking"
import { Ranking } from "./Ranking";

/** 
 * Represents a club with attributes inherited from the Ranking class.
 * Adds specific attributes 'prev_rank' for the previous rank and 'league' for the club's league.
 *
 * @beta
 * @class
 * @export
 */
export class Clubs extends Ranking {

    /**
     * Constructor for the Clubs class.
     *
     * @constructor
     * @param rank - The rank of the club.
     * @param prev_rank - The previous rank of the club.
     * @param name - The name of the club.
     * @param league - The league to which the club belongs.
     * @param off - The offensive stat of the club.
     * @param def - The defensive stat of the club.
     * @param spi - The Schedule Performance Index (SPI) of the club.
     *
     * @beta
     */
    public constructor(
        rank: number,
        private prev_rank: number,
        name: string,
        private league: string,
        off: number,
        def: number,
        spi: number,
    ) {
        // Calls the constructor of the parent class (Ranking) with necessary parameters.
        super(rank, name, off, def, spi);
        // Sets the specific attributes 'prev_rank' and 'league' for the club.
        this.prev_rank = prev_rank;
        this.league = league;
    }

    /**
     * Returns the private attribute 'league'.
     * 
     * @returns {string} - The league of the club.
     *
     * @beta
     */
    public getLeague(): string {
        return this.league;
    }

    /**
     * Returns the private attribute 'prev_rank'.
     * 
     * @returns {number} - The previous rank of the club.
     *
     * @beta
     */
    public getPrevRank(): number {
        return this.prev_rank;
    }
}
