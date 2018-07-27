import { ChecklistPage } from './app.po';

describe('checklist App', () => {
  let page: ChecklistPage;

  beforeEach(() => {
    page = new ChecklistPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
