import { Component, OnInit } from '@angular/core';
import { ToastService } from '../toast/toast.service';
import { Router } from '@angular/router';
// copy above line + line 11
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
 constructor(private toastService: ToastService, private router: Router) { }

  ngOnInit() {
  }

  // copy below and line 11 for about dialog button (clickEvent)
  showAbout() {
    this.toastService.showToast('success', 5000, 'This application was created by Suhail Mazi (c).');
  }
  // copy above and line 10 for about dialog button
  
  // logout button wiring
  logout() {
    // localStorage.clear();
    localStorage.setItem('user', JSON.stringify({}));
    // do import up above to complete the import step
    this.router.navigate(['login']);
  }
}
