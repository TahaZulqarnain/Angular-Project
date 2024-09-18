import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseAPIService } from '../bolierPlate/baseApiService';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export abstract class AuthenticationService extends BaseAPIService {
  public _endPoint = "";

  constructor(protected override http: HttpClient, private router: Router) {
    super(http);
  }

  login(request: any): Observable<any> {
    this._endPoint = "auth/login";
    this.API_URL = this._endPoint;
    return this.create(request);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    setTimeout(() => {
      this.router.navigateByUrl('/user/login').then(() => {
        window.location.reload();
      });
    }, 100);

  }

}
