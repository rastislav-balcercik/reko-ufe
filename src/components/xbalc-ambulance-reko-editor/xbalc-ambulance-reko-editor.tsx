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
        surgeryDate: new Date().toISOString().split('T')[0],
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
    target.focus();
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
        <div class={'user-info'}>
          <div class={'user'}>
            {this.userType === UserType.DOCTOR ? <md-icon>stethoscope</md-icon> : <md-icon>personal_injury</md-icon>}
            <span>{this.username}</span>
          </div>
          <md-filled-button id="cancel" onClick={() => this.editorClosed.emit('cancel')}>
            <md-icon slot="icon">arrow_back</md-icon>
            Naspäť
          </md-filled-button>
        </div>
        <div class={'header'}>
          <h2>{this.entry?.id === '@new' ? 'Nová požiadavka' : 'Požiadavka'}</h2>
          <span class="total">{this.entry?.id !== '@new' ? 'ID požiadavky: ' + this.entry?.id : 'Pokračujte vyplnením údajov'}</span>
        </div>
        <form ref={el => (this.formElement = el)}>
          <md-outlined-text-field
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
          </md-outlined-text-field>
          <md-outlined-text-field
            label="Deň operácie/vyšetrenia"
            type="date"
            value={this.entry?.surgeryDate}
            required
            oninput={(ev: InputEvent) => {
              if (this.entry) {
                this.entry.surgeryDate = new Date(this.handleInputEvent(ev)).toISOString().split('T')[0];
              }
            }}
          >
            <md-icon slot="leading-icon">calendar_month</md-icon>
          </md-outlined-text-field>

          <md-outlined-text-field
            type="textarea"
            label="Požiadavka"
            placeholder="Vyplňte detaily vašej požiadavky..."
            rows="3"
            required
            value={this.entry?.message}
            oninput={(ev: InputEvent) => {
              if (this.entry) {
                this.entry.message = this.handleInputEvent(ev);
              }
            }}
          ></md-outlined-text-field>
          {this.entryId !== '@new' && this.userType === UserType.DOCTOR && (
            <md-outlined-text-field
              type="textarea"
              label="Odpoveď"
              placeholder="Vyplňte odpoveď na túto požiadavku..."
              rows="3"
              required
              value={this.entry?.reply}
              oninput={(ev: InputEvent) => {
                if (this.entry) {
                  this.entry.reply = this.handleInputEvent(ev);
                }
              }}
            ></md-outlined-text-field>
          )}
        </form>
        <div class="actions">
          <md-filled-button id="delete" disabled={!this.entry || this.entry?.id === '@new'} onClick={() => this.deleteEntry()}>
            <md-icon slot="icon">delete</md-icon>
            Zmazať
          </md-filled-button>
          <span class="stretch-fill"></span>
          <md-filled-button id="confirm" disabled={!this.isValid} onClick={() => this.updateEntry()}>
            <md-icon slot="icon">send</md-icon>
            Odoslať
          </md-filled-button>
        </div>
      </Host>
    );
  }
}
