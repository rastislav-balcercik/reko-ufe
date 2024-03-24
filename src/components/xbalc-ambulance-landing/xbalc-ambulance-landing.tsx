import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'xbalc-ambulance-landing',
  styleUrl: 'xbalc-ambulance-landing.css',
  shadow: true,
})
export class XbalcAmbulanceLanding {

  render() {
    return (
      <Host>
        <slot>
          <h1>Recovery support</h1>
        </slot>
      </Host>
    );
  }

}
