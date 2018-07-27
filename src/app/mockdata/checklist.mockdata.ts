import { Injectable } from '@angular/core';

import { Checklist } from '../model/checklist';
@Injectable()
export class ChecklistsService {
    checklists: Checklist[] = [{
        templateName: 'firstTemplate',
		templateID: 'xyz',
		templateDesc: "This template is from checklist.service file",
		isTemplate: false,
        tags: [{
            key: 'Pune',
            values: [{
                value: 'Koregaon park',
            },{
                value: 'Agakhan Palace'
            }],
			tagvalues: [ 'Koregaon park',

             'Agakhan Palace'
           ]
        },{
            key: 'Delhi',
            values: [{
                value: 'Hauz Khas'
            }],
			tagvalues: [
             'Hauz Khas'
           ]
        }]
    },{
        templateName: 'secondTemplate',
		templateID: 'xyz',
		templateDesc: "This template is from checklist.service file",
		isTemplate: false,
        tags: [{
            key: 'Salt lake city',
            values: [{
                value: 'The Grand America Hotel',
            }, {
                value: 'Great Salt lake'
            }],
			tagvalues: [
               'The Grand America Hotel',
 
              'Great Salt lake'
           ]
        }]
    }]
    constructor(){}

    getChecklists(): Checklist[] {
        return this.checklists;
    }

    getChecklist(): Checklist {
        let tripsIdArray = [0, 1]
        return this.checklists[Math.floor(Math.random() * tripsIdArray.length)];
    }
}