import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(
    private http: HttpClient
  ) { }

	getPublicImages(): Observable<any> {
		return this.http.get('http://127.0.0.1:3000/api');
  }
  
	getPublicImagesWithTags(tags): Observable<any> {
		return this.http.post('http://127.0.0.1:3000/api', {tags});
  }

}
