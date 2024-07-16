import { Pipe, PipeTransform } from '@angular/core';

import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: 'safeContent'
})

export class SafeContentPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(content: string, isUrl: boolean = true) {
    if (isUrl) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(content);
    } else {
      return this.sanitizer.bypassSecurityTrustHtml(content);
    }
  }
}
