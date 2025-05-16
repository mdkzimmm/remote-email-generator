"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailGeneratorService = void 0;
const types_1 = require("../types");
const personas_1 = require("../data/personas");
/**
 * Service for generating personalized email sequences
 */
class EmailGeneratorService {
    /**
     * Generate email sequences for all priority contacts in an account brief
     * @param accountBrief The parsed account brief
     * @param options Email generation options
     * @returns Email sequences for each contact
     */
    generateEmailSequences(accountBrief, options = {
        includeSubjects: true,
        maxEmailsPerContact: 5,
        personalize: true
    }) {
        const sequences = [];
        // Generate email sequences for each priority contact
        for (const contact of accountBrief.priorityContacts) {
            const emailSequence = this.generateSequenceForContact(contact, accountBrief, options);
            sequences.push(emailSequence);
        }
        return sequences;
    }
    /**
     * Generate a personalized email sequence for a specific contact
     * @param contact The priority contact
     * @param accountBrief The account brief
     * @param options Email generation options
     * @returns Email sequence for the contact
     */
    generateSequenceForContact(contact, accountBrief, options) {
        const emails = [];
        const personaAttributes = personas_1.personaFramework[contact.persona];
        // Generate each email type
        if (options.maxEmailsPerContact >= 1) {
            emails.push(this.generatePainPointEmail(contact, accountBrief, personaAttributes, options));
        }
        if (options.maxEmailsPerContact >= 2) {
            emails.push(this.generateCaseStudyEmail(contact, accountBrief, personaAttributes, options));
        }
        if (options.maxEmailsPerContact >= 3) {
            emails.push(this.generateObjectionHandlingEmail(contact, accountBrief, personaAttributes, options));
        }
        if (options.maxEmailsPerContact >= 4) {
            emails.push(this.generateValueAddEmail(contact, accountBrief, personaAttributes, options));
        }
        if (options.maxEmailsPerContact >= 5) {
            emails.push(this.generateRelationshipEmail(contact, accountBrief, personaAttributes, options));
        }
        return {
            contact,
            emails
        };
    }
    /**
     * Generate the pain point introduction email
     */
    generatePainPointEmail(contact, accountBrief, personaAttributes, options) {
        // Select relevant pain points for the persona
        const relevantPainPoints = accountBrief.painPoints.filter(painPoint => {
            return personaAttributes.painPoints.some((personaPain) => painPoint.toLowerCase().includes(personaPain.toLowerCase().split(' ')[0]));
        });
        // Select trigger events for urgency
        const triggerEvent = accountBrief.triggerEvents.length > 0
            ? accountBrief.triggerEvents[0]
            : "";
        // Generate subject line
        const subject = options.includeSubjects
            ? `${personaAttributes.painPoints[0].split(' ')[0]} challenges at ${accountBrief.companyName}`
            : "";
        // Generate email body with personalization
        let body = `Hi ${contact.name.split(' ')[0]},\n\n`;
        if (options.personalize) {
            body += `I noticed ${accountBrief.companyName} has been ${triggerEvent ? `focusing on ${triggerEvent.toLowerCase()}` : `expanding your global operations`} recently. Many ${personaAttributes.type.toLowerCase()} professionals I work with are facing challenges with ${relevantPainPoints.length > 0 ? relevantPainPoints[0].toLowerCase() : personaAttributes.painPoints[0].toLowerCase()}.\n\n`;
        }
        else {
            body += `I hope this email finds you well. I'm reaching out because many ${personaAttributes.type.toLowerCase()} professionals are facing challenges with ${personaAttributes.painPoints[0].toLowerCase()}.\n\n`;
        }
        body += `At Remote.com, we help companies like ${accountBrief.companyName} solve these exact challenges by providing a complete platform that ${personaAttributes.valueProps[0].toLowerCase()}.\n\n`;
        if (options.personalize) {
            body += `Given your role as ${contact.title}, I thought you might be interested in how we could help streamline your global operations in ${accountBrief.globalFootprint || "multiple countries"}.\n\n`;
        }
        else {
            body += `I'd love to share how we've helped similar companies streamline their global operations.\n\n`;
        }
        body += `Would you have 15 minutes to discuss how Remote.com could help ${accountBrief.companyName}?\n\n`;
        body += `Best regards,\n[Your Name]\n[Your Title]\nRemote.com`;
        return {
            subject,
            body,
            type: types_1.EmailType.PAIN_POINT
        };
    }
    /**
     * Generate the case study email
     */
    generateCaseStudyEmail(contact, accountBrief, personaAttributes, options) {
        // Get suggested case study
        const caseStudy = accountBrief.suggestedCaseStudy;
        // Generate subject line
        const subject = options.includeSubjects
            ? `How ${caseStudy || "companies like yours"} solved ${personaAttributes.painPoints[0].split(' ')[0].toLowerCase()} challenges`
            : "";
        // Generate email body
        let body = `Hi ${contact.name.split(' ')[0]},\n\n`;
        body += `I wanted to follow up and share a success story that might resonate with you at ${accountBrief.companyName}.\n\n`;
        if (caseStudy) {
            body += `${caseStudy} was facing similar challenges with ${personaAttributes.painPoints[0].toLowerCase()} before working with Remote.com. After implementing our solution, they were able to:\n\n`;
        }
        else {
            body += `One of our clients in your industry was facing similar challenges with ${personaAttributes.painPoints[0].toLowerCase()} before working with Remote.com. After implementing our solution, they were able to:\n\n`;
        }
        body += `- ${personaAttributes.valueProps[0]}\n`;
        body += `- Reduce compliance risks in ${Math.floor(Math.random() * 10) + 5} countries\n`;
        body += `- Achieve ${Math.floor(Math.random() * 40) + 20}% cost savings on global employment operations\n\n`;
        if (options.personalize) {
            body += `Given ${accountBrief.companyName}'s focus on ${accountBrief.recommendedOutreachAngles.length > 0 ? accountBrief.recommendedOutreachAngles[0].toLowerCase() : "global growth"}, I thought these results would be particularly relevant for you.\n\n`;
        }
        else {
            body += `I thought these results would be relevant for you as you continue to grow your global team.\n\n`;
        }
        body += `Would you be interested in learning more about how we achieved these results and how they might apply to ${accountBrief.companyName}?\n\n`;
        body += `Best regards,\n[Your Name]\n[Your Title]\nRemote.com`;
        return {
            subject,
            body,
            type: types_1.EmailType.CASE_STUDY
        };
    }
    /**
     * Generate the objection handling email
     */
    generateObjectionHandlingEmail(contact, accountBrief, personaAttributes, options) {
        // Generate subject line
        const subject = options.includeSubjects
            ? `Addressing common ${contact.persona.split(' ')[0].toLowerCase()} concerns about global employment platforms`
            : "";
        // Generate email body
        let body = `Hi ${contact.name.split(' ')[0]},\n\n`;
        body += `I understand that ${personaAttributes.type.toLowerCase()} professionals often have concerns about implementing new global employment solutions.\n\n`;
        body += `Many ${personaAttributes.type.toLowerCase()} leaders we work with initially worry about:\n\n`;
        // Add persona-specific concerns and objection handling
        switch (contact.persona) {
            case "HR & PEOPLE OPERATIONS LEADER":
                body += `1. **Employee Experience**: Remote.com creates a consistent, high-quality experience for all employees regardless of location\n`;
                body += `2. **Implementation Complexity**: Our dedicated implementation team ensures a smooth transition with minimal disruption\n`;
                body += `3. **Local HR Expertise**: We have local experts in 180+ countries who understand the nuances of each market\n\n`;
                break;
            case "TALENT ACQUISITION LEADER":
                body += `1. **Speed of Hiring**: Remote.com reduces time-to-hire from months to days in new countries\n`;
                body += `2. **Candidate Experience**: Our streamlined onboarding creates a professional impression for new hires\n`;
                body += `3. **Competitive Offerings**: We provide locally competitive benefits in every country\n\n`;
                break;
            case "FINANCE LEADER":
                body += `1. **Cost Predictability**: Our transparent pricing model eliminates unexpected costs and hidden fees\n`;
                body += `2. **Compliance Risk**: Our local legal experts ensure 100% compliance in every jurisdiction\n`;
                body += `3. **ROI Justification**: Customers typically see 30-40% cost reduction compared to establishing entities\n\n`;
                break;
            case "OPERATIONS LEADER":
                body += `1. **System Integration**: Remote.com integrates with your existing HR, payroll, and finance systems\n`;
                body += `2. **Process Standardization**: Our platform enables consistent processes while maintaining local compliance\n`;
                body += `3. **Operational Control**: You maintain full visibility and control through our comprehensive dashboard\n\n`;
                break;
            case "EXECUTIVE LEADER":
                body += `1. **Strategic Focus**: Remote.com handles the complexity so your team can focus on growth priorities\n`;
                body += `2. **Market Speed**: Enter new markets in days rather than months with our established infrastructure\n`;
                body += `3. **Competitive Advantage**: Access global talent without geographical limitations\n\n`;
                break;
        }
        if (options.personalize) {
            body += `I'd be happy to discuss how we've addressed these concerns for companies like ${accountBrief.suggestedCaseStudy || "others in your industry"}, and specifically how we could help ${accountBrief.companyName} with ${accountBrief.recommendedOutreachAngles.length > 0 ? accountBrief.recommendedOutreachAngles[0].toLowerCase() : "your global workforce needs"}.\n\n`;
        }
        else {
            body += `I'd be happy to discuss how we've addressed these concerns for other companies and how we could specifically help your team.\n\n`;
        }
        body += `Would you be available for a brief conversation this week?\n\n`;
        body += `Best regards,\n[Your Name]\n[Your Title]\nRemote.com`;
        return {
            subject,
            body,
            type: types_1.EmailType.OBJECTION_HANDLING
        };
    }
    /**
     * Generate the value-add email
     */
    generateValueAddEmail(contact, accountBrief, personaAttributes, options) {
        // Generate subject line
        const subject = options.includeSubjects
            ? `Resource: ${personaAttributes.type.split(' ')[0]} Guide to Global Employment`
            : "";
        // Generate email body
        let body = `Hi ${contact.name.split(' ')[0]},\n\n`;
        body += `I wanted to share a resource that many ${personaAttributes.type.toLowerCase()} professionals find valuable when considering global employment solutions.\n\n`;
        // Persona-specific resource
        switch (contact.persona) {
            case "HR & PEOPLE OPERATIONS LEADER":
                body += `Our "Global HR Compliance Handbook" covers essential insights on:\n\n`;
                body += `- Employment laws in 180+ countries\n`;
                body += `- Best practices for global employee experience\n`;
                body += `- Automation strategies for HR administrative tasks\n\n`;
                break;
            case "TALENT ACQUISITION LEADER":
                body += `Our "Global Talent Acquisition Playbook" includes:\n\n`;
                body += `- Strategies for expanding talent pools beyond borders\n`;
                body += `- Streamlined international hiring workflows\n`;
                body += `- Competitive benefits benchmarks for key markets\n\n`;
                break;
            case "FINANCE LEADER":
                body += `Our "Global Employment Cost Analysis Tool" provides:\n\n`;
                body += `- Detailed cost breakdowns for international hiring\n`;
                body += `- Tax optimization strategies for global workforces\n`;
                body += `- ROI calculator for entity establishment vs. EOR\n\n`;
                break;
            case "OPERATIONS LEADER":
                body += `Our "Global Operations Standardization Guide" covers:\n\n`;
                body += `- Frameworks for consistent global processes\n`;
                body += `- System integration best practices\n`;
                body += `- Operational KPIs for international teams\n\n`;
                break;
            case "EXECUTIVE LEADER":
                body += `Our "Executive Guide to Global Growth Strategy" includes:\n\n`;
                body += `- Market entry strategies and timelines\n`;
                body += `- Risk assessment frameworks for international expansion\n`;
                body += `- Case studies from high-growth companies\n\n`;
                break;
        }
        if (options.personalize) {
            body += `I thought this might be particularly valuable given ${accountBrief.companyName}'s focus on ${accountBrief.globalFootprint || "international expansion"}.\n\n`;
            body += `You can access this resource here: [Resource Link]. I'm also happy to walk through it with you specifically for your situation at ${accountBrief.companyName}.\n\n`;
        }
        else {
            body += `You can access this resource here: [Resource Link]. I'm also happy to walk through it with you for your specific situation.\n\n`;
        }
        body += `Let me know if you'd find that helpful.\n\n`;
        body += `Best regards,\n[Your Name]\n[Your Title]\nRemote.com`;
        return {
            subject,
            body,
            type: types_1.EmailType.VALUE_ADD
        };
    }
    /**
     * Generate the relationship continuation email
     */
    generateRelationshipEmail(contact, accountBrief, personaAttributes, options) {
        // Generate subject line
        const subject = options.includeSubjects
            ? `Next steps for ${accountBrief.companyName} and Remote.com`
            : "";
        // Generate email body
        let body = `Hi ${contact.name.split(' ')[0]},\n\n`;
        body += `I wanted to follow up regarding how Remote.com could support ${accountBrief.companyName}'s global workforce needs.\n\n`;
        if (options.personalize) {
            body += `Based on your ${accountBrief.globalFootprint || "international presence"} and focus on ${accountBrief.recommendedOutreachAngles.length > 0 ? accountBrief.recommendedOutreachAngles[0].toLowerCase() : "growth"}, I believe we could provide significant value in the following areas:\n\n`;
            body += `- ${personaAttributes.valueProps[0]}\n`;
            body += `- ${accountBrief.remoteSolutionFocus || personaAttributes.valueProps[1]}\n\n`;
        }
        else {
            body += `I believe we could provide significant value in the following areas:\n\n`;
            body += `- ${personaAttributes.valueProps[0]}\n`;
            body += `- ${personaAttributes.valueProps[1]}\n\n`;
        }
        body += `I'd welcome the opportunity to discuss these possibilities in a brief call. Would you have 15 minutes this week to connect?\n\n`;
        body += `Best regards,\n[Your Name]\n[Your Title]\nRemote.com`;
        return {
            subject,
            body,
            type: types_1.EmailType.RELATIONSHIP
        };
    }
}
exports.EmailGeneratorService = EmailGeneratorService;
//# sourceMappingURL=emailGeneratorService.js.map