import { newE2EPage } from '@stencil/core/testing';

describe('xbalc-ambulance-reko-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xbalc-ambulance-reko-editor></xbalc-ambulance-reko-editor>');

    const element = await page.find('xbalc-ambulance-reko-editor');
    expect(element).toHaveClass('hydrated');
  });
});
