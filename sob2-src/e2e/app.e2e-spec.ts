import { SobPage } from './app.po';

describe('sob App', () => {
  let page: SobPage;

  beforeEach(() => {
    page = new SobPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
