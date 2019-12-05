import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../localStorageService';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

// Copy below
export interface IUser {
  id?: number;
  username: string;
  password: string;
}
// Copy above

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // copy below
  user: IUser = {
    username: null,
    password: null
  };
  // copy above
  constructor(private router: Router, private toastService: ToastService) {
  }

  ngOnInit() {

  }
  // copy below
  login(user: IUser) {
    // change preset username and password according to requirements from below constructor)
    const presetUser = { username: 'suhail', password: 'suhail123' };
    if (user.username != null && user.password != null &&
      user.username !== '' && user.password !== '') {
      // log the user in
      if (user.username === presetUser.username &&
        user.password === presetUser.password) {
        // actually log them in
        // saving data to localStorage
        localStorage.setItem('user', JSON.stringify(user));
        // navigate to contacts page
        this.router.navigate(['contacts', user]);
      } else {
        this.toastService.showToast('warning', 2000, 'Username or password is wrong!');
      }
    } else {
      this.toastService.showToast('danger', 2000, 'Must specify credentials');
    }
  }
  // copy above
}
