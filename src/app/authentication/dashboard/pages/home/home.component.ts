import { DomSanitizerService } from '@shared/services/dom-sanitizer.service';
import { Component } from '@angular/core';
import { HomeService } from '@shared/services/home.service';
import { FooterService } from '@shared/services/footer.service';
import { Footer } from '@shared/models/footer.interface';
import { SocialNetwork } from '@shared/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public allData: SocialNetwork[];

  public boxContent: Footer[];

  public currentIndex = null;

  constructor(
    private _home: HomeService,
    private _footer: FooterService,
    private _domSanitizer: DomSanitizerService
  ) {
    this._home.getSocialNetworks().subscribe((data: any) => {
      this.allData = data.data as SocialNetwork[];
    });

    this._footer.getFooterElements().subscribe(({ data }) => {
      this.boxContent = data;
    });
  }

  public updateSocialBar(index: number) {
    this._home
      .updateSocialNetworks(this.allData[index].id, this.allData[index])
      .subscribe();
  }

  public setCurrentIndex(index: number) {
    this.currentIndex = index;
    setTimeout(() => {
      this.selectElementContents(
        document.querySelectorAll('[contenteditable]')[index * 2]
      );
    }, 0);
  }

  public selectElementContents(el) {
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  public updateData(index: number) {
    const newElementFooter: Footer = this.boxContent[index];

    newElementFooter.title = document
      .querySelectorAll('h3[contenteditable="true"]')[0]
      .innerHTML.trim();
    newElementFooter.description = document
      .querySelectorAll('div[contenteditable="true"]')[0]
      .innerHTML.trim();

    this._footer
      .updateFooterElement(newElementFooter.id, newElementFooter)
      .subscribe(({ ok }) => {
        if (ok) {
          this.currentIndex = null;
        }
      });
  }

  public applyDOMSanitizer(html: string) {
    return this._domSanitizer.applyDOMSanitizer(html);
  }
}
