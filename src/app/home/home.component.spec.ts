import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { FeedService } from '../feed.service';
import { Observable, Observer } from 'rxjs';
import { MockData, MockDataTags } from '../mockdata';

describe('User Async Component:', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [FeedService],
      imports: [HttpClientTestingModule]
    });
  });

  describe(':', () => {
    function setup() {
      const fixture = TestBed.createComponent(HomeComponent);
      const component = fixture.debugElement.componentInstance;
      const httpTestingController = TestBed.get(HttpTestingController);
      const service = fixture.debugElement.injector.get(
        FeedService
      );

      return { fixture, component, service, httpTestingController };
    }

    it('should create the component', () => {
      const { component } = setup();
      expect(component).toBeTruthy();
    });

    it('should get all public images and display all', fakeAsync(() => {
      const { fixture, component, service } = setup();
      spyOn(service, 'getPublicImages').and.returnValue(
        Observable.create((observer: Observer<any>) => {
          observer.next(MockData);
          return observer;
        })
      );

      tick();
      fixture.detectChanges();

      const element = fixture.debugElement.nativeElement;
      const imgs = element.querySelectorAll('img');
      expect(imgs.length).toEqual(MockData.items.length);
    }));
    
  });
});