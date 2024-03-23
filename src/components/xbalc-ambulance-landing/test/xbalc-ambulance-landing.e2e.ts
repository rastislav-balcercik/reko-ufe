import { newE2EPage } from '@stencil/core/testing';

describe('xbalc-ambulance-landing', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xbalc-ambulance-landing></xbalc-ambulance-landing>');

    const element = await page.find('xbalc-ambulance-landing');
    expect(element).toHaveClass('hydrated');
  });
});
