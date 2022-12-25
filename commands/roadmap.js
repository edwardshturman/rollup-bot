import { SlashCommandBuilder } from '@discordjs/builders';
import * as Discord from 'discord.js';
import fetch from 'node-fetch';

const roadmapCommand = {
    data: new SlashCommandBuilder()
        .setName('roadmap')
        .setDescription('Check the Rollup bot roadmap'),

    async execute (interaction) {
        // Fetch issues from the GitHub repository
        const issues = await fetch('https://api.github.com/repos/edwardshturman/rollup-bot/issues?state=open').then(response => response.json());

        // Create an embed for each issue
        const embeds = [];
        for (const issue of issues) {
            const embed = new Discord.MessageEmbed()
                .setColor('#ff4ea0')
                .setTitle(issue.title)
                .setURL(issue.html_url)
                .setDescription(issue.body || '')
                .setFooter(`${issue.labels.map(label => label.name).join(' // ')}`);
            embeds.push(embed);
        }

        // Send the embeds
        await interaction.reply({ embeds: embeds, ephemeral: true });
    }
};

export default roadmapCommand;
