export interface EmailTemplate {
	 id?: string;
     emailTemplateName: string;
	 emailTemplateDesc: string;
	 //mTags: MandatoryTags[];
	contentType: string;
	subjectText: string;
	contentText: string;
}


