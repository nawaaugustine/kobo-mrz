import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';

import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ToastController, ModalController } from '@ionic/angular';
import { ScanDataPage } from '../scan-data/scan-data.page';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  scanActive = false;

  constructor(private toastController: ToastController, private modalController: ModalController) { }

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();
        resolve(false);
      }
    });
  }

  async startScanner() {
    const allowed = await this.checkPermission();

    if (allowed) {
      this.scanActive = true;
      BarcodeScanner.hideBackground();

      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        this.scanActive = false;
        this.handleButtonClick();
        this.presentModal(result.content);
        //alert(result.content); //The QR content will come out here
        //Handle the data as your heart desires here
      } else {
        alert('NO DATA FOUND!');
      }
    } else {
      alert('NOT ALLOWED!');
    }
  }

  stopScanner() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  ionViewWillLeave() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  async handleButtonClick() {
    const toast = await this.toastController.create({
      color: 'dark',
      duration: 3000,
      message: 'Scanned successfully',
      icon: 'information-circle',
      position: 'top',
    });
    await toast.present();
  }

  async presentModal(result) {
    const modal = await this.modalController.create({
      component: ScanDataPage,
      initialBreakpoint: 0.2,
      breakpoints: [0, 0.2, 0.5, 1],
      //cssClass: 'my-custom-class',
      componentProps: {
        firstName: result,
        lastName: 'Adams',
        middleInitial: 'N'
      }
    });
    return await modal.present();
  }

  ngOnInit() {
  }

}
