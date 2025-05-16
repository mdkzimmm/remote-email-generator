// Account Intelligence Interfaces
export interface AccountBrief {
  companyName: string;
  accountSnapshot: string;
  keyStakeholders: KeyStakeholder[];
  globalFootprint: string;
  painPoints: string[];
  triggerEvents: string[];
  priorityContacts: PriorityContact[];
  competitiveIntelligence: string;
  recommendedOutreachAngles: string[];
  suggestedCaseStudy: string;
  remoteSolutionFocus: string;
  sources: string[];
}

export interface KeyStakeholder {
  name: string;
  title: string;
  linkedInUrl?: string;
  notes?: string;
}

export interface PriorityContact {
  name: string;
  title: string;
  email?: string;
  linkedInUrl?: string;
  persona: PersonaType;
  notes?: string;
}

export enum PersonaType {
  HR_PEOPLE_OPS = "HR & PEOPLE OPERATIONS LEADER",
  TALENT_ACQUISITION = "TALENT ACQUISITION LEADER",
  FINANCE = "FINANCE LEADER",
  OPERATIONS = "OPERATIONS LEADER",
  EXECUTIVE = "EXECUTIVE LEADER"
}

// Email Sequence Interfaces
export interface EmailSequence {
  contact: PriorityContact;
  emails: Email[];
}

export interface Email {
  subject: string;
  body: string;
  type: EmailType;
}

export enum EmailType {
  PAIN_POINT = "PAIN_POINT_INTRODUCTION",
  CASE_STUDY = "CASE_STUDY_SOCIAL_PROOF",
  OBJECTION_HANDLING = "OBJECTION_HANDLING",
  VALUE_ADD = "VALUE_ADD_CONTENT",
  RELATIONSHIP = "RELATIONSHIP_CONTINUATION"
}

// Service Interfaces
export interface ResearchInput {
  companyName: string;
  website?: string;
  linkedInUrl?: string;
}

export interface EmailGenerationOptions {
  includeSubjects: boolean;
  maxEmailsPerContact: number;
  personalize: boolean;
}

// Persona Framework
export interface PersonaAttributes {
  type: PersonaType;
  motivations: string[];
  painPoints: string[];
  valueProps: string[];
  communicationStyle: string;
}