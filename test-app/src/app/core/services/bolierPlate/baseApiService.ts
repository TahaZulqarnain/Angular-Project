import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable()
export abstract class BaseAPIService {

  API_URL = '';
  GS_URL = "";
  permissionCode = "";
  headers: HttpHeaders;

  constructor(protected http: HttpClient) {
    this.headers = new HttpHeaders()
      //.append(environment.clientHeaderKey,environment.clientHeaderValue)
      .set("Authorization", "Bearer " + JSON.parse(localStorage.getItem('currentUser') || '{}').token
        || '{}');
  }

  getAll<T>(filterObject?: any): Observable<any> {
    let queryString = '';
    if (filterObject) {
      const fitlerKeys: any[] = Object.keys(filterObject);
      if (fitlerKeys.length > 0) {
        queryString = '?';
      }
      fitlerKeys.forEach((key: any, index) => {
        if (filterObject[key] !== undefined && filterObject[key] !== null) {
          if (filterObject[key].toString().length) {
            queryString += `${key}=${filterObject[key]}&`;
          }
        }
      });
      if (
        fitlerKeys.length > 0 &&
        queryString[queryString.length - 1] === '&'
      ) {
        queryString = queryString.slice(0, -1);
      }
    }
    queryString = '';

    return this.http.get<T>(environment.serverUrl + this.API_URL + queryString, { headers: this.headers });
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(environment.serverUrl + this.API_URL + `/${id}`, { headers: this.headers });
  }

  patchUpdate(id: number, _obj: any, queryParams?: any): Observable<any> {
    return this.http.patch(environment.serverUrl + this.API_URL + `/${id}`, _obj, { headers: this.headers, params: queryParams });
  }

  delete<T>(id: number) {
    const url = `${environment.serverUrl + this.API_URL}/${id}`;
    return this.http.delete(url, { headers: this.headers });
  }

  // UPDATE => PUT: update the user on the server
  update(id: number, _obj: any, queryParams?: any): Observable<any> {
    return this.http.put(environment.serverUrl + this.API_URL + "/" + id, _obj, { headers: this.headers, params: queryParams });
  }

  // CREATE =>  POST: add a new user to the server
  create<T>(_obj: any): Observable<any> {
    return this.http.post<any>(environment.serverUrl + this.API_URL, _obj, { headers: this.headers });
  }
}
