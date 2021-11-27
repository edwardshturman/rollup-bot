const { ContextMenuCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new ContextMenuCommandBuilder()

        // Rollup context menu command
        .setName('Rollup from here onward')
        .setType(3),

    async execute (interaction) {
        // Dependencies
        const Discord = require('discord.js');

        await interaction.channel.messages.fetch({limit: 100}).then(async messages => {

            // console.log(messages.first());

            if (!messages.has(interaction.targetId)) {
                await interaction.reply('Sorry, that message isn\'t within the 100-message limit! Try something more recent.');

            } else {

                // Search for existing Rollup webhook
                let rollupWebhook = {};
                console.log('Empty rollupWebhook:');
                console.log(rollupWebhook);
                console.log(Object.keys(rollupWebhook).length);

                await interaction.member.guild.fetchWebhooks()
                    .then(async webhooks => {
                        console.log(webhooks);
                        for (const webhook of webhooks.values()) {
                            if (webhook.owner.id === process.env.CLIENTID) {

                                // Found Rollup webhook, edit existing to match channel of interaction
                                console.log('Found Rollup webhook!');
                                console.log('Size:');
                                console.log(Object.keys(webhook).length);

                                await webhook.edit({
                                    channel: interaction.channel
                                })
                                    .then(async editedWebhook => {
                                        console.log('Edited rollup webhook:');
                                        console.log(editedWebhook);
                                        rollupWebhook = editedWebhook;
                                    })
                                    .catch(console.error);

                            }
                        }

                        if (Object.keys(rollupWebhook).length === 0) {

                            // No exiting Rollup webhook found, create one for interacting with thread
                            console.log('No Rollup webhook found! Creating new one.');
                            await interaction.channel.createWebhook('Rollup', {
                                avatar: 'https://raw.githubusercontent.com/edwardshturman/rollup-bot/master/assets/rollup-logo.png'
                            })
                                .then(webhook => {
                                    console.log(webhook);
                                    rollupWebhook = webhook;
                                })
                                .catch(console.error);
                        }

                    })
                    .catch(console.error);

                // Create and join thread
                let threadName = '';
                await interaction.channel.messages.fetch(interaction.targetId).then(targetMessage => threadName = targetMessage.content);
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
                console.log(sliceStart);
                const targetKeys = messageKeysArray.slice(sliceStart);
                console.log(targetKeys);
                const targetValues = messageValuesArray.slice(sliceStart);
                console.log(targetValues);

                targetValues.forEach(message => {
                    console.log(message);
                    rollupWebhook.send({
                        username: message.member.displayName,
                        avatarURL: message.author.displayAvatarURL(),
                        content: message.content,
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
