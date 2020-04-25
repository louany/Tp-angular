import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameApiService } from '../game-api.service'


import { GameFilter } from 'src/core/models/gameFilter';
import { Category } from 'src/core/models/category';

@Component({
  selector: 'app-game-list-filter',
  templateUrl: './game-list-filter.component.html',
  styleUrls: ['./game-list-filter.component.scss']
})
export class GameListFilterComponent implements OnInit {

  gameCategories: Category[];

  form: GameFilter = { 
    name: '', 
    category: '', 
    editor: '' 
  };

  @Output()
  filter = new EventEmitter<GameFilter>();
  
  constructor( private gameApiService : GameApiService) { }

  getListCategories(){
    this.gameApiService.getCategories().subscribe((data)=>{
      this.gameCategories = data;
    });
  }

  onChange(key: string, value: string) {
    if (key !== 'category') { value = value.trim().toLowerCase(); }
    this.form[key] = value;
  }

  onSubmit(event: any) {
    event.preventDefault();
    this.filter.emit(this.form);
  }

  onReset() {
    this.form = { name: '', category: '', editor: '' };
    this.filter.emit(this.form);
  }
   
  ngOnInit() {
    this.getListCategories();
  }

}
