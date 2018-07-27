import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent {
  title = 'app';
 constructor(
    public authService: AuthService,
  public router:Router
  ) {    
  }

  ngOnInit() {
  }
  logout(){
	  this.authService.logout();
	  this.router.navigate(['']);
  }
}
