import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as xml2js from 'xml2js';
import { NewsRss } from '../../models/news-rss';
import { FeedsUrl } from './feeds';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  RssData: NewsRss;
  visibleSidebar = false;
  feedsUrl = FeedsUrl;
  feedData: any = { feed: { title: '' }, items: [1, 2] };
  feedArray = [];

  // worked
  newsBitcoin = 'https://news.bitcoin.com/feed/';
  ccn = 'https://www.ccn.com/feed/';
  deCrypt = 'https://decrypt.co/feed';
  blokt = 'https://blokt.com/feed';
  theBlockChain = 'https://www.the-blockchain.com/feed/';

  // Using rss feed app free
  // coinDesk = 'https://rss.app/feeds/eawQ6rZvhg7nQhpa.xml';
  // coinTelegraph = 'https://rss.app/feeds/C0iw2FvLIMGBk9A7.xml';
  // mixCoinDeskCoinTelegraph = 'http://www.rssmix.com/u/12026658/rss.xml';

  // Unblock using feed2json.org
  prefixRss2JSONFeed = 'https://feed2json.org/convert?url=';

  // Unblock using rss2json
  prefixRss2JSON = 'https://api.rss2json.com/v1/api.json?rss_url=';

  coinDesk = 'https%3A%2F%2Fwww.coindesk.com%2Ffeed';
  coinTelegraph = 'https%3A%2F%2Fcointelegraph.com%2Ffeed';
  ambCrypto = 'https://eng.ambcrypto.com/feed/';
  bitcoinMagazine = 'https://bitcoinmagazine.com/feed';
  newsBTC = 'https://www.newsbtc.com/feed/';
  bitCoinist = 'https://bitcoinist.com/feed/';
  theBlockCrypto = 'https://www.theblockcrypto.com/rss.xml';
  bitcoinExchangeGuide = 'https://bitcoinexchangeguide.com/feed/';
  blockOnomi = 'https://blockonomi.com/feed/';
  cryptoSlate = 'https://cryptoslate.com/feed/';
  btcManager = 'https://btcmanager.com/feed';
  insideBitcoins = 'https://insidebitcoins.com/feed';
  coinSpeaker = 'https://www.coinspeaker.com/feed/';
  cryptoNews = 'https://cryptonews.com/news/feed';
  cryptoBriefing = 'https://cryptobriefing.com/feed/';
  cryptoPotato = 'https://cryptopotato.com/feed/';
  dailyHodl = 'https://dailyhodl.com/feed/';
  coinJournal = 'https://coinjournal.net/feed/';
  ethereumWorldNews = 'https://en.ethereumworldnews.com/feed/';
  cryptoNinjas = 'http://www.cryptoninjas.net/feed/';
  coinCenter = 'https://www.coincenter.org/feed/';
  beinCrypto = 'https://beincrypto.com/feed/';
  theBitCoinNews = 'https://thebitcoinnews.com/feed/';
  coinGeek = 'https://coingeek.com/feed/';
  coinGape = 'https://coingape.com/feed/';
  liveBitCoinNews = 'https://www.livebitcoinnews.com/feed/';
  trustNodes = 'https://www.trustnodes.com/feed/';
  nullTx = 'https://nulltx.com/feed/';
  coinIdol = 'https://coinidol.com/rss2/';
  investBlockChain = 'https://www.investinblockchain.com/feed/';
  bitsOnline = 'https://bitsonline.com/feed/';
  cryptoDaily = 'https://cryptodaily.co.uk/feed';
  blockTribune = 'https://blocktribune.com/feed';
  zyCrypto = 'https://zycrypto.com/feed/';
  useTheBitcoin = 'https://usethebitcoin.com/feed/';
  smartEtereum = 'https://smartereum.com/feed/';
  bitcoinGarden = 'https://bitcoingarden.org/feed';
  blockManity = 'https://blockmanity.com/feed/';
  coinPedia = 'https://coinpedia.org/feed/';
  forkLog = 'https://forklog.media/feed/';
  altCoinBuzz = 'https://www.altcoinbuzz.io/feed/';
  coinFox =
    'http://www.coinfox.info/?option=com_content&view=featured&Itemid=160&format=feed&type=rss';
  // Maybe we do not need to use 2Ffeed
  kryptoMoney = 'http://feeds.feedburner.com/kryptomoney';
  bitcoinNews = 'https://bitcoinnews.com/feed/';
  bitcoinWarrior = 'https://bitcoinwarrior.net/feed/';
  btcWires = 'https://www.btcwires.com/feed/';
  coinRevolution = 'https://www.coinrevolution.com/feed/';
  bitcoinPrBuzz = 'https://bitcoinprbuzz.com/feed/';
  coinNewsAsia = 'https://www.coinnewsasia.com/feed/';
  news8btc = 'https://news.8btc.com/feed';
  bitcoins7 = 'https://www.7bitcoins.com/feed/';
  dcForecasts = 'https://www.dcforecasts.com/feed/';
  globalCryptoPress = 'https://www.globalcryptopress.com/feeds/posts/default';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const dateNow = this.returnDateNow();

    if (dateNow === JSON.parse(localStorage.getItem('dateNow'))) {
      console.log('getting from LS');
      this.feedArray = JSON.parse(localStorage.getItem('feeds'));
    } else {
      this.feedArray = [];
      for (const item of this.feedsUrl) {
        this.getNewsFeedsUrl(item);
      }
    }

    // this.getNewsFeed();
  }

  loadNews(event) {
    console.log(event.target.innerText);
    this.feedsUrl.forEach((item) => {
      if (item.name === event.target.innerText.trim()) {
        this.getNewsFeedsUrl(item.url);
      }
    });
    this.visibleSidebar = false;
  }

  getNewsFeedsUrl(item) {
    const url = item.url;
    this.http
      .get<any>('https://api.rss2json.com/v1/api.json?rss_url=' + url)
      .subscribe(
        (data) => {
          this.feedArray.push({ ...data, symbol: item.symbol });
          console.log(this.feedArray.length);

          if (this.feedArray.length >= 58) {
            localStorage.setItem('feeds', JSON.stringify(this.feedArray));
            const dateNow = this.returnDateNow();
            localStorage.setItem('dateNow', JSON.stringify(dateNow));
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  returnDateNow() {
    const dateNow =
      new Date().getFullYear() +
      '.' +
      new Date().getMonth() +
      '.' +
      new Date().getDate();
    return dateNow;
  }

  getNewsFeed() {
    const requestOptions: object = {
      observe: 'body',
      responseType: 'text/html',
    };
    this.http
      .get<any>('https://www.financemagnates.com/feed/', requestOptions)
      .subscribe(
        (data) => {
          xml2js.parseString(data, (error, result: NewsRss) => {
            this.RssData = result;
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
