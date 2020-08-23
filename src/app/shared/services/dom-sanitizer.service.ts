import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class DomSanitizerService {
  constructor(private sanitizer: DomSanitizer) {}

  public applyDOMSanitizer(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
