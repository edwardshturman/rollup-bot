# Rollup

๐ A simple Discord bot for cleaning channels via threading. ๐

[![Dependency status](https://david-dm.org/edwardshturman/rollup-bot.svg)](https://david-dm.org/edwardshturman/rollup-bot)
[![GitHub last commit](https://img.shields.io/github/last-commit/edwardshturman/rollup-bot)](https://github.com/edwardshturman/rollup-bot/commits/master)

---

![Rollup logo](assets/rollup-logo.png)

---

## Invite Link

โ [Add me](https://discord.com/api/oauth2/authorize?client_id=912600348617760798&permissions=397821733952&scope=bot%20applications.commands) to your server!

## Features

- One super simple slash command: `/rollup <messages> <thread>` ๐
  - **`messages`**: How many messages should be forwarded to a thread; counts backwards from the most recent in the current channel, limit 100
  - **`thread`**: The name of the thread created
- A handy context menu command: right-click any message > `Apps` > `Rollup from here onward` ๐ฑ
- Everyone who sent a message that was forwarded will automatically be added to the new thread! ๐งต
- All messages are forwarded using a single webhook, keeping things neat for server admins โจ
- Retain message formatting, and even see who sent it! โ
- Message order is preserved ๐ฌ

## Usage/Examples

Use Rollup:

- As an alternative to purging messages โ maybe you want to keep the history of a conversation, it's just no longer relevant to keep in your main channel
- To get rid of a spammy interaction between two people in a larger conversation channel โ Rollup will automatically move both users to the thread, so they can keep talking uninterrupted there

## Roadmap

For upcoming features, check out the [Issues](https://github.com/edwardshturman/rollup-bot/issues) tab!

## Demo

*Coming soon!*

## FAQ

#### So how about privacy โย how does Rollup handle data?

Rollup actually stores *nothing*! It fetches per-server data quickly through only the commands you give it, and everything is sent through one webhook, which you can check out in the `Integrations` panel of your server.

#### What're all these permissions Rollup is requesting access to?

Here's a breakdown of what Rollup requests access to and why:

> **The self-explanatory stuff:**

- View Channels
- Read Message History
- Send Messages
- Send Messages in Threads
- Create Public Threads
- Create Private Threads
- Embed Links
- Attach Files
- Use Application Commands

> **These features aren't yet utilized, but may be in a future update, so to avoid asking you to reauth the bot with every update, they are granted from the start:**

- Add Reactions
- Use External Emoji
- Manage Threads: for future archiving/locking features; see Roadmap above

> **More sensitive access, and why Rollup needs it:**

- Manage Messages: for deleting the messages originally sent
- Manage Webhooks: to avoid clutter, Rollup checks to make sure there's only one webhook in your server, rather than per-channel. And since you'd probably like to use Rollup in more than just one channel, the webhook's linked channel will need to be edited with each new thread created.

## Support

> ~~For help with the rollup command, use `/rollup help`.~~
>
> Help command coming soon!

The bot is still very new, and I'm working to resolve bugs I find in the servers I'm in. For any issues you encounter, feel free to [submit an issue](https://github.com/edwardshturman/rollup-bot/issues).

## Tech Stack

- **Node.js** + **Discord.js**: core libraries for interacting with Discord
- **Heroku**: deployment

## Contributions

This is primarily a personal project for me and my friends, which I decided to share here publicly. For the time being, I don't have an open-source license set for Rollup, and as such, must politely decline contributions.

Feel free to look around, but please refrain from copying, modifying, or distributing Rollup source code without my explicit permission. Thank you!

# ๐ About Me

๐ Hi there! I'm Edward, and I'm a Computer Science Major at the University of San Francisco. ๐ป

Rollup is a Discord bot I made for my group of friends and our Discord server. In our trip planning channel (where we use [Register](https://edwardshturman.com/register) โ another one of my bots ๐), we'd more and more frequently see that with an increasing amount of events being planned, comes an increasing amount of spam, both related to the event, and just regular chit-chat in between.

Well, here's my fix! I'll be updating it regularly for now. Hope you enjoy!

## ๐ See more of my work and say hello

[![portfolio](https://img.shields.io/badge/portfolio-000?style=for-the-badge&logo=notion&logoColor=white)](https://edwardshturman.com)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/edward-shturman)

[![twitter](https://img.shields.io/badge/github-000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/edwardshturman)
