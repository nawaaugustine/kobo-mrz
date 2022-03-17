import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-scan-data',
  templateUrl: './scan-data.page.html',
  styleUrls: ['./scan-data.page.scss'],
})
export class ScanDataPage implements OnInit {

    // Data passed in by componentProps
    @Input() firstName: string;
    @Input() lastName: string;
    @Input() middleInitial: string;

  constructor( private modalCtr: ModalController ) { }

  ngOnInit() {
  }
  async close() {
    const closeModal = 'Modal Closed';
    await this.modalCtr.dismiss(closeModal);
  }

}
