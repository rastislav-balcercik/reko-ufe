import { Component, Host, Prop, State, h, EventEmitter, Event } from '@stencil/core';
import { ReconvalescenceTicket, ReconvalescenceTicketListApiFactory } from '../../api/reko-ufe';
import { UserType } from '../../utils/enums';

@Component({
  tag: 'xbalc-ambulance-reko-editor',
  styleUrl: 'xbalc-ambulance-reko-editor.css',
  shadow: true,
})
export class XbalcAmbulanceRekoEditor {
  @Prop() entryId: string;
  @Prop() apiBase: string;
  @Prop() logout: () => void;

  @Prop() username: string;
  @Prop() userType: UserType;

  @Event({ eventName: 'editor-closed' }) editorClosed: EventEmitter<string>;

  @State() entry: ReconvalescenceTicket;
  @State() errorMessage: string;
  @State() isValid: boolean;

  private formElement: HTMLFormElement;

  private async getReconalescenceTicket(): Promise<ReconvalescenceTicket> {
    if (this.entryId === '@new') {
      this.isValid = false;
      this.entry = {
        id: '@new',
        patientId: this.username,
        doctorId: '',
        message: '',
        reply: '',
        surgeryDate: new Date().toISOString(),
      };
      return this.entry;
    }
    if (!this.entryId) {
      this.isValid = false;
      return undefined;
    }
    try {
      const response = await ReconvalescenceTicketListApiFactory(undefined, this.apiBase).getReconvalescenceTicket(this.username, this.entryId);

      if (response.status < 299) {
        this.entry = response.data;
        this.isValid = true;
      } else {
        this.errorMessage = `Cannot retrieve list of reconvalescence tickets: ${response.statusText}`;
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve list of reconvalescence tickets: ${err.message || 'unknown'}`;
    }
    return undefined;
  }

  async componentWillLoad() {
    this.getReconalescenceTicket();
  }

  private handleInputEvent(ev: InputEvent): string {
    const target = ev.target as HTMLInputElement;
    // check validity of elements
    this.isValid = true;
    for (let i = 0; i < this.formElement.children.length; i++) {
      const element = this.formElement.children[i];
      if ('reportValidity' in element) {
        const valid = (element as HTMLInputElement).reportValidity();
        this.isValid &&= valid;
      }
    }
    return target.value;
  }

  private async updateEntry() {
    try {
      const api = ReconvalescenceTicketListApiFactory(undefined, this.apiBase);
      const response =
        this.entryId === '@new' ? await api.createReconvalescenceTicket(this.username, this.entry) : await api.updateReconvalescenceTicket(this.username, this.entryId, this.entry);
      if (response.status < 299) {
        this.editorClosed.emit('store');
      } else {
        this.errorMessage = `Cannot store entry: ${response.statusText}`;
      }
    } catch (err: any) {
      this.errorMessage = `Cannot store entry: ${err.message || 'unknown'}`;
    }
  }

  private async deleteEntry() {
    try {
      const response = await ReconvalescenceTicketListApiFactory(undefined, this.apiBase).deleteReconvalescenceTicket(this.username, this.entryId);
      if (response.status < 299) {
        this.editorClosed.emit('delete');
      } else {
        this.errorMessage = `Cannot delete entry: ${response.statusText}`;
      }
    } catch (err: any) {
      this.errorMessage = `Cannot delete entry: ${err.message || 'unknown'}`;
    }
  }

  render() {
    if (this.errorMessage) {
      return (
        <Host>
          <div class="error">{this.errorMessage}</div>
        </Host>
      );
    }
    return (
      <Host>
        <form ref={el => (this.formElement = el)}>
          <md-filled-text-field
            label="Zodpovedný lekár"
            required
            value={this.entry?.doctorId}
            oninput={(ev: InputEvent) => {
              if (this.entry) {
                this.entry.doctorId = this.handleInputEvent(ev);
              }
            }}
          >
            <md-icon slot="leading-icon">person</md-icon>
          </md-filled-text-field>

          <md-filled-text-field disabled label="Čas operácie/vyšetrenia" value={new Date(this.entry?.surgeryDate || Date.now()).toLocaleTimeString()}>
            <md-icon slot="leading-icon">login</md-icon>
          </md-filled-text-field>
        </form>

        <md-divider></md-divider>
        <div class="actions">
          <md-filled-tonal-button id="delete" disabled={!this.entry || this.entry?.id === '@new'} onClick={() => this.deleteEntry()}>
            <md-icon slot="icon">delete</md-icon>
            Zmazať
          </md-filled-tonal-button>
          <span class="stretch-fill"></span>
          <md-outlined-button id="cancel" onClick={() => this.editorClosed.emit('cancel')}>
            Zrušiť
          </md-outlined-button>
          <md-filled-button id="confirm" disabled={!this.isValid} onClick={() => this.updateEntry()}>
            <md-icon slot="icon">save</md-icon>
            Uložiť
          </md-filled-button>
        </div>
      </Host>
    );
  }
}
