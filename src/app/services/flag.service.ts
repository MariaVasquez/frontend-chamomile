import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class FlagService {
  public flagData = new BehaviorSubject<any>({});
}
