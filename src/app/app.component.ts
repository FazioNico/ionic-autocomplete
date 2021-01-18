import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public items: {name: string}[] = [];
  public readonly form: FormGroup = new FormGroup({
    selected: new FormControl(null)
  });

  constructor(
    private readonly _apiService: ApiService
  ) {}

  async inputChanged($event): Promise<void> {
    // récupération de la valeur saisie
    const value = $event.target.value;
    // vider la list si le champ de saisie est vide
    if (value.length <= 0) {
      this.items = [];
      return; // stoper l'exection du script
    }
    // récupération de la liste de posibilités
    const list = await this._apiService.getList();
    // filtrer la list pour extraire uniquement les element pertinants
    const items = list.filter(
      item => item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    // assigner la liste d'items à `this.items`
    // cela va aussi afficher la liste de propositions dans le HTML
    this.items = items;
  }

  selected(item:{name: string}, input: HTMLIonInputElement): void {
    // vider la valeur du champ de saisie
    input.value = '';
    // mettre à jour le formuaire
    this.form.patchValue({selected: item});
    // cacher la liste d'items en vidant la liste
    this.items = [];
  }
}
