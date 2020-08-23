import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventosService } from '@shared/services/eventos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizerService } from '@src/app/shared/services/dom-sanitizer.service';

@Component({
  selector: 'app-single-evento',
  templateUrl: './single-evento.component.html',
  styleUrls: ['./single-evento.component.scss'],
})
export class SingleEventoComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public imgBanner: string;
  public content: any;

  public showBgData = true;

  constructor(
    private _evento: EventosService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private _domSanitizer: DomSanitizerService
  ) {
    this._evento.getOneEvento(window.location.pathname.split('/')[2]).subscribe(
      ({ ok, event }) => {
        if (!ok) {
          this.router.navigate(['home']);
        }
        this.title = event.title;
        this.subtitle = event.front.shortDescription;
        this.imgBanner = event.complete.imgTop;

        document.querySelector('#editor-container').innerHTML =
          this._domSanitizer.applyDOMSanitizer(event.complete.article) + '';
        this.showBgData = false;
        this.spinner.hide();
      },
      (err) => {
        console.clear();
        this.router.navigate(['home']);
      }
    );
    setTimeout(() => this.spinner.hide(), 5000);
  }

  ngOnInit(): void {
    this.spinner.show();
  }
}
