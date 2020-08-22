import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { CoinPaprikaService } from '../../../services/coin-paprika.service';

import { CoinLoreService } from '../../../services/coinLore.service';

import { Exchange } from '../../../models/Exchange';

import { SelectItem } from 'primeng/api';

interface OptionDropDown {
  name: string;
  value: number;
}

@Component({
  selector: 'app-table-exchanges',
  templateUrl: './table-exchanges.component.html',
  styleUrls: ['./table-exchanges.component.scss'],
})
export class TableExchangesComponent implements OnInit {
  exchanges: Exchange[];

  @Output() totalExchangesMessageEvent = new EventEmitter<number>();
  totalExchanges: number;

  optionsDropDown: SelectItem[];
  selectedDropDownOption: OptionDropDown;
  selected = 4;
  selectedName = 'Websites';

  constructor(
    private coinPaprikaService: CoinPaprikaService,
    private coinLoreService: CoinLoreService
  ) {}
  mrC9wFvrkR;
  ngOnInit(): void {
    this.optionsDropDown = [
      {
        label: 'Vol. 24h',
        value: 1,
      },
      {
        label: 'Currencies',
        value: 2,
      },
      {
        label: 'Markets',
        value: 3,
      },
      {
        label: 'Websites',
        value: 4,
      },
    ];

    this.coinPaprikaService.getAllExchanges().subscribe(
      (res) => {
        // necessary to remove exchanges with no rank and website link problem!
        const rankedExchanges = [];
        const noRankedExchanges = [];
        for (const item of res) {
          if (item.adjusted_rank !== null && item.adjusted_rank !== undefined) {
            if (!item.links) {
              item.links = { website: 'website missing' };
            } else if (item.links.website === ' ') {
              item.links.website = 'website missing';
            }

            if (item.description === '') {
              item.description = 'description missing, please check website';
            }

            if (item.id === 'yobit') {
              item.links.website[0] = 'https://yobit.net/en/';
            }

            rankedExchanges.push(item);
          } else {
            noRankedExchanges.push(item);
          }
        }

        this.exchanges = rankedExchanges;
        this.totalExchanges = rankedExchanges.length;
        this.sendMessageToParent();
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  sendMessageToParent() {
    this.totalExchangesMessageEvent.emit(this.totalExchanges);
  }

  onNavigate(link) {
    const temp = link.currentTarget.innerHTML.replace(' ', '');
    window.location.href = `https://${temp}`;
  }

  selection(event, dd) {
    this.selected = event.value;
    this.selectedName = dd.selectedOption.label;
    console.log('this.selected', this.selected);
    console.log('this.selectedName', this.selectedName);
  }
}
