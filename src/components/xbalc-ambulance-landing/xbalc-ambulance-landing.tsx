import { Component, Host, Prop, State, h } from '@stencil/core';
import { ActivePage, UserType } from '../../utils/enums';

declare global {
  interface Window {
    navigation: any;
  }
}

@Component({
  tag: 'xbalc-ambulance-landing',
  styleUrl: 'xbalc-ambulance-landing.css',
  shadow: true,
})
export class XbalcAmbulanceLanding {
  @State() private relativePath = '';
  @State() selectedUserType?: UserType;
  @State() username: string;
  @State() activePage: ActivePage = ActivePage.LANDING;

  @Prop() apiBase: string;
  @Prop() basePath: string = '';

  componentWillLoad() {
    const baseUri = new URL(this.basePath, document.baseURI || '/').pathname;

    const toRelative = (path: string) => {
      if (path.startsWith(baseUri)) {
        this.relativePath = path.slice(baseUri.length);
      } else {
        this.relativePath = '';
      }
    };

    window.navigation?.addEventListener('navigate', (ev: Event) => {
      if ((ev as any).canIntercept) {
        (ev as any).intercept();
      }
      let path = new URL((ev as any).destination.url).pathname;
      
      if(!this.username && !this.selectedUserType) this.activePage = ActivePage.LANDING;
      else this.activePage = ActivePage.LIST;

      toRelative(path);
    });

    toRelative(location.pathname);
  }

  private handleUserTypeClick(userType: UserType) {
    this.selectedUserType = userType;
  }

  private handleUsernameInput(event: InputEvent) {
    this.username = (event.target as HTMLInputElement).value;
  }

  private handleLoginUser() {
    if (this.selectedUserType && this.username) this.activePage = ActivePage.LIST;
  }

  private handleLogoutUser() {
    window.navigation.navigate(new URL(this.basePath, new URL(this.basePath, document.baseURI)).pathname);

    this.activePage = ActivePage.LANDING;
    this.selectedUserType = undefined;
    this.username = undefined;

  }

  handleRedirectToDetail() {
    this.activePage = ActivePage.DETAIL;
  }

  render() {
    let entryId = '@new';

    if (this.relativePath.startsWith('ticket/')) {
      if (!this.username || !this.selectedUserType) this.handleLogoutUser();
      else {
        entryId = this.relativePath.split('/')[1];
        this.handleRedirectToDetail();
      }
    }

    const navigate = (path: string) => {
      const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
      window.navigation.navigate(absolute);
    };

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
                Pokračovať do portálu
              </md-filled-button>
            </div>
          )}
          {this.activePage === ActivePage.LIST && (
            <xbalc-ambulance-reko-list
              logout={() => this.handleLogoutUser()}
              apiBase={this.apiBase}
              username={this.username}
              userType={this.selectedUserType}
              onentry-clicked={(ev: CustomEvent<string>) => navigate('./ticket/' + ev.detail)}
            ></xbalc-ambulance-reko-list>
          )}
          {this.activePage === ActivePage.DETAIL && (
            <xbalc-ambulance-reko-editor
              logout={() => this.handleLogoutUser()}
              apiBase={this.apiBase}
              username={this.username}
              userType={this.selectedUserType}
              entryId={entryId}
              oneditor-closed={() => navigate('./')}
            ></xbalc-ambulance-reko-editor>
          )}
        </slot>
      </Host>
    );
  }
}
