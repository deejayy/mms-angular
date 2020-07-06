import { Component, OnInit } from '@angular/core';

export interface Role {
  name: string;
  value: string;
}

export interface AccessLevel {
  name: string;
  value: string;
}

@Component({
  selector: 'app-mmscreen',
  templateUrl: './mmscreen.component.html',
  styleUrls: ['./mmscreen.component.scss'],
})
export class MmscreenComponent implements OnInit {
  public data = [
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

  public roles: Role[] = [
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

  public accessLevels: AccessLevel[] = [
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

  public showModal: boolean = false;

  constructor() {}

  public ngOnInit() {}

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
    this.showModal = true;
    event.preventDefault();
  }
}
