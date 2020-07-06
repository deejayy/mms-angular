import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppFrameComponent } from './shared/app-frame/app-frame.component';

const routes: Routes = [
  {
    path: '',
    component: AppFrameComponent,
  },
  {
    path: 'mmscreen',
    loadChildren: () => import('./feature/mmscreen/mmscreen.module').then(m => m.MmscreenModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
