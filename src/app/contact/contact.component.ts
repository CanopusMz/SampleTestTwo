import { Component, OnInit, NgModuleFactoryLoader } from '@angular/core';
import { Contact } from './contact.model';
import { Http } from '@angular/http';
import { LocalStorageService } from '../localStorageService';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

// make interface to make things easier for addContacts step
export interface IContact {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  owed: number;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: Array<IContact> = [];
  params: string;
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
  }

  // copy below inside onInit to wire load contacts button

  async ngOnInit() {
    this.contacts = await this.loadContacts();
  }
  async loadContacts() {
    let contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts && contacts.length > 0) {
      // contacts = contacts;
    } else {
      contacts = await this.loadContactsFromJson();
    }
    console.log('this.contacts from ngOninit...', this.contacts);
    this.contacts = contacts;
    return contacts;
  }
  // Copy below to load contanct function from contacts.json file
  async loadContactsFromJson() {
    const contacts = await this.http.get('assets/contacts.json').toPromise();
    return contacts.json();
  }

  // copy below for add function
  addContact() {
    const contact: IContact = {
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      owed: null

    };
    this.contacts.unshift(contact);
    // saving to local storage
    this.saveToLocalStorage();
  }

  // delete function
  deleteContact(index: number) {
    this.contacts.splice(index, 1);
    this.saveToLocalStorage();
  }

  // general function to be reused for saving to LocalStorage
  saveToLocalStorage() {
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }

  // Calculation method - finalize button
  // change tax amount as instructed
  finalize() {
    // console.log('from finalize....');
    const data = this.calculate();
    localStorage.setItem('calculateData', JSON.stringify(data));
    this.router.navigate(['home', data]);
    // make sure the above "home route" is set up in the app.routes
  }
  calculate() {
    let owed = 0;
    for (let i = 0; i < this.contacts.length; i++) {
      // console.log('i--->', i, "this.contacts[i]", this.contacts[i]);
      owed += this.contacts[i].owed;
      // console.log('owed---->', owed);
    }
    return {
      numberOfContacts: this.contacts.length,
      subTotal: owed,
      taxAmount: owed * .10,
      total: owed + (owed * .10)
    };
  }
  // after this naviagte to the home page component to pass the data in.

  // search button wiring + don't forget to wire up html file + add params in this file
  // see what parameter to serach on or about.. here I searched by first name 
  search(params: string) {
    // console.log('from search.... params', params);

    this.contacts = this.contacts.filter((contact: IContact) => {
      return contact.firstName.toLowerCase() === params.toLowerCase();
    });
  }
}
