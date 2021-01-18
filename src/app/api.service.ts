import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _fakeDatas = [
    {name: 'Chat'},
    {name: 'Chien'},
    {name: 'Elephant'},
    {name: 'Girafe'},
    {name: 'Ourse'},
    {name: 'Oiseau'},
  ];

  async getList() {
    return this._fakeDatas;
  }
}
