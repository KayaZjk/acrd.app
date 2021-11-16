import { Socket } from 'socket.io';
import { WebSocket } from '../websocket';
import { WSEvent, } from './ws-event';
import { WS } from '../../types/ws';
import { User } from '../../data/models/user';
import { Channel, ChannelDocument } from '../../data/models/channel';

export default class implements WSEvent<'CHANNEL_DELETE'> {
  on = 'CHANNEL_DELETE' as const;

  public async invoke(ws: WebSocket, client: Socket, { channelId }: WS.Params.ChannelDelete) {
    const channel = await deps.channels.getText(channelId);
    await deps.wsGuard.validateCan(client, channel.guildId, 'MANAGE_CHANNELS');
    
    await User.updateMany(
      { voice: { channelId } },
      { voice: {} },
    );
    ws.io.sockets.in(channelId).socketsLeave(channelId);

    await channel.deleteOne();
    // TODO: testme
    await this.lowerHigherChannels(channel);

    return [{

    }];
  }

  private async lowerHigherChannels(channel: ChannelDocument) {
    await Channel.updateMany({
      guildId: channel.guildId,
      position: { $gt: channel.position },
    }, { $inc: { position: -1 } });
  }
}
