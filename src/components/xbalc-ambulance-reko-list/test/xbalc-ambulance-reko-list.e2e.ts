import { newE2EPage } from '@stencil/core/testing';

describe('xbalc-ambulance-reko-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xbalc-ambulance-reko-list></xbalc-ambulance-reko-list>');

    const element = await page.find('xbalc-ambulance-reko-list');
    expect(element).toHaveClass('hydrated');
  });
});
