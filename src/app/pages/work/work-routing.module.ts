import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkDetailComponent } from './work-detail/work-detail.component';

const routes: Routes = [
  {
    path: "work-detail/:id",
    component: WorkDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkRoutingModule { }
