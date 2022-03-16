import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Scan', url: '/scanner', icon: 'scan' },
    { title: 'Upload Form', url: '/upload', icon: 'cloud-upload' },
    { title: 'Settings', url: '/settings', icon: 'settings' },

  ];
  constructor() {}
}
