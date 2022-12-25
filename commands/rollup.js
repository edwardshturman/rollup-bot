import { SlashCommandBuilder } from '@discordjs/builders';

const rollupCommand = {
    data: new SlashCommandBuilder()

        // Rollup command
        .setName('rollup')
        .setDescription('📜 Clean up your Discord channels via threading 🌟')
        .addIntegerOption(messageCount =>
            messageCount
                .setName('messages')
                .setDescription('How many messages; counts backwards from the most recent in this channel')
                .setRequired(true))
        .addStringOption(threadTitle =>
            threadTitle
                .setName('thread')
                .setDescription('The name of the thread created')
                .setRequired(true)),

    async execute (interaction) {
        // Ignore if message count exceeds 100
        if (interaction.options.getInteger('messages') > 100)
            return await interaction.reply({ content: 'Sorry, that isn\'t within the 100-message limit! Try something more recent.', ephemeral: true });

        // Execute /rollup
        interaction.channel.messages.fetch({ limit: interaction.options.getInteger('messages') }).then(async messages => {
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
            const thread = await interaction.channel.threads.create({
                name: interaction.options.getString('thread'),
                autoArchiveDuration: 60,
                reason: 'Thread created by ' + interaction.user.tag + ' using Rollup'
            });
            if (thread.joinable) await thread.join();

            // Convert the messages collection to an array, and reverse them so they can be sent in the right order
            const messagesArray = [...messages.values()];

            messagesArray.slice().reverse().forEach(message => {
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

            await interaction.reply('New thread created from ' + messagesArray.length + ' messages!');
        });
    }
};

export default rollupCommand;
