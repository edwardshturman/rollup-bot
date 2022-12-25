import { SlashCommandBuilder } from '@discordjs/builders';
import Discord from 'discord.js';

const purgeCommand = {
    data: new SlashCommandBuilder()

        // Purge command
        .setName('purge')
        .setDescription('A simpler way to clean up spam, Manage Messages perms required')
        .addIntegerOption(messageCount =>
            messageCount
                .setName('messages')
                .setDescription('How many messages; counts backwards from the most recent in this channel')
                .setRequired(true)),

    async execute (interaction) {
        // Ignore if no Manage Messages perms
        if (!interaction.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) {
            await interaction.reply({ content: 'Sorry, you don\'t have permissions to do this!', ephemeral: true });
            return;
        }

        // Ignore if message count exceeds 100
        if (interaction.options.getInteger('messages') > 100) {
            await interaction.reply({ content: 'Sorry, that isn\'t within the 100-message limit! Try something more recent.', ephemeral: true });
            return;
        }

        // Execute /purge
        interaction.channel.messages.fetch({ limit: interaction.options.getInteger('messages') }).then(async messages => {
            // Convert the messages collection to an array and purge messages
            const messagesArray = [...messages.values()];

            messagesArray.slice().forEach(message => {
                message.delete();
            });

            await interaction.reply('Purged ' + messagesArray.length + ' messages!');
        });
    }
};

export default purgeCommand;
