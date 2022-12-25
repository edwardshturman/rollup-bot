import { ContextMenuCommandBuilder } from '@discordjs/builders';
import Discord from 'discord.js';

const purgeContextCommand = {
    data: new ContextMenuCommandBuilder()

        // Purge context menu command
        .setName('Purge from here onward')
        .setType(3),

    async execute (interaction) {
        // Ignore if no Manage Messages perms
        if (!interaction.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) {
            await interaction.reply({ content: 'Sorry, you don\'t have permissions to do this!', ephemeral: true });
            return;
        }

        await interaction.channel.messages.fetch({ limit: 100 }).then(async messages => {
            // Ignore if message isn't within the 100-message limit
            if (!messages.has(interaction.targetId))
                await interaction.reply({ content: 'Sorry, that message isn\'t within the 100-message limit! Try something more recent.', ephemeral: true });

            else {
                // Convert the messages collection to an array, and reverse them so they can be deleted properly
                const messageKeysArray = [...messages.keys()];
                const messageValuesArray = [...messages.values()];

                messageKeysArray.reverse();
                messageValuesArray.reverse();

                const sliceStart = messageKeysArray.indexOf(interaction.targetId);
                const targetValues = messageValuesArray.slice(sliceStart);

                targetValues.forEach(message => {
                    message.delete();
                });

                await interaction.reply('Purged ' + targetValues.length + ' messages!');
            }
        });
    }
};

export default purgeContextCommand;
