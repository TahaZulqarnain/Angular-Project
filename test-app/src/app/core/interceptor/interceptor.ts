import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent} from "@angular/common/http";
import { EMPTY, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthenticationService } from "../../core/services/auth/authenticationService";
import { Router } from "@angular/router";

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  accessCodes:any =[];
  newAccessToken:string ="";
  currentRequest!:HttpRequest<any>;
  next!:HttpHandler;
  constructor(private router: Router,private authenticationService: AuthenticationService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if(request.url.indexOf("token")==-1){
      this.currentRequest=request;
      this.next=next;
    }    
    return next.handle(request).pipe(map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {}
            return event;
        }),catchError((error: HttpErrorResponse) => {
          switch(error.status){
            case 404:
            // use to navigate 404 not found page
            this.router.navigate(['/user/login']);
            break;
            case 401:
             // Use can use refresh access token code here
             this.router.navigate(['/user/login']);
            break;
          }
          if(error.error.message=="Invalid Token"){
            this.router.navigate(['/user/login']);
            //return EMPTY;
          }
          // Error message from https://dummyjson.com/docs/ will get the error value we can replcae it and use it here
          if(error.error.message == "Missing Token" || error.error.message == "Token has been expired"){
                 // remove user from local storage to log user out
                 this.authenticationService.logout();
                 this.router.navigate(['/user/login']);
                return throwError(null);
            }
            else{
                return throwError(error);
            }
        }));
  }

}
