export interface Option {
   optionTitle: string;
}

export interface Question {
	 questionTitle: string;
	 questionType: string;
	 options: Option[];
	 value: string;
}

export interface Section {
	 sectionTitle: string;
	 sectionDescription: string;
	 questions: Question[];
}

export interface Value {
     value: string;
}

export interface MandatoryTags {
     key: string;
     values: Value[];
}

export interface Participant {
     name: string;
}

export interface OwnerId {
     name: string;
}

export interface ParticipantKeyValue {
	participant: string;
	key: string;
	value: string[];
}

export interface Template {
	 id?: string;
     templateName: string;
	 templateDesc: string;
	 templateID: string;
	 isTemplate: boolean;
	 isSurvey: boolean;
	 participants: Participant[];
	 checklistStatus: string;
	 checklistCurrentSection: string;
	 sections: Section[];
	 mTags: MandatoryTags[];
	 ownerIds: OwnerId[];
	 refTemplateName: string;
	 version: string;
	 participantKeyValue: ParticipantKeyValue[]; 
}



