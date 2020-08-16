import { Component, OnInit } from '@angular/core';
import { Footer } from '../../models/footer.interface';
import { FooterService } from '../../services/footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public boxContent: Footer[];

  constructor(private _footer: FooterService) {
    this._footer.getFooterElements().subscribe(({ data }) => {
      this.boxContent = data;
    });
  }

  ngOnInit(): void {}

  redirectTo(url: string) {
    window.open(url, '_blank');
  }
}
