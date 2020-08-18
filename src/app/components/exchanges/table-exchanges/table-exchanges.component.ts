import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { CoinPaprikaService } from '../../../services/coin-paprika.service';

import { CoinLoreService } from '../../../services/coinLore.service';

import { Exchange } from '../../../models/Exchange';

@Component({
  selector: 'app-table-exchanges',
  templateUrl: './table-exchanges.component.html',
  styleUrls: ['./table-exchanges.component.scss'],
})
export class TableExchangesComponent implements OnInit {
  exchanges: Exchange[];

  @Output() totalExchangesMessageEvent = new EventEmitter<number>();
  totalExchanges: number;

  constructor(
    private coinPaprikaService: CoinPaprikaService,
    private coinLoreService: CoinLoreService
  ) {}

  ngOnInit(): void {
    this.coinPaprikaService.getAllExchanges().subscribe(
      (res) => {
        // necessary to remove exchanges with no rank!
        const rankedExchanges = [];
        const noRankedExchanges = [];
        for (const item of res) {
          if (item.adjusted_rank !== null && item.adjusted_rank !== undefined) {
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
    window.location.href = `${link.currentTarget.innerHTML}`;
  }
}
