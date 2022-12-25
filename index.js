// Dependencies
import { Client, Collection, Intents } from 'discord.js';
import { config } from 'dotenv';

// Commands
import * as commands from './commands.js';

// Load environment variables
if (process.env.ENV !== 'PROD')
    config();

// Launch instance of Discord
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    partials: ['MESSAGE', 'GUILD_MEMBER', 'REACTION', 'USER']
});

// Create collection of commands
client.commands = new Collection();

for (const command of commands.default)
    client.commands.set(command.data.name, command);

// Log launch, set status
client.once('ready', () => {
    console.log('Rollup is online!');
    client.user.setActivity('/rollup | v0.3.2', { type: 'LISTENING' });
});

// Interaction listener for slash commands
client.on('interactionCreate', async interaction => {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true
        });
    }
});

// Reply to being pinged with GIF
client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (message.content.includes('@here') || message.content.includes('@everyone') || message.type === 'REPLY') return;
    if (message.mentions.has(client.user.id))
        message.channel.send('https://c.tenor.com/Jf-_xbLhAEYAAAAC/discord-valorant.gif');
});

// Bot login
client.login(process.env.BOT_TOKEN);
