export class Value {
    value: string;
}

export class Tag {
    key?: string;
    values?: Value[];
	tagvalues?: string[];
}

export class Checklist {
	templateName?: string;
    templateID?: string;
    templateDesc?: string;
	isTemplate?: boolean;
    tags?: Tag[];
}