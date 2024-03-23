import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'xbalc-ambulance-reko-list',
  styleUrl: 'xbalc-ambulance-reko-list.css',
  shadow: true,
})
export class XbalcAmbulanceRekoList {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
