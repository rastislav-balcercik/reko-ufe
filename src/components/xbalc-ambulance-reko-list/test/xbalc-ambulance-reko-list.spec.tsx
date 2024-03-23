import { newSpecPage } from '@stencil/core/testing';
import { XbalcAmbulanceRekoList } from '../xbalc-ambulance-reko-list';

describe('xbalc-ambulance-reko-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XbalcAmbulanceRekoList],
      html: `<xbalc-ambulance-reko-list></xbalc-ambulance-reko-list>`,
    });
    expect(page.root).toEqualHtml(`
      <xbalc-ambulance-reko-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xbalc-ambulance-reko-list>
    `);
  });
});
