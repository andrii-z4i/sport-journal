import { SportJournalPage } from './app.po';

describe('sport-journal App', () => {
  let page: SportJournalPage;

  beforeEach(() => {
    page = new SportJournalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
