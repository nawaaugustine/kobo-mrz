import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanDataPageRoutingModule } from './scan-data-routing.module';

import { ScanDataPage } from './scan-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanDataPageRoutingModule
  ],
  declarations: [ScanDataPage]
})
export class ScanDataPageModule {}
