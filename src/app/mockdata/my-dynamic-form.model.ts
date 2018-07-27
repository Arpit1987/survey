import {
    DynamicFormControlModel,
    DynamicCheckboxModel,
    DynamicInputModel,
    DynamicRadioGroupModel
} from "@ng-dynamic-forms/core";

export const MY_FORM_MODEL: DynamicFormControlModel[] = [

    new DynamicInputModel({

        id: "exampleInput",
        label: "Training fotr supriya completed?",
        maxLength: 42,
        placeholder: "345 hrs"
    }),

    new DynamicRadioGroupModel<string>({

        id: "exampleRadioGroup",
        label: "Which phase is the project in?",
        options: [
            {
                label: "LOE",
                value: "option-1",
            },
            {
                label: "Unit Testing",
                value: "option-2"
            },
            {
                label: "Performance Testing",
                value: "option-3"
            }
        ],
        value: "option-3"
    }),

    new DynamicCheckboxModel({

        id: "exampleCheckbox",
        label: "Was the LOE Submitted on time?"
    })
];