import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CommonService {

  constructor() {}

  serialize = function (obj: any) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
  }          
}