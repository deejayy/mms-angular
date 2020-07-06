import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MmscreenComponent } from './component/mmscreen/mmscreen.component';

const subRoutes: Routes = [
  {
    path: '',
    component: MmscreenComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(subRoutes),
  ],
  exports: [RouterModule],
})
export class MmscreenRoutingModule {}
