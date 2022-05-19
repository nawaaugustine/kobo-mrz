/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ToastController, ModalController } from '@ionic/angular';
import { ScanDataPage } from '../scan-data/scan-data.page';
import * as BlinkID from '@microblink/blinkid-capacitor';

import { LauncherActivity } from '../plugins/LauncherActivity';

// add a listener to native events which invokes some callback
LauncherActivity.addListener('EVENT_LISTENER_NAME', ({ response }) =>
  alert(response)
);

// destructure the methods to call our native code from our non-native app
const { sendMRT } = LauncherActivity;

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  scanActive = false;
  data: any;
  modalDataResponse: any;
  results: string;
  documentFront: string;
  documentBack: string;
  documentFace: string;

  constructor(
    private toastController: ToastController,
    private modalController: ModalController
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
  async mrzScannerPremium() {
    // Initialize plugin
    const plugin = new BlinkID.BlinkIDPlugin();

    // Initialize wanted recognizer
    const blinkIdCombinedRecognizer = new BlinkID.BlinkIdCombinedRecognizer();
    blinkIdCombinedRecognizer.returnFullDocumentImage = true;
    blinkIdCombinedRecognizer.returnFaceImage = true;

    // Initialize license
    const licenseKeys: BlinkID.License = {
      ios: '<your_ios_license>',
      android:
        // eslint-disable-next-line max-len
        'sRwAAAAQaW8ubmF3YS5rb2JvLm1yeuhLhIluZ0O3VbVxSKxcPorKofncZqbYPgUOTRR7MF4dMnYu1LMf8Tfh8WUhepChjeStR/4K2dzayFrb5WtbrjsfVsdfdv5JdPj9kJP3rouXGKmDx0ZP/b29SMUfYhbCnGr/bSzAubZsSWd+4AX6lOjFAU1kresLEByrmNsPgDlOz4pvHdbLEMFQCfvkuGZPYbL7Xve87yJT2YGWTVdRNGkBzaEEljbZTQ2/0z7MtrVC',
      showTrialLicenseWarning: false,
    };

    // Perform scan and gather results
    const scanningResults = await plugin.scanWithCamera(
      new BlinkID.BlinkIdOverlaySettings(),
      new BlinkID.RecognizerCollection([blinkIdCombinedRecognizer]),
      licenseKeys
    );

    if (scanningResults.length === 0) {
      return;
    }

    // TODO: Add a modal to preview scanned data
    //TODO: Cleaned up the modal page
    // calling the modal
    this.presentModal(this.results, 'MRZ');

    // calling native method
    this.sendData(scanningResults);
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

  // Requires customization depending on the required data for extraction.
  /*
  To view all available data options create an instance of the BlinkIdCombinedRecognizerResult object.
  EG: 'scan instanceof BlinkID.BlinkIdCombinedRecognizerResult'
  use the scan instance to view available data options.
  */
  async sendData(result) {
    let name;
    let father_name;
    let documentNumber;
    let sex;
    let age;
    let ID;

    for (const scan of result) {
        name = scan.firstName + ' ' + scan.lastName;
        father_name = scan.fathersName;
        documentNumber = scan.mrzResult.documentNumber + scan.mrzResult.opt1;
        ID = documentNumber.replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_]/g, '');;

        if (scan.sex.toLowerCase().trim() === 'm') {
          sex = 'Male';
        } else {
          sex = 'Female';
        }

        age = scan.age;
    }

    const { response } = await LauncherActivity.sendMRT({
      Tazkira_no_001: ID,
      name: name,
      father_name: father_name,
      hhh_age: age,
      hhh_gender: sex,
    });
    alert('Response from native:' + response);
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
        type: type,
      },
    });

    //Creating intent to send data to KoBo
    //#1 - Get date from modal
    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse !== null) {
        this.modalDataResponse = modalDataResponse.data;
        //alert('Modal Sent Data : ' + modalDataResponse.data);
      }
    });

    return await modal.present();
  }

  ngOnInit() {}
}
