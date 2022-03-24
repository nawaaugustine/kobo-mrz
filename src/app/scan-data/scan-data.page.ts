import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-scan-data',
  templateUrl: './scan-data.page.html',
  styleUrls: ['./scan-data.page.scss'],
})
export class ScanDataPage implements OnInit {

    // Data passed in by componentProps
    //TODO: Add Input for string barcode date
    @Input() result: object;
    @Input() type: string;

  constructor( private modalCtr: ModalController ) { }

  ngOnInit() {
  }
  async close() {
    const closeModal = 'Modal Closed';
    await this.modalCtr.dismiss(closeModal);
    navigator['app'].exitApp();
  }

}
