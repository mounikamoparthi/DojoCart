import { Injectable } from '@angular/core';
import {Http} from "@angular/http"
import {Userrecord} from "./user/user"
import {ProductInfo} from "./bicycle"

import "rxjs"
@Injectable()
export abstract class StorageService {
  public abstract get(): Storage;
}
// tslint:disable-next-line:max-classes-per-file
@Injectable()
export class LocalStorageServie extends StorageService {
  public get(): Storage {
    return localStorage;
  }
}