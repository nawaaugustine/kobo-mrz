import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Scan', url: '/scanner/Scanner', icon: 'scan' },
    { title: 'Upload Form', url: '/folder/upload/Upload', icon: 'cloud-upload' },
    { title: 'Settings', url: '/folder/settings/Settings', icon: 'settings' },

  ];
  constructor() {}
}
