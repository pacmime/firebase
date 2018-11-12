import { TestBed, inject } from '@angular/core/testing';

import { FirestoreService } from './firestore.service';

describe('FirestoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirestoreService]
    });
  });

  it('should ...', inject([FirestoreService], (service: FirestoreService) => {
    expect(service).toBeTruthy();
  }));
});
