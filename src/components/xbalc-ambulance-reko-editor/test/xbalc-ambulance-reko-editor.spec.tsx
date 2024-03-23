import { newSpecPage } from '@stencil/core/testing';
import { XbalcAmbulanceRekoEditor } from '../xbalc-ambulance-reko-editor';

describe('xbalc-ambulance-reko-editor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XbalcAmbulanceRekoEditor],
      html: `<xbalc-ambulance-reko-editor></xbalc-ambulance-reko-editor>`,
    });
    expect(page.root).toEqualHtml(`
      <xbalc-ambulance-reko-editor>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xbalc-ambulance-reko-editor>
    `);
  });
});
