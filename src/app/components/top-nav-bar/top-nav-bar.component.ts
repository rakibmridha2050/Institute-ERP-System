import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent {


  @Output() toggleSidebar = new EventEmitter<void>();


}
