import { TestBed } from '@angular/core/testing';

import { SocketChatsService } from './socket-chats.service';

describe('SocketChatsService', () => {
  let service: SocketChatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketChatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
