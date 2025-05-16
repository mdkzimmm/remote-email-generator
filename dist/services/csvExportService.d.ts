import { EmailSequence } from '../types';
/**
 * Service for exporting email sequences to CSV format
 */
export declare class CsvExportService {
    /**
     * Export email sequences to a CSV file
     * @param sequences Email sequences to export
     * @param companyName Company name for the file name
     * @returns Path to the exported CSV file
     */
    exportToCSV(sequences: EmailSequence[], companyName: string): Promise<string>;
}
