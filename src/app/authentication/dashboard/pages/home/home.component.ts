import { Footer } from './../../../../shared/models/footer.interface';
import { Component, OnInit } from '@angular/core';
import { HomeService } from '@shared/services/home.service';
import { FooterService } from '@shared/services/footer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public facebook: string = null;
  public twitter: string = null;
  public linkedin: string = null;
  public youtube: string = null;

  public boxContent: Footer[];

  public currentIndex = null;

  constructor(private _home: HomeService, private _footer: FooterService) {
    this._home.getSocialNetworks().subscribe((data: any) => {
      this.facebook = (data.data[0].url as string).trim();
      this.twitter = (data.data[1].url as string).trim();
      this.linkedin = (data.data[2].url as string).trim();
      this.youtube = (data.data[3].url as string).trim();
    });

    this._footer.getFooterElements().subscribe(({ data }) => {
      this.boxContent = data;
    });
  }

  ngOnInit(): void {}

  setCurrentIndex(index: number) {
    this.currentIndex = index;
    setTimeout(() => {
      this.selectElementContents(
        document.querySelectorAll('[contenteditable]')[index * 2]
      );
    }, 0);
  }

  selectElementContents(el) {
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  updateData(index: number) {
    const newElementFooter: Footer = this.boxContent[index];

    newElementFooter.title = document
      .querySelectorAll('h3[contenteditable="true"]')[0]
      .innerHTML.trim();
    newElementFooter.description = document
      .querySelectorAll('p[contenteditable="true"]')[0]
      .innerHTML.trim();

    this._footer
      .updateFooterElement(newElementFooter.id, newElementFooter)
      .subscribe(({ ok }) => {
        if (ok) {
          this.currentIndex = null;
        }
      });
  }
}
