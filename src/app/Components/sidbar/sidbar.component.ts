import { SharedService } from './../../Services/shared.service';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sidbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidbar.component.html',
  styleUrl: './sidbar.component.scss',
  encapsulation: ViewEncapsulation.None, // Make styles global
})
export class SidbarComponent implements AfterViewInit {
  lightMode_icon: any;
  darkMode_icon: any;
  isLightmode: boolean = false;
  constructor(
    private sanitizer: DomSanitizer,
    private SharedService: SharedService
  ) {} // Inject DomSanitizer

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    this.lightMode_icon = this.sanitizer.bypassSecurityTrustHtml(
      '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brightness-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M12 5l0 -2" /><path d="M17 7l1.4 -1.4" /><path d="M19 12l2 0" /><path d="M17 17l1.4 1.4" /><path d="M12 19l0 2" /><path d="M7 17l-1.4 1.4" /><path d="M6 12l-2 0" /><path d="M7 7l-1.4 -1.4" /></svg>'
    );
    this.darkMode_icon = this.sanitizer.bypassSecurityTrustHtml(
      '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-moon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z" /></svg>'
    );
  }

  changeTheme() {
    this.isLightmode = !this.isLightmode;
    this.SharedService.sendTheme(this.isLightmode)
  }

  reloadPage() {
    window.location.reload();
  }
}
