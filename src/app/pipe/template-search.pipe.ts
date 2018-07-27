import { Pipe, PipeTransform } from '@angular/core';

import { Template } from '../model/Template';

@Pipe({
    name: 'templateSearch',
    pure: false
})
export class TemplateSearchPipe implements PipeTransform {
  transform(items: Template[], filter: Template): Template[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Template) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Book} book The book to compare to the filter.
   * @param {Book} filter The filter to apply.
   * @return {boolean} True if book satisfies filters, false if not.
   */
  applyFilter(template: Template, filter: Template): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (template[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (template[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}