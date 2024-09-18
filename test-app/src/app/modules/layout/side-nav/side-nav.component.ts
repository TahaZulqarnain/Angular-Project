import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent {
  isCollapsed = false;

  constructor(private renderer: Renderer2, private el: ElementRef) { }
  toggleSidenav() {
    this.isCollapsed = !this.isCollapsed;
    const dgrid = document.querySelector('.d-grid');
    const ggrid = document.querySelector('.g-grid');
    if (this.isCollapsed) {
      if (dgrid) {
        dgrid.classList.remove('d-grid');
        dgrid.classList.add('g-grid');
      }
    }
    else {
      if (ggrid) {
        setTimeout(() => {
          ggrid.classList.add('d-grid');
        }, 50);
          ggrid.classList.remove('g-grid');
        
      }
    }
  }
}
