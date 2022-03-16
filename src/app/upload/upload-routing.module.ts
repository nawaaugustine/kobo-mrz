import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadPage } from './upload.page';

const routes: Routes = [
  {
    path: '',
    component: UploadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadPageRoutingModule {}
