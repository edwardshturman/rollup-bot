import { SlashCommandBuilder } from '@discordjs/builders';
import * as Discord from 'discord.js';

const bugCommand = {
    data: new SlashCommandBuilder()
        .setName('bug')
        .setDescription('Report a bug (for admins only)')
        .addStringOption(feature => feature
            .setName('feature')
            .setDescription('Which feature is the bug related to?')
            .setChoices(
                { name: 'General', value: 'general' },
                { name: '/rollup command', value: 'rollup' },
                { name: 'Rollup context command', value: 'rollupContext' },
                { name: '/purge command', value: 'purge' },
                { name: 'Purge context command', value: 'purgeContext' }
            )
            .setRequired(true))
        .addStringOption(description => description
            .setName('description')
            .setDescription('Please describe the bug in detail')
            .setRequired(true)),

    async execute (interaction) {
        // If the user does not have Manage Server permissions, return
        if (!interaction.member.permissions.has('MANAGE_GUILD'))
            return await interaction.reply({ content: 'Sorry, this command is intended for admins only. Please ask one to disable it for others.' });

        // Create an embed for the bug report
        const embed = new Discord.MessageEmbed()
            .setColor('#ff4ea0')
            .setTitle('Rollup Bug Report')
            .setDescription('**Details:**')
            .addFields(
                { name: 'Reported by', value: interaction.user.tag, inline: false },
                { name: 'Feature', value: interaction.options.getString('feature'), inline: false },
                { name: 'Description', value: interaction.options.getString('description'), inline: false }
            )
            .setThumbnail('https://raw.githubusercontent.com/edwardshturman/rollup-bot/master/assets/rollup-logo.png')
            .setTimestamp();

        // Send the embed to the bug reports channel in the dev server
        const channel = interaction.client.guilds.cache.get(process.env.DEV_SERVER_ID).channels.cache.get(process.env.REPORTS_CHANNEL_ID);
        await channel.send({ embeds: [embed] });

        // Send a confirmation message to the user
        await interaction.reply({ content: 'Your bug report has been sent. Thank you!', ephemeral: true });
    }
};

export default bugCommand;
