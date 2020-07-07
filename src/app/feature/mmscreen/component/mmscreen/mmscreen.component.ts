import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { of, Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { MemberSetComponent } from '../member-set/member-set.component';
import { take, map } from 'rxjs/operators';

export interface DataRow {
  person_id: string;
  firstname: string;
  lastname: string;
  title: string;
  business_unit: string;
  is_user: boolean;
}

export interface MemberSetting {
  person_id: string;
  role: string;
  access_level: string;
}

@Component({
  selector: 'app-mmscreen',
  templateUrl: './mmscreen.component.html',
  styleUrls: ['./mmscreen.component.scss'],
})
export class MmscreenComponent implements OnInit {
  public disableNewSetting$: Observable<boolean> = of(false);

  public data$: Observable<DataRow[]> = of([
    {
      person_id: '7e3b1912-efb8-41bd-851f-e7f5a45341e9',
      firstname: 'Clifford',
      lastname: 'Mowery',
      title: 'Electronics technician',
      business_unit: 'Manufacturing',
      is_user: true,
    },
    {
      person_id: '05c34c2c-1d0c-4454-ac2a-56f66fa550f7',
      firstname: 'Maria',
      lastname: 'Anderson',
      title: 'Recording engineer',
      business_unit: 'Manufacturing',
      is_user: true,
    },
    {
      person_id: '0bef3100-e1cc-4b53-81b4-a7ed43422973',
      firstname: 'Mark',
      lastname: 'Sim',
      title: 'Nuclear engineer',
      business_unit: 'Operations',
      is_user: true,
    },
    {
      person_id: 'caa6bb48-0160-470e-991e-59057fad5301',
      firstname: 'Jonathan',
      lastname: 'McCutcheon',
      title: '',
      business_unit: '',
      is_user: false,
    },
    {
      person_id: '476c949d-9374-4e9e-9f82-d519ba0c0839',
      firstname: 'Henry K',
      lastname: 'Garcia',
      title: 'Head of Sales',
      business_unit: '',
      is_user: false,
    },
  ]);

  public showModal: boolean = false;

  @ViewChildren(MemberSetComponent) public memberSets: QueryList<MemberSetComponent>;

  public memberSettings$: BehaviorSubject<MemberSetting[]> = new BehaviorSubject([
    {
      person_id: '7e3b1912-efb8-41bd-851f-e7f5a45341e9',
      role: 'customer',
      access_level: 'read',
    },
    {
      person_id: '05c34c2c-1d0c-4454-ac2a-56f66fa550f7',
      role: 'manager',
      access_level: 'admin',
    },
    {
      person_id: '0bef3100-e1cc-4b53-81b4-a7ed43422973',
      role: 'employee',
      access_level: 'write',
    },
  ]);

  constructor() {}

  public ngOnInit() {
    this.disableNewSetting$ = combineLatest(
      this.memberSettings$.asObservable(),
      this.data$,
    ).pipe(map(([settings, data]) => settings.length === data.length));
  }

  public closeModal(event: MouseEvent) {
    this.showModal = false;
  }

  public overlayClick(event: MouseEvent) {
    const clickedElementClass = (<HTMLElement>event.target).className;
    if (clickedElementClass === 'modal') {
      this.closeModal(event);
    }
  }

  public displayModal(event: MouseEvent) {
    event.preventDefault();
    this.showModal = true;
  }

  public addNewSetting(event: MouseEvent) {
    event.preventDefault();
    combineLatest(
      this.memberSettings$.asObservable(),
      this.data$,
    )
    .pipe(take(1))
    .subscribe(
      ([settings, data]) => {
        if (settings.length < data.length) {
          this.memberSettings$.next(
            [
              ... settings,
              {
                person_id: '',
                role: '',
                access_level: '',
              },
            ],
          );
        }
      },
    );
  }

  public setChanged(event: MemberSetting) {
    this.memberSettings$.next(
      this.memberSets.toArray().map(memberSetComponent => ({
        person_id: memberSetComponent.memberForm.value.personId,
        role: memberSetComponent.memberForm.value.role,
        access_level: memberSetComponent.memberForm.value.accessLevel,
      })),
    );
  }
}
