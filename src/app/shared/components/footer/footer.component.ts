import { Component } from '@angular/core';
import { Footer } from '../../models/footer.interface';
import { FooterService } from '../../services/footer.service';
import { DomSanitizerService } from './../../services/dom-sanitizer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  public boxContent: Footer[];

  constructor(private _footer: FooterService, private _domSanitizer: DomSanitizerService) {
    this._footer.getFooterElements().subscribe(({ data }) => {
      this.boxContent = data;
    });
  }

  public redirectTo(url: string) {
    window.open(url, '_blank');
  }

  public applyDOMSanitizer(html: string) {
    return this._domSanitizer.applyDOMSanitizer(html);
  }
}
