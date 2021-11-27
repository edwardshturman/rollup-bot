const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()

        // Rollup command
        .setName('rollup')
        .setDescription('📜 Clean up your Discord channels via threading 🌟')
        // .addSubcommand(helpSubcommand =>
        //     helpSubcommand
        //         .setName('help')
        //         .setDescription('Display rollup subcommands'))
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
        // Dependencies
        const Discord = require('discord.js');

        // On /rollup help, display event command help
        // if (interaction.options.getSubcommand() === 'help') {
        //     const rollupHelpEmbed = new Discord.MessageEmbed()
        //         .setColor('#ff4ea0')
        //         .setTitle('Rollup')
        //         .setDescription('📜 Clean up your Discord channels via threading 🌟')
        //         .addField('', '', false)
        //         .addField('', '', false)
        //         .addField('', '', false);
        //     await interaction.reply({embeds: [rollupHelpEmbed]});
        // } else

        // Execute /rollup
        interaction.channel.messages.fetch({limit: interaction.options.getInteger('messages')}).then(async messages => {

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

        });
        await interaction.reply('New thread created!');

    }
};
