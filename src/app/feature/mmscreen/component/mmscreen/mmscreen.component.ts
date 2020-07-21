import { Component, OnInit, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { of, Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { MemberSetComponent } from '../member-set/member-set.component';
import { take, map } from 'rxjs/operators';
import { SaveRequest, DataRow, MemberSetting } from '../../model/mmscreen.model';
import { initialMemberSettings } from '../../mock/member-settings.mock';
import { mmScreenResponse } from '../../mock/backend-response.mock';
import { ApiFacade } from '@app/core/api/store/api.facade';
import { ApiCallItem } from '@app/core/api/model/api-call-item.model';
import { ApiResultState } from '@app/core/api/store/api.state';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-mmscreen',
  templateUrl: './mmscreen.component.html',
  styleUrls: ['./mmscreen.component.scss'],
})
export class MmscreenComponent implements OnInit {
  @Output() public save: EventEmitter<SaveRequest> = new EventEmitter<SaveRequest>();
  public disableNewSetting$: Observable<boolean> = of(false);
  public changed: boolean = false;

  public data$: Observable<DataRow[]> = of(mmScreenResponse);
  public error$: Observable<boolean>;
  public errorData$: Observable<HttpErrorResponse>;

  public showModal: boolean = false;
  public response: ApiResultState;

  @ViewChildren(MemberSetComponent) public memberSets: QueryList<MemberSetComponent>;

  public memberSettings$: BehaviorSubject<MemberSetting[]> = new BehaviorSubject(initialMemberSettings);

  constructor(private apiFacade: ApiFacade) {
    const apiCall: ApiCallItem = { url: '/assets/mock-data.json' };
    this.apiFacade.callApi(apiCall);
    this.response = this.apiFacade.createApiResults(apiCall);
    this.data$ = this.response.data$.pipe(map(data => data ? Object.values(data) : []));
    this.error$ = this.response.error$;
    this.errorData$ = this.response.errorData$;

    this.disableNewSetting$ = combineLatest(
      this.memberSettings$.asObservable(),
      this.data$,
    ).pipe(map(([settings, data]) => settings && data && settings.length === data.length));
  }

  public ngOnInit() {
  }

  public closeModal(event: MouseEvent) {
    this.showModal = false;
  }

  public overlayClick(event: MouseEvent) {
    const clickedElement = (<HTMLElement>event.target).tagName;
    if (clickedElement === 'APP-ADD-USER-MODAL') {
      this.closeModal(event);
    }
  }

  public displayModal(event: MouseEvent) {
    event.preventDefault();
    this.showModal = true;
  }

  public addRow(event: MouseEvent) {
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
    this.changed = true;
    this.memberSettings$.next(
      this.memberSets.toArray().map(memberSetComponent => ({
        person_id: memberSetComponent.memberForm.value.personId,
        role: memberSetComponent.memberForm.value.role,
        access_level: memberSetComponent.memberForm.value.accessLevel,
      })),
    );
  }

  public removeRow(personId: string, idx: number) {
    this.changed = true;
    if (personId) {
      this.memberSettings$.next(this.memberSettings$.getValue().filter(setting => setting.person_id !== personId));
    } else {
      this.memberSettings$.next(this.memberSettings$.getValue().filter((_, index) => index !== idx));
    }
  }

  public saveEvent(event: MouseEvent) {
    // this.save.emit
    console.warn({
      members: this.memberSettings$.getValue().filter(setting => !!setting.person_id),
    });
  }
}
