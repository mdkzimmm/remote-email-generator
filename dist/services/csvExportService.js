"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvExportService = void 0;
const csv_writer_1 = require("csv-writer");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
/**
 * Service for exporting email sequences to CSV format
 */
class CsvExportService {
    /**
     * Export email sequences to a CSV file
     * @param sequences Email sequences to export
     * @param companyName Company name for the file name
     * @returns Path to the exported CSV file
     */
    async exportToCSV(sequences, companyName) {
        try {
            // Create output directory if it doesn't exist
            const outputDir = path_1.default.join(process.cwd(), 'output');
            if (!fs_1.default.existsSync(outputDir)) {
                fs_1.default.mkdirSync(outputDir, { recursive: true });
            }
            // Generate file name with timestamp
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const fileName = `${companyName.replace(/[^a-zA-Z0-9]/g, '_')}_emails_${timestamp}.csv`;
            const outputPath = path_1.default.join(outputDir, fileName);
            // Create CSV writer
            const csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
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
        }
        catch (error) {
            console.error('Error exporting to CSV:', error);
            throw new Error(`Failed to export email sequences to CSV: ${error.message}`);
        }
    }
}
exports.CsvExportService = CsvExportService;
//# sourceMappingURL=csvExportService.js.map