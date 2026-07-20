<img src="nodes/Flexget/flexget.svg" width="90" align="right" alt="Flexget" />

# n8n-nodes-flexget

[![npm version](https://img.shields.io/npm/v/n8n-nodes-flexget.svg)](https://www.npmjs.com/package/n8n-nodes-flexget)
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-flexget.svg)](https://www.npmjs.com/package/n8n-nodes-flexget)
[![License: MIT](https://img.shields.io/npm/l/n8n-nodes-flexget.svg)](./LICENSE)
[![n8n verified](https://img.shields.io/badge/n8n-verified%20community%20node-EA4B71)](https://docs.n8n.io/integrations/community-nodes/installation/verified-install/)

Community node for **n8n** to interact with **Flexget**. It lets you automate
Flexget directly from your n8n workflows using a secure stored credential.

> ✅ **Verified community node** — installable directly from the n8n node panel
> (self-hosted **and** n8n Cloud).

## Installation

This is a **verified** community node: in n8n click **+ (Add node)**, search for
**Flexget**, and add it — no manual install needed.

<details>
<summary>Manual install (older n8n, or as an unverified package)</summary>

Go to **Settings → Community Nodes → Install** and enter `n8n-nodes-flexget`.
</details>

## Operations

| Operation | Description |
|---|---|
| **Execute Task** | Execute a task |
| **Get Tasks** | Get many tasks |
| **Get Version** | Get the server version |

## Authentication

This node uses the **Flexget API** credential. In n8n, go to **Credentials → New**, pick
**Flexget API**, and fill in:

- **Base URL** — the address of your instance, e.g. `http://flexget:5050` (no trailing slash).
- **Username** — your account username.
- **Password** — your account password.

The node signs in with your username/password automatically on each run.

**Where to find it:** See the service documentation: https://flexget.com/API

The credential's **Test** button verifies the connection before you save.

## Usage

1. Add the **Flexget** node to a workflow (after a trigger such as *When clicking 'Test workflow'* or a Schedule Trigger).
2. Select your **Flexget API** credential.
3. Pick an **Operation** and run the workflow — the response is returned as JSON for the next node.

## Compatibility

Requires n8n **1.0** or newer. Built and linted with the official `@n8n/node-cli`, and
published to npm with a build-provenance attestation.

## Resources

- [Flexget](https://flexget.com/API)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](./LICENSE)
