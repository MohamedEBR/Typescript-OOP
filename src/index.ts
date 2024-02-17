/*
  Assignment:  Data Structures and Algorithms
  Name:        Global Football Ranking
  Purpose:     To visualize data from a football ranking website

  Author:      Mohamed Ebraheem
  Created:     22-Sep-2023
  Updated:     30-Nov-2023
*/
//---------------------------------------------------------------------------

// Importing necessary classes
import { CSVEditor } from './CSVEditor';
import { JsonEditor } from './JsonEditor';

// JSON file paths
const countriesRankingFilePath = '../data/spi_global_rankings_intl.json';
const clubsRankingFilePath = '../data/spi_global_rankings.json';

// Create instances of JsonEditor for Countries and Clubs with their respective JSON data
const countriesObject = new JsonEditor(countriesRankingFilePath, 'country');
const clubsObject = new JsonEditor(clubsRankingFilePath, 'club');

countriesObject.linearSearch(169)
// countriesObject.binarySearchIterative(169)
countriesObject.binarySearchRecursive(169)

// countriesObject.bubbleSortFile()
// countriesObject.mergeSortFile()
// countriesObject.quickSortFile()





