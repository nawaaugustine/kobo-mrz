import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';

import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ToastController, ModalController } from '@ionic/angular';
import { ScanDataPage } from '../scan-data/scan-data.page';
import { DocumentScanner, DocumentScannerOptions } from '@ionic-native/document-scanner/ngx';

const { SmartScannerPlugin } = Plugins;

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  scanActive = false;
  data: any;
  modalDataResponse: any;

  constructor(
    private toastController: ToastController,
    private modalController: ModalController,
    private documentScanner: DocumentScanner
  ) {}

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
        this.handleButtonClickToast(
          'Successfully Scanned',
          'success',
          'information-circle'
        );
        this.presentModal(JSON.parse(result.content), 'barcode');
      } else {
        this.handleButtonClickToast('NO DATA FOUND!', 'danger', 'close-circle');
      }
    } else {
      this.handleButtonClickToast('NOT ALLOWED!', 'danger', 'close-circle');
    }
  }

  async mrzScanner() {
    const result = await SmartScannerPlugin.executeScanner({
      action: 'START_SCANNER',
      options: {
        mode: 'mrz',
        mrzFormat: 'MRTD_TD1',
        config: {
          background: '#89837c',
          branding: false,
          isManualCapture: true,
          label: 'Scanning ID',
        },
      },
    });

    const isNotEmpty = Object.keys(result).length > 0;

    if (isNotEmpty) {
      this.handleButtonClickToast(
        'Successfully Scanned',
        'success',
        'information-circle'
      );
      this.presentModal(result, 'MRZ');
    } else {
      this.handleButtonClickToast('NO DATA FOUND!', 'danger', 'close-circle');
    }
  }

  async documentScannerFunction() {
    const opts: DocumentScannerOptions = {};
    this.documentScanner
      .scanDoc(opts)
      .then((res: string) => {
        alert(res);
        this.handleButtonClickToast(
        'Successfully Scanned',
        'success',
        'information-circle'
      );
        this.data = res;
      })
      .catch((error: any) => this.handleButtonClickToast('NO DATA FOUND!' + error(error), 'danger', 'close-circle'));
  }

  stopScanner() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  ionViewWillLeave() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  async handleButtonClickToast(message, color, icon) {
    const toast = await this.toastController.create({
      // eslint-disable-next-line object-shorthand
      color: color,
      duration: 5000,
      // eslint-disable-next-line object-shorthand
      message: message,
      // eslint-disable-next-line object-shorthand
      icon: icon,
      position: 'top',
    });
    await toast.present();
  }

  async presentModal(result, type) {
    const modal = await this.modalController.create({
      component: ScanDataPage,
      initialBreakpoint: 0.5,
      breakpoints: [0, 0.2, 0.5, 1],
      //cssClass: 'my-custom-class',
      componentProps: {
        // eslint-disable-next-line object-shorthand
        result: result,
        // eslint-disable-next-line object-shorthand
        type: type
      },
    });

    //Creating intent to send data to KoBo
    //#1 - Get date from modal
    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse !== null) {
        this.modalDataResponse = modalDataResponse.data;
        alert('Modal Sent Data : '+ modalDataResponse.data);
      }
    });

    return await modal.present();
  }

  ngOnInit() {}
}
