import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataFilter"
})
export class DataFilterPipe implements PipeTransform {

    transform(items: any[], args: string): any {
		console.log(items, args);
        if (args) {
           // return _.filter(array, row=>row.firstName.indexOf(query) > -1);
			 return items.filter(item => item.templateName.indexOf(args[0]) !== -1);
        }
        return items;
    }
}