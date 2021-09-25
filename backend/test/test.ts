import 'mocha';
import 'colors';

import { config } from 'dotenv';
import { execSync } from 'child_process';
config({ path: 'test/.env' });

import { expect, should, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiSpies from 'chai-spies';
import chaiThings from 'chai-things';
import mongoose from 'mongoose';

use(chaiAsPromised);
use(chaiSpies);
use(chaiThings);
use(should);

(async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { 
      useUnifiedTopology: true, 
      useNewUrlParser: true, 
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(`Connected to ${process.env.MONGO_URI}`);    
  } catch {
    console.log(`Failed to connect to ${process.env.MONGO_URI}`);  
  }

  try {
    // remove glitched test processes
    execSync(`kill -9 $(lsof -i :${process.env.PORT} | tail -n 1 | cut -d ' ' -f5) 2>> /dev/null`);
  } catch {}

  const space = (length = 54) => new Array(length).join(' ');

  console.log(`${space(48 * 3)}TESTS${space(54 * 2)}`.bgWhite.black);

  // import('./integration/routes/auth-routes.tests');
  // import('./integration/routes/invites-routes.tests');
  // import('./integration/routes/guilds-routes.tests');
  // import('./integration/routes/channel-routes.tests');

  // import('./integration/ws/channel-create.tests');
  // import('./integration/ws/guild-member-add.tests');
  // import('./integration/ws/guild-member-remove.tests');
  // import('./integration/ws/guild-member-update.tests');
  // import('./integration/ws/guild-create.tests');
  // import('./integration/ws/guild-delete.tests');
  // import('./integration/ws/guild-update.tests');
  // import('./integration/ws/invite-create.tests');
  // import('./integration/ws/invite-delete.tests');
  // import('./integration/ws/message-create.tests');
  // import('./integration/ws/message-update.tests');
  // import('./integration/ws/message-delete.tests');
  // import('./integration/ws/ready.tests');
  // import('./integration/ws/user-update.tests');
  // import('./integration/ws/ws-guard.tests');

  import('./unit/models/app.tests');
  // import('./unit/models/channel.tests');
  // import('./unit/models/guild.tests');
  // import('./unit/models/guild-member.tests');
  // import('./unit/models/invite.tests');
  // import('./unit/models/message.tests');
  // import('./unit/models/role.tests');
  // import('./unit/models/user.tests');
  // import('./unit/snowflake-entity.tests');
  // import('./unit/ws/ws-cooldowns.tests');
})();


describe('oh', () => it('frick', () => expect(true).to.be.true));