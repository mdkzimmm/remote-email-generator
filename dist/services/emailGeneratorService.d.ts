import { AccountBrief, EmailGenerationOptions, EmailSequence } from "../types";
/**
 * Service for generating personalized email sequences
 */
export declare class EmailGeneratorService {
    /**
     * Generate email sequences for all priority contacts in an account brief
     * @param accountBrief The parsed account brief
     * @param options Email generation options
     * @returns Email sequences for each contact
     */
    generateEmailSequences(accountBrief: AccountBrief, options?: EmailGenerationOptions): EmailSequence[];
    /**
     * Generate a personalized email sequence for a specific contact
     * @param contact The priority contact
     * @param accountBrief The account brief
     * @param options Email generation options
     * @returns Email sequence for the contact
     */
    private generateSequenceForContact;
    /**
     * Generate the pain point introduction email
     */
    private generatePainPointEmail;
    /**
     * Generate the case study email
     */
    private generateCaseStudyEmail;
    /**
     * Generate the objection handling email
     */
    private generateObjectionHandlingEmail;
    /**
     * Generate the value-add email
     */
    private generateValueAddEmail;
    /**
     * Generate the relationship continuation email
     */
    private generateRelationshipEmail;
}
