# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.2.1 — 2021-11-27

### Changed

- Updated the context menu command to better describe what it does
- Added a username for who requests thread creation to the audit log entry
- Rollup now displays how many messages were threaded from a request
- `/rollup` now won't allow a value exceeding 100 messages
- Should either the `/rollup` slash command or context menu command fail, the response will now be ephemeral (only the user requesting threading can see it)

## 0.2.0 — 2021-11-26

### Added

- Context menu command! 🌟
  - Right-click a message within 100 recent messages in a channel to create a new thread from there onward. No more having to specify a number all the time!

## 0.1.0 — 2021-11-23

### Added

- Initial release: `/rollup` command
- [README](https://github.com/edwardshturman/rollup-bot/#readme)
- Changelog
