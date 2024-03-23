import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'xbalc-ambulance-reko-editor',
  styleUrl: 'xbalc-ambulance-reko-editor.css',
  shadow: true,
})
export class XbalcAmbulanceRekoEditor {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
