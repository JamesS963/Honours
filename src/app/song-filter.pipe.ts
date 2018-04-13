import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'matchesCategory'
})
export class SongFilterPipe implements PipeTransform {
  transform(items: Array<any>, category: string): Array<any> {
    return items.filter(item => item.genre === 'vgm');
  }


}
