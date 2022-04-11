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
        'sRwAAAAQaW8ubmF3YS5rb2JvLm1yeuhLhIluZ0O3VbVxSKwMHS0sF13LLuLbRqr6u+77I9tO0dcHlwvvHzDbROmk2rZS+cdddB4yNmqsKHowQA8nk8FTUjZU/HRh+oDDjJ+QQedi9yL1IAP3+JX+x/r/NcziKvORokQzDyVuseUuiw/zVo46cbuQQmiyZkbqLPjFR+kJLvty+jhxKkK+2ciZfL5Ult59oYmFTKPXDS7lCghW0qm4U9CUeTXKUovq4uBlCfVL',
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

    for (const result of scanningResults) {
      if (result instanceof BlinkID.BlinkIdCombinedRecognizerResult) {
        this.results = this.getIdResultsString(result);
        this.documentFront = result.fullDocumentFrontImage
          ? `data:image/jpg;base64,${result.fullDocumentFrontImage}`
          : undefined;
        this.documentBack = result.fullDocumentBackImage
          ? `data:image/jpg;base64,${result.fullDocumentBackImage}`
          : undefined;
        this.documentFace = result.faceImage
          ? `data:image/jpg;base64,${result.faceImage}`
          : undefined;
      } else if (result instanceof BlinkID.MrtdCombinedRecognizerResult) {
        this.results = this.getMrzResultsString(result);
        this.documentFront = result.fullDocumentFrontImage
          ? `data:image/jpg;base64,${result.fullDocumentFrontImage}`
          : undefined;
        this.documentBack = result.fullDocumentBackImage
          ? `data:image/jpg;base64,${result.fullDocumentBackImage}`
          : undefined;
        this.documentFace = result.faceImage
          ? `data:image/jpg;base64,${result.faceImage}`
          : undefined;
      }
    }

    // TODO: Add a modal to preview scanned data
    //TODO: Cleaned up the modal page
    // calling the modal
    this.presentModal(this.results, 'MRZ');

    // calling native method
    this.sendData(scanningResults);
  }

  // Returns a String with scanned result
  getIdResultsString(result: BlinkID.BlinkIdCombinedRecognizerResult) {
    return (
      this.buildResult(result.firstName, 'FirstName') +
      this.buildResult(result.lastName, 'LastName') +
      this.buildResult(result.fullName, 'FullName') +
      this.buildResult(result.localizedName, 'LocalizedName') +
      this.buildResult(result.additionalNameInformation, 'AdditionalNameInfo') +
      this.buildResult(result.address, 'Address') +
      this.buildResult(
        result.additionalAddressInformation,
        'AdditionalAddressInfo'
      ) +
      this.buildResult(result.documentNumber, 'DocumentNumber') +
      this.buildResult(
        result.documentAdditionalNumber,
        'AdditionalDocumentNumber'
      ) +
      this.buildResult(result.sex, 'Sex') +
      this.buildResult(result.issuingAuthority, 'IssuingAuthority') +
      this.buildResult(result.nationality, 'Nationality') +
      this.buildDateResult(result.dateOfBirth, 'DateOfBirth') +
      this.buildIntResult(result.age, 'Age') +
      this.buildDateResult(result.dateOfIssue, 'DateOfIssue') +
      this.buildDateResult(result.dateOfExpiry, 'DateOfExpiry') +
      this.buildResult(
        result.dateOfExpiryPermanent.toString(),
        'DateOfExpiryPermanent'
      ) +
      this.buildResult(result.maritalStatus, 'MartialStatus') +
      this.buildResult(result.personalIdNumber, 'PersonalIdNumber') +
      this.buildResult(result.profession, 'Profession') +
      this.buildResult(result.race, 'Race') +
      this.buildResult(result.religion, 'Religion') +
      this.buildResult(result.residentialStatus, 'ResidentialStatus')
    );
  }

  getMrzResultsString(result: BlinkID.MrtdCombinedRecognizerResult) {
    const mrzResult = result.mrzResult;
    return (
      this.buildResult(mrzResult.primaryId, 'PrimaryID') +
      this.buildResult(mrzResult.secondaryId, 'SecondaryID') +
      this.buildResult(mrzResult.gender, 'Gender') +
      this.buildResult(mrzResult.issuer, 'Issuer') +
      this.buildResult(mrzResult.nationality, 'Nationality') +
      this.buildDateResult(mrzResult.dateOfBirth, 'DateOfBirth') +
      this.buildIntResult(mrzResult.age, 'Age') +
      this.buildDateResult(mrzResult.dateOfExpiry, 'DateOfExpiry') +
      this.buildResult(mrzResult.documentCode, 'DocumentCode') +
      this.buildResult(mrzResult.documentType, 'DocumentType') +
      this.buildResult(mrzResult.opt1, 'Optional1') +
      this.buildResult(mrzResult.opt2, 'Optional2') +
      this.buildResult(mrzResult.mrzText, 'MRZText')
    );
  }

  buildResult(result, key) {
    if (result && result !== '') {
      return `${key}: ${result}/n`;
    }
    return '';
  }

  buildDateResult(result, key) {
    if (result && result.year !== 0) {
      return this.buildResult(
        `${result.day}.${result.month}.${result.year}`,
        key
      );
    }
    return '';
  }

  buildIntResult(result, key) {
    if (result >= 0) {
      return this.buildResult(result.toString(), key);
    }
    return '';
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

  async sendData(result) {
    let firstName;
    let lastName;
    let documentNumber;
    let sex;
    let age;

    for (const scan of result) {
      if (scan instanceof BlinkID.BlinkIdCombinedRecognizerResult) {
        firstName = scan.firstName;
        lastName = scan.lastName;
        documentNumber = scan.documentNumber;
        if (scan.sex.toLowerCase().trim() === 'm') {
          sex = 'Male';
        } else {
          sex = 'Female';
        }

        age = scan.age;
      }
    }
    const { response } = await LauncherActivity.sendMRT({
      Tazkira_no_001: documentNumber,
      name: firstName,
      father_name: lastName,
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
