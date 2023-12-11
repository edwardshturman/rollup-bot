# Rollup

🌟 A simple Discord bot for cleaning channels via threading. 📜

[![GitHub last commit](https://img.shields.io/github/last-commit/edwardshturman/rollup-bot)](https://github.com/edwardshturman/rollup-bot/commits/master)

---

![Rollup logo](assets/rollup-logo.png)

---

## On the Future of Rollup

> ℹ️ Hey there, thanks for checking out Rollup! This was a Discord bot I made for my group of friends from high school. In our trip planning channel, for which we were using [Register](https://github.com/edwardshturman/register), we'd more and more frequently see that with an increasing amount of events being planned, comes an increasing amount of spam, both related to the event, and regular chit-chat in between. We needed to keep relevant messages consistently bundled to avoid miscommunication. Rollup was the solution.
>
> 💡 I've learned a lot since first writing Rollup in Fall 2021. I've also since made a couple [other](https://github.com/edwardshturman/register-bot) [bots](https://github.com/edwardshturman/receipt-bot) for the same group of friends. Maintaining these bots, which were updated once every couple months or so, soon became unsustainable as I found myself repeating changes for what felt like multiple isolated projects, rather than a collection of bots.
>
> 🏗️ So, I made it a collection of bots — enter [**Realm**](https://github.com/compsigh/realm). Written in TypeScript, built open-source, and hopefully becoming as good of a learning resource as a bot, Realm will be *the* toolbox for building communities on Discord.
>
> 💚 Maintenance on this repo — as well as the other bots linked above — is discontinued, but they will be reborn in Realm (if they haven't already been!). I'm proud of Rollup, and if you used it, I hope it brought you and your friends joy in keeping your channels just a bit cleaner. Stay tuned for Realm, and feel free to drop by the [Discord](https://discord.realm.so) and chat — I'd love to hear from you!

## Features

- 📜 One super simple slash command: `/rollup <messages> <thread>`
  - **`messages`**: How many messages should be forwarded to a thread; counts backwards from the most recent in the current channel, limit 100
  - **`thread`**: The name of the thread created
- 🖱 A handy context menu command: right-click any message > `Apps` > `Rollup from here onward`
- 🧵 Everyone who sent a message that was forwarded will automatically be added to the new thread!
- ✨ All messages are forwarded using a single webhook, keeping things neat for server admins
- ✅ Retain message formatting, and even see who sent it!
- 💬 Message order is preserved

## Usage/Examples

Use Rollup:

- As an alternative to purging messages — maybe you want to keep the history of a conversation, it's just no longer relevant to keep in your main channel
- To get rid of a spammy interaction between two people in a larger conversation channel — Rollup will automatically move both users to the thread, so they can keep talking uninterrupted there

## Privacy

Rollup actually stores *nothing*! It fetches per-server data quickly through only the commands you give it, and everything is sent through one webhook, which you can check out in the `Integrations` panel of your server.

## Permissions

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

## Tech Stack

- **Node.js** + **Discord.js**: core libraries for interacting with Discord
- **Heroku**: deployment

## About Me

I'm Edward, and I'm a design-engineer, Internet painter, and computer science major at the University of San Francisco.

See more of my work and say hello over on [my website](https://edward.so).
