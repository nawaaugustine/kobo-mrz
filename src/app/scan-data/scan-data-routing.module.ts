import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanDataPage } from './scan-data.page';

const routes: Routes = [
  {
    path: '',
    component: ScanDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanDataPageRoutingModule {}
