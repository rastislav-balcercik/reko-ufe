import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import { UserType } from '../../utils/enums';

@Component({
  tag: 'xbalc-ambulance-reko-list',
  styleUrl: 'xbalc-ambulance-reko-list.css',
  shadow: true,
})
export class XbalcAmbulanceRekoList {
  @Event() entryClicked: EventEmitter<string>;

  @Prop() apiBase: string;
  @Prop() username: string;
  @Prop() userType: UserType;

  // private async getUserReconvalescenceList() {
  //   try {
  //     const response = 
  //   }
  // }

  render() {
    return (
      <Host>
        <slot>

        </slot>
      </Host>
    );
  }

}
