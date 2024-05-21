import { Component, Host, Prop, State, h } from '@stencil/core';
import { ActivePage, UserType } from '../../utils/enums';

@Component({
  tag: 'xbalc-ambulance-landing',
  styleUrl: 'xbalc-ambulance-landing.css',
  shadow: true,
})
export class XbalcAmbulanceLanding {
  @State() selectedUserType?: UserType;
  @State() username: string;
  @State() activePage: ActivePage = ActivePage.LANDING;

  @Prop() apiBase: string;

  private handleUserTypeClick(userType: UserType) {
    this.selectedUserType = userType;
  }

  private handleUsernameInput(event: InputEvent) {
    this.username = (event.target as HTMLInputElement).value;
  }

  private handleLoginUser() {
    if (this.selectedUserType && this.username) this.activePage = ActivePage.LIST;
  }

  render() {
    return (
      <Host>
        <slot>
          {this.activePage === ActivePage.LANDING && (
            <div class="landing-wrapper">
              <h1>Recovery support</h1>
              <span>Pooperačné poradenstvo</span>
              <p>Do portálu vstupujem ako</p>
              <div class="user-type-wrapper">
                <div class={{ 'user-type-card': true, 'active': this.selectedUserType === UserType.DOCTOR }} onClick={() => this.handleUserTypeClick(UserType.DOCTOR)}>
                  <md-icon>stethoscope</md-icon>
                  <p>Lekár</p>
                </div>
                <div class={{ 'user-type-card': true, 'active': this.selectedUserType === UserType.PATIENT }} onClick={() => this.handleUserTypeClick(UserType.PATIENT)}>
                  <md-icon>personal_injury</md-icon>
                  <p>Pacient</p>
                </div>
              </div>
              <md-outlined-text-field
                disabled={!this.selectedUserType}
                onInput={e => this.handleUsernameInput(e)}
                value={this.username}
                label="Prihlasovacie meno"
                placeholder="Zadajte prihlasovacie meno"
              ></md-outlined-text-field>
              <md-filled-button disabled={!this.selectedUserType || !this.username} onClick={() => this.handleLoginUser()}>
                Pokračovať
              </md-filled-button>
            </div>
          )}
          {this.activePage === ActivePage.LIST && (
            <xbalc-ambulance-reko-list apiBase={this.apiBase} username={this.username} userType={this.selectedUserType}></xbalc-ambulance-reko-list>
          )}
        </slot>
      </Host>
    );
  }
}
