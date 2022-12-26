import { ContextMenuCommandBuilder } from '@discordjs/builders';

const rollupContextCommand = {
    data: new ContextMenuCommandBuilder()

        // Rollup context menu command
        .setName('Rollup from here onward')
        .setType(3),

    async execute (interaction) {
        await interaction.channel.messages.fetch({ limit: 100 }).then(async messages => {
            if (!messages.has(interaction.targetId))
                await interaction.reply({ content: 'Sorry, that message isn\'t within the 100-message limit! Try something more recent.', ephemeral: true });

            else {
                // Search for existing Rollup webhook
                let rollupWebhook = {};

                await interaction.member.guild.fetchWebhooks()
                    .then(async webhooks => {
                        for (const webhook of webhooks.values())
                            if (webhook.owner.id === process.env.BOT_CLIENT_ID) {
                                // Found Rollup webhook, edit existing to match channel of interaction
                                await webhook.edit({ channel: interaction.channel })
                                    .then(async editedWebhook => {
                                        rollupWebhook = editedWebhook;
                                    })
                                    .catch(console.error);
                            }

                        if (Object.keys(rollupWebhook).length === 0) {
                            // No exiting Rollup webhook found, create one for interacting with thread
                            await interaction.channel.createWebhook('Rollup', { avatar: 'https://raw.githubusercontent.com/edwardshturman/rollup-bot/master/assets/rollup-logo.png' })
                                .then(webhook => {
                                    rollupWebhook = webhook;
                                })
                                .catch(console.error);
                        }
                    })
                    .catch(console.error);

                // Create and join thread
                const threadMessage = await interaction.channel.messages.fetch(interaction.targetId);
                const threadName = threadMessage.content.length > 50 ? threadMessage.content.slice(0, 50) + '...' : threadMessage.content;
                const thread = await interaction.channel.threads.create({
                    name: threadName,
                    autoArchiveDuration: 60,
                    reason: 'Thread created by ' + interaction.user.tag + ' using Rollup'
                });
                if (thread.joinable) await thread.join();

                // Convert the messages collection to an array, and reverse them so they can be sent in the right order
                const messageKeysArray = [...messages.keys()];
                const messageValuesArray = [...messages.values()];

                messageKeysArray.reverse();
                messageValuesArray.reverse();

                const sliceStart = messageKeysArray.indexOf(interaction.targetId);
                const targetValues = messageValuesArray.slice(sliceStart);

                targetValues.forEach(message => {
                    const attachmentLinks = message.attachments.map(attachment => attachment.proxyURL).join(' ');
                    rollupWebhook.send({
                        username: message.member.displayName,
                        avatarURL: message.author.displayAvatarURL(),
                        content: message.content?.length > 0 ? message.content : attachmentLinks,
                        threadId: thread.id
                    });

                    // Add all users who authored the messages forwarded to the thread, and delete the original messages
                    thread.members.add(message.author.id);
                    message.delete();
                });

                await interaction.reply('New thread created from ' + targetValues.length + ' messages!');
            }
        });
    }
};

export default rollupContextCommand;
