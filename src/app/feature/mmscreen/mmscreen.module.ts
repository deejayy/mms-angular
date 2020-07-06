import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MmscreenComponent } from './component/mmscreen/mmscreen.component';
import { MmscreenRoutingModule } from './mmscreen-routing.module';

@NgModule({
  declarations: [MmscreenComponent],
  imports: [CommonModule, MmscreenRoutingModule],
})
export class MmscreenModule {}
