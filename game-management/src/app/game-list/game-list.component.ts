
import { Component, OnInit } from '@angular/core';

import { GameActions } from './game-actions';
import { GameApiService } from '../game-api.service';
import { Game } from 'src/core/models/game';
import { GameFilter } from 'src/core/models/gameFilter';


@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  defaultSize = 300;
  width = this.defaultSize;

  // games: Game[];
  filteredEntities: Game[];

  // array of all items to be paged
  items: Array<any>;

  // current page of items
  pageOfItems: Array<any>;
    
  private filterForm: GameFilter;

  constructor( private gameApiService : GameApiService) { }


  truncate(value: string) {
    const words = value.split(' ', 20);

    return words.join(' ') + (words.length > 20 ? + '...' : '');
  }

  sizeUp() {
    this.width += 10;
  }

  sizeDown() {
    this.width = Math.max(100, this.width - 10);
  }

  sizeReset() {
    this.width = this.defaultSize;
  }

  onActionClick(action: GameActions, game: Game) {
    alert(`${['delete'][action]} the game nammed ${game.title}`);
  }


  onFilter(filterForm: GameFilter) {
    this.filterForm = filterForm;
    this.filter();
  }

  private filter(){
    if(this.items)
    if(this.filterForm)
    this.filteredEntities = this.items.filter(game => 
              (!this.filterForm.name || game.title.toLocaleLowerCase().includes(this.filterForm.name))
          &&  (!this.filterForm.category || game.genres.find(genre => genre.name === (this.filterForm.category)))
          &&  (!this.filterForm.editor || game.developer.toLowerCase().includes(this.filterForm.editor)));
    else
    this.filteredEntities = this.items;
    this.pageOfItems = this.filteredEntities;
  }

  getListGames() {
    this.gameApiService.getGames().subscribe((data)=>{
      this.items = data;
      this.filter();
    });
  }

  ngOnInit() {
    this.getListGames();
  }

  onChangePage(pageOfItems: Array<any>) {
      // update current page of items
      this.pageOfItems = pageOfItems;
  }
}
