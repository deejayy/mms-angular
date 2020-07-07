import { HttpErrorResponse } from '@angular/common/http';

export interface ApiCallItem {
  url: string;
  apiUrl?: string;
  auth?: boolean;
  data?: object;
  useExisting?: boolean;
  error?: HttpErrorResponse;
}
