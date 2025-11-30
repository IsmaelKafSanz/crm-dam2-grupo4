import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorMessage = 'An error occurred! Contact support at: support@grupo4.com';

  constructor() { }

  ngOnInit() {
  }

}
