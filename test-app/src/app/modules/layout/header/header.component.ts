import { Component } from '@angular/core';
import { AuthenticationService } from '../../../core/services/auth/authenticationService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  user: any = null;
  image:any;
  firstName:any;
  lastName:any;
  email:any;
  constructor(private authenticationService: AuthenticationService) {}
  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.user = JSON.parse(currentUser);
      this.image = this.user.image;      
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.email = this.user.email;
    }
    else{
      this.authenticationService.logout();
    }
  }
  logOut(){
    this.authenticationService.logout();
  }
}
