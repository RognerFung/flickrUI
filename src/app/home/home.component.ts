import { Component, OnInit } from '@angular/core';
import { FeedService } from 'src/app/feed.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: any;
  data: any;

  constructor(
    public feedService: FeedService
  ) { }

  ngOnInit() {
    this.feedService.getPublicImages().subscribe(data => {
      console.log(data);
      if (data) {
        this.data = data;
        this.items = data.items;
      }
    });
  }

  //clear tags and research for random
  resetSearch() {
    this.ngOnInit();
  }

  //search for tags
  onSearch(event) {
    this.feedService.getPublicImagesWithTags(event).subscribe(data => {
      console.log(data);
      if (data) {
        this.data = data;
        this.items = data.items;
      }
    });
  }
}
