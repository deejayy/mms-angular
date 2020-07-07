import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MmscreenComponent } from './component/mmscreen/mmscreen.component';
import { MmscreenRoutingModule } from './mmscreen-routing.module';
import { MemberSetComponent } from './component/member-set/member-set.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddUserModalComponent } from './component/add-user-modal/add-user-modal.component';

@NgModule({
  declarations: [MmscreenComponent, MemberSetComponent, AddUserModalComponent],
  imports: [CommonModule, MmscreenRoutingModule, ReactiveFormsModule],
})
export class MmscreenModule {}
