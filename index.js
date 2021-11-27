// Dependencies
require('discord.js');
require('dotenv').config();
const fs = require('fs');

// Launch instance of Discord
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    partials: ['MESSAGE', 'GUILD_MEMBER', 'REACTION', 'USER']
});

// Create collection of commands
client.commands = new Collection();

// Check for correct file type (JavaScript) and require command files when running given command
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// Log launch, set status
client.once('ready', () => {
    console.log('Rollup is online!');
    client.user.setActivity('/rollup | v0.2.1', { type: 'LISTENING' });
});

// Interaction listener for slash commands
client.on('interactionCreate', async interaction => {
    // console.log(interaction);

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

// Bot login
client.login(process.env.TOKEN);
