"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personaFramework = void 0;
const types_1 = require("../types");
/**
 * Remote.com Persona Framework
 *
 * This defines the 5 key personas with their specific attributes including:
 * - Key motivations and goals
 * - Critical pain points
 * - Specific value propositions
 * - Communication style preferences
 */
exports.personaFramework = {
    [types_1.PersonaType.HR_PEOPLE_OPS]: {
        type: types_1.PersonaType.HR_PEOPLE_OPS,
        motivations: [
            "Create a positive employee experience",
            "Build and maintain strong company culture",
            "Manage HR operations efficiently",
            "Reduce administrative burden",
            "Ensure compliance across jurisdictions"
        ],
        painPoints: [
            "Managing global benefits and compensation",
            "Navigating complex international compliance",
            "Maintaining consistent employee experience globally",
            "Providing local HR expertise in multiple countries",
            "Administrative burden of managing contractors vs employees"
        ],
        valueProps: [
            "Simplified global HR operations with local expertise",
            "Compliance in 180+ countries managed for you",
            "Standardized onboarding experience for all employees",
            "Reduced HR admin through automated workflows",
            "Single platform for managing global workforce"
        ],
        communicationStyle: "Emphasize people-first approach, focus on employee experience and culture building. Use empathetic language that highlights compliance expertise while emphasizing administrative burden reduction."
    },
    [types_1.PersonaType.TALENT_ACQUISITION]: {
        type: types_1.PersonaType.TALENT_ACQUISITION,
        motivations: [
            "Expand talent pool globally",
            "Reduce time-to-hire metrics",
            "Improve candidate experience",
            "Build competitive hiring processes",
            "Eliminate geographical hiring limitations"
        ],
        painPoints: [
            "Limited by location-based hiring",
            "Complex international hiring processes",
            "Risk of misclassification with global contractors",
            "Inability to offer competitive benefits globally",
            "Losing candidates due to legal/visa constraints"
        ],
        valueProps: [
            "Ability to hire anyone, anywhere within days",
            "Compliant employment in 180+ countries",
            "Competitive benefits packages in every location",
            "Streamlined global onboarding process",
            "Simplified contractor to employee conversion"
        ],
        communicationStyle: "Focus on speed and talent acquisition advantages. Use direct language about expanding talent pools and removing geographical barriers. Highlight competitive advantages in the war for talent."
    },
    [types_1.PersonaType.FINANCE]: {
        type: types_1.PersonaType.FINANCE,
        motivations: [
            "Control and predict global employment costs",
            "Reduce compliance risks and penalties",
            "Streamline international payroll processes",
            "Optimize tax strategies across jurisdictions",
            "Improve cost efficiency of global operations"
        ],
        painPoints: [
            "Unpredictable costs of international expansion",
            "Managing multiple local payroll providers",
            "Currency exchange risks and banking complexity",
            "Tax compliance across multiple jurisdictions",
            "Inefficiencies from fragmented systems"
        ],
        valueProps: [
            "Transparent, predictable global employment costs",
            "Consolidated invoicing in your preferred currency",
            "Reduced compliance risk and penalties",
            "Simplified global payroll management",
            "Cost-effective international entity management"
        ],
        communicationStyle: "Lead with data, numbers and ROI. Use precise language around compliance, risk mitigation, and cost predictability. Focus on demonstrable business outcomes and efficiency metrics."
    },
    [types_1.PersonaType.OPERATIONS]: {
        type: types_1.PersonaType.OPERATIONS,
        motivations: [
            "Streamline international operations",
            "Reduce operational complexity",
            "Standardize processes globally",
            "Scale operations efficiently",
            "Improve workforce flexibility"
        ],
        painPoints: [
            "Managing multiple international vendors",
            "Inconsistent processes across countries",
            "Lack of visibility into global operations",
            "Slow expansion into new markets",
            "Difficulty scaling workforce up/down efficiently"
        ],
        valueProps: [
            "Single platform for global workforce management",
            "Standardized processes with local compliance",
            "Rapid market entry without entity setup",
            "Simplified vendor consolidation",
            "Flexible workforce scaling capabilities"
        ],
        communicationStyle: "Focus on efficiency, standardization and scalability. Use practical language about processes and systems. Highlight operational improvements and reduction of complexity."
    },
    [types_1.PersonaType.EXECUTIVE]: {
        type: types_1.PersonaType.EXECUTIVE,
        motivations: [
            "Execute global growth strategy",
            "Reduce organizational risk",
            "Drive competitive advantage",
            "Improve operational efficiency",
            "Access global talent pools"
        ],
        painPoints: [
            "Barriers to international expansion",
            "Compliance risks in global operations",
            "Limited access to global talent",
            "Inefficient global workforce management",
            "Speed of market entry challenges"
        ],
        valueProps: [
            "Accelerated global growth capabilities",
            "Reduced risks of international operations",
            "Competitive advantage through global talent access",
            "Strategic workforce deployment globally",
            "Speed and agility in market expansion"
        ],
        communicationStyle: "Strategic and high-level with focus on business outcomes. Emphasize competitive advantage, market opportunity, and strategic capabilities. Use executive-level language that connects to business objectives."
    }
};
//# sourceMappingURL=personas.js.map