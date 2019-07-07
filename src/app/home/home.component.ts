import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: any;
  constructor(
    private http: HttpClient
  ) { }

  async ngOnInit() {
    const resp = await this.getPublicImages();
    this.items = resp.items;
  }

	async getPublicImages() {
		return this.http.get('http://127.0.0.1:3000').toPromise<any>();
  }
  
	async getPublicImagesWithTags(tags) {
		return this.http.post('http://127.0.0.1:3000', {tags}).toPromise<any>();
  }

  //clear tags and research for random
  resetSearch() {
    this.ngOnInit();
  }

  //search for tags
  async onSearch(event) {
    const resp = await this.getPublicImagesWithTags(event);
    this.items = resp.items;
  }
}
