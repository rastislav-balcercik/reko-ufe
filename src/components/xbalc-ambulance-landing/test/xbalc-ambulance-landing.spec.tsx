import { newSpecPage } from '@stencil/core/testing';
import { XbalcAmbulanceLanding } from '../xbalc-ambulance-landing';

describe('xbalc-ambulance-landing', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XbalcAmbulanceLanding],
      html: `<xbalc-ambulance-landing></xbalc-ambulance-landing>`,
    });
    expect(page.root).toEqualHtml(`
      <xbalc-ambulance-landing>
        <mock:shadow-root>
          <slot>
            <h1>Recovery support</h1>
          </slot>
        </mock:shadow-root>
      </xbalc-ambulance-landing>
    `);
  });
});
