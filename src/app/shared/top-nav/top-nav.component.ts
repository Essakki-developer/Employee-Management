//Component which is used to display top nav bar.
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {
  /**
   * Variable which is used to display page title dynamically.
   */
  @Input() title!: string;

}
