import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BottomMenuComponent } from './components/bottom-menu/bottom-menu';
import { ImageLightboxComponent } from './components/image-lightbox/image-lightbox';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BottomMenuComponent, ImageLightboxComponent],
  template: `
    <router-outlet />
    <app-bottom-menu />
    <app-image-lightbox />
  `,
  styles: []
})
export class App {
  title = 'angular-app';
}
