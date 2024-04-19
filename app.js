import 'dotenv/config';
import express from 'express';
import { InteractionType, InteractionResponseType } from 'discord-interactions';
import {
  VerifyDiscordRequest,
} from './utils.js';

const app = express();

const PORT = process.env.PORT || 6969;

app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

app.post('/interactions', async function (req, res) {

  const { type, data } = req.body;

  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  console.log(req.body);

  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;
  
    if (name === 'meow') {
      const interactionContext = req.body.context;
      let profilePayloadData = {
        content: "meow"
      };

      if (interactionContext !== 1) {

        profilePayloadData['components'] = [
          {
            type: 1,
            components: [
              {
                type: 2,
                label: 'meow',
                custom_id: 'meow_share',
                style: 2,
              },
            ],
          },
        ];
      }

      await res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: profilePayloadData,
      });
    }
  }  

  if (type === InteractionType.MESSAGE_COMPONENT) {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: "meow"
        },
      });
  }
});

app.listen(PORT, () => {
  console.log('port: ', PORT);
});