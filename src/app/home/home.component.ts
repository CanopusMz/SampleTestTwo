import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any = {};
  constructor(private activatedRoute: ActivatedRoute) { }

  // copy below pass data from contacts
  ngOnInit() {
    // this.activatedRoute.params.subscribe((sss) => {
    //   this.data = sss;
    //   // console.log('this.data from home......');
    // });
    // OR INSTEAD DO BELOW METHOD -- either way is fine

    this.data = JSON.parse(localStorage.getItem('calculateData'));
  }

}
