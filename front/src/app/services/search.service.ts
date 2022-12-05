import {Injectable, ViewChild} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public searchText = '';

  constructor() {}

  searchValue() {
    return this.searchText;
  }
}
