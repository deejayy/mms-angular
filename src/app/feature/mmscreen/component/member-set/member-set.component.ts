import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, combineLatest, Subscription, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AccessLevel, Role, MemberSetting, DataRow } from '../../model/mmscreen.model';
import { roleList, roleLevelMap } from '../../model/member-set.model';

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
  public roles: Role[] = roleList;
  public accessLevels$: Observable<AccessLevel[]>;
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

    this.accessLevels$ = this.memberForm.valueChanges.pipe(
      startWith(this.memberForm.value),
      map(value => roleLevelMap[value.role]),
    );
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.data.currentValue) {
      this.memberForm.setValue({
        personId: changes.data.currentValue.person_id || '',
        role: changes.data.currentValue.role || 'customer',
        accessLevel: changes.data.currentValue.access_level || 'read',
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
