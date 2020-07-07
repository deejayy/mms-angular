import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MmscreenComponent } from './component/mmscreen/mmscreen.component';
import { MmscreenRoutingModule } from './mmscreen-routing.module';
import { MemberSetComponent } from './component/member-set/member-set.component';

@NgModule({
  declarations: [MmscreenComponent, MemberSetComponent],
  imports: [CommonModule, MmscreenRoutingModule],
})
export class MmscreenModule {}
