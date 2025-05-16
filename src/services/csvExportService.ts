import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';
import fs from 'fs';
import { EmailSequence } from '../types';

/**
 * Service for exporting email sequences to CSV format
 */
export class CsvExportService {
  /**
   * Export email sequences to a CSV file
   * @param sequences Email sequences to export
   * @param companyName Company name for the file name
   * @returns Path to the exported CSV file
   */
  async exportToCSV(sequences: EmailSequence[], companyName: string): Promise<string> {
    try {
      // Create output directory if it doesn't exist
      const outputDir = path.join(process.cwd(), 'output');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      // Generate file name with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = `${companyName.replace(/[^a-zA-Z0-9]/g, '_')}_emails_${timestamp}.csv`;
      const outputPath = path.join(outputDir, fileName);
      
      // Create CSV writer
      const csvWriter = createObjectCsvWriter({
        path: outputPath,
        header: [
          { id: 'contactName', title: 'Contact Name' },
          { id: 'contactTitle', title: 'Contact Title' },
          { id: 'contactEmail', title: 'Contact Email' },
          { id: 'contactPersona', title: 'Persona' },
          { id: 'emailNumber', title: 'Email Number' },
          { id: 'emailType', title: 'Email Type' },
          { id: 'subject', title: 'Subject' },
          { id: 'body', title: 'Body' }
        ]
      });
      
      // Format data for CSV export
      const records = sequences.flatMap(sequence => {
        return sequence.emails.map((email, index) => {
          return {
            contactName: sequence.contact.name,
            contactTitle: sequence.contact.title,
            contactEmail: sequence.contact.email || '',
            contactPersona: sequence.contact.persona,
            emailNumber: index + 1,
            emailType: email.type,
            subject: email.subject,
            body: email.body
          };
        });
      });
      
      // Write data to CSV
      await csvWriter.writeRecords(records);
      
      return outputPath;
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      throw new Error(`Failed to export email sequences to CSV: ${(error as Error).message}`);
    }
  }
}