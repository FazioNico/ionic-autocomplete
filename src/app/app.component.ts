import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'IonicAutocomplete';
  items: any[] = [];
  form: FormGroup = new FormGroup({
    selected: new FormControl(null)
  });

  constructor(
    private _apiService: ApiService
  ) {}

  async inputChanged($event): Promise<void> {
    const value = $event.target.value;
    if (value.length <= 0) {
      this.items = [];
      return;
    }
    const list = await this._apiService.getList();
    const items = list.filter(
      item => item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    this.items = items;
  }

  selected(item, input): void {
    input.value = '';
    this.form.patchValue({selected: item});
    this.items = [];
  }
}
