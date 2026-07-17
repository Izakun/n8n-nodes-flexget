# n8n-nodes-flexget

[![npm version](https://img.shields.io/npm/v/n8n-nodes-flexget.svg)](https://www.npmjs.com/package/n8n-nodes-flexget)

n8n community node for [Flexget](https://flexget.com/) — the RSS/feed automation daemon — via its API.

Install via **Settings -> Community Nodes -> Install** -> `n8n-nodes-flexget`.

## Operations
- Execute Task, Get Tasks, Get Version

## Credentials
Configure the base URL and authentication in the **Flexget API** credential.

## Usage example

List configured tasks:

1. Add the node after a trigger (e.g. *When clicking 'Test workflow'*).
2. Select your credential.
3. **Get Tasks**.
4. Execute the node — example output:

```json
{ "name": "movies", "config": { "rss": "https://...", "download": "/downloads" } }
```

## Disclaimer
Not affiliated with or endorsed by the respective project.
