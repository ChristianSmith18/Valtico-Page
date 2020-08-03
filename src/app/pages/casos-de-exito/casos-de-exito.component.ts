import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-casos-de-exito',
  templateUrl: './casos-de-exito.component.html',
  styleUrls: ['./casos-de-exito.component.scss']
})
export class CasosDeExitoComponent implements OnInit {
  public success = new Array(2);
  constructor() { }

  ngOnInit(): void {
  }

}
