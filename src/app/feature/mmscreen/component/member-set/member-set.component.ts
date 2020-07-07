import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataRow, MemberSetting } from '../mmscreen/mmscreen.component';

export interface Role {
  name: string;
  value: string;
}

export interface AccessLevel {
  name: string;
  value: string;
}

export const accessLevels: AccessLevel[] = [
  {
    name: 'Read',
    value: 'read',
  },
  {
    name: 'Write',
    value: 'write',
  },
  {
    name: 'Admin',
    value: 'admin',
  },
];

export const roleList: Role[] = [
  {
    name: 'Customer',
    value: 'customer',
  },
  {
    name: 'Employee',
    value: 'employee',
  },
  {
    name: 'Manager',
    value: 'manager',
  },
];

@Component({
  selector: 'app-member-set',
  templateUrl: './member-set.component.html',
  styleUrls: ['./member-set.component.scss'],
})
export class MemberSetComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public data: MemberSetting;
  @Input() public users$: Observable<DataRow[]>;
  @Input() public settings$: Observable<MemberSetting[]>;
  @Output() public change: EventEmitter<MemberSetting> = new EventEmitter<MemberSetting>();
  @Output() public remove: EventEmitter<string> = new EventEmitter<string>();

  private subs: Subscription = new Subscription();

  public filteredUsers$: Observable<DataRow[]>;

  public users: any[] = [
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
  ];

  public roles: Role[] = roleList;

  public accessLevels: AccessLevel[] = accessLevels;

  public memberForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.memberForm = this.formBuilder.group({
      personId: [ '' ],
      role: [ '' ],
      accessLevel: [ '' ],
    });
  }

  public ngOnInit() {
    this.filteredUsers$ = combineLatest(
      this.users$,
      this.settings$,
    ).pipe(
      map(([users, settings]) => {
        return users.filter(user => {
          return !settings
            .map(setting => setting.person_id)
            .includes(user.person_id) || user.person_id === this.memberForm.get('personId').value;
        });
      }),
    );

    this.subs.add(
      this.memberForm.valueChanges.subscribe(value => {
        this.change.emit(value);
      }),
    );
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.data.currentValue) {
      this.memberForm.setValue({
        personId: changes.data.currentValue.person_id || '',
        role: changes.data.currentValue.role || '',
        accessLevel: changes.data.currentValue.access_level || '',
      }, { emitEvent: false });
    }
  }

  public removeRow(event: MouseEvent) {
    this.remove.emit(this.memberForm.get('personId').value);
  }

  public ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
