import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import { UserType } from '../../utils/enums';
import { ReconvalescenceTicket, ReconvalescenceTicketListApiFactory } from '../../api/reko-ufe';

@Component({
  tag: 'xbalc-ambulance-reko-list',
  styleUrl: 'xbalc-ambulance-reko-list.css',
  shadow: true,
})
export class XbalcAmbulanceRekoList {
  @Event({ eventName: 'entry-clicked' }) entryClicked: EventEmitter<string>;

  @Prop() apiBase: string;
  @Prop() username: string;
  @Prop() userType: UserType;
  @Prop() logout: () => void;

  @State() errorMessage: string;

  reconvalescenceList: ReconvalescenceTicket[];

  private async getReconvalescenceList(): Promise<ReconvalescenceTicket[]> {
    try {
      const response = await ReconvalescenceTicketListApiFactory(undefined, this.apiBase).getReconvalescenceList(this.username, this.userType);
      if (response.status < 299) {
        return response.data;
      } else {
        this.errorMessage = `Cannot retrieve reconvalescence list: ${response.statusText}`;
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve reconvalescence list: ${err.message || 'unknown'}`;
    }
    return [];
  }

  async componentWillLoad() {
    this.reconvalescenceList = await this.getReconvalescenceList();
  }

  render() {
    return (
      <Host>
        <div class={'user-info'}>
          <div class={'user'}>
            {this.userType === UserType.DOCTOR ? <md-icon>stethoscope</md-icon> : <md-icon>personal_injury</md-icon>}
            <span>{this.username}</span>
          </div>
          <md-filled-button onClick={() => this.logout()}>Odhlásiť sa</md-filled-button>
        </div>
        <div class={'header'}>
          <h2>{this.userType === UserType.DOCTOR ? 'Požiadavky pacientov' : 'Moje požiadavky'}</h2>
          {!this.errorMessage && <span class={'total'}>Počet požiadaviek: {this.reconvalescenceList.length}</span>}
        </div>
        {this.errorMessage ? (
          <div class="error">{this.errorMessage}</div>
        ) : (
          <md-list>
            {this.reconvalescenceList?.map(ticket => (
              <md-list-item onclick={() => this.entryClicked.emit(ticket.id)}>
                <div class={'ticket-item-wrapper'}>
                  <div class={'ticket-name'}>{ticket.patientId}</div>
                  {this.userType === UserType.DOCTOR && <div class={{ status: true, new: !!ticket.reply }}>{ticket.reply ? 'Vyriešené' : 'Nové'}</div>}
                  {this.userType === UserType.PATIENT && <div class={{ status: true, new: !!ticket.reply }}>{ticket.reply ? 'Vyriešené' : 'Čaká na odpoveď'}</div>}
                </div>
                <div class={'ticket-message'}>
                  <span>{ticket.message}</span>
                </div>
              </md-list-item>
            ))}
            {this.userType === UserType.PATIENT && (
              <md-filled-button class={'new-ticket'} onclick={() => this.entryClicked.emit('@new')}>
                <span>Vytvoriť požiadavku</span>
              </md-filled-button>
            )}
          </md-list>
        )}
      </Host>
    );
  }
}
