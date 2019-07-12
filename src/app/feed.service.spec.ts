import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from  '@angular/common/http/testing';
import { FeedService } from './feed.service';
import { MockData, MockDataTags } from './mockdata'

describe('FeedService', () => {

  let httpTestingController: HttpTestingController;
  let service: FeedService;

  beforeEach((
    () => {
      TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FeedService]
    }).compileComponents();
  }));

  beforeEach(() => {
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(FeedService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('send get request to retrieve images', () => {
    
    service.getPublicImages()
      .subscribe(data => {
        expect(data.title).toEqual('Uploads from everyone');
      });

    const req = httpTestingController.expectOne('http://127.0.0.1:3000/api');
    expect(req.request.method).toEqual('GET');

    req.flush(MockData);
  });

  it('send post request to retrieve images with tags', () => {
    
    const mockTags = 'dog';

    service.getPublicImagesWithTags(mockTags)
      .subscribe(data => {
        expect(data.title).toEqual('Recent Uploads tagged dog');
      });

    const req = httpTestingController.expectOne('http://127.0.0.1:3000/api');

    req.flush(MockDataTags);
  });

});
