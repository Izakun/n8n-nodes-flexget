import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class FlexgetApi implements ICredentialType {
	name = 'flexgetApi';

	displayName = 'Flexget API';

	icon = 'file:flexgetApi.svg' as const;

	documentationUrl = 'https://flexget.com/API';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'http://flexget:5050',
			required: true,
			description:
				'Base URL of the Flexget web/API server (e.g. http://flexget:5050). No trailing slash.',
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: 'flexget',
			required: true,
			description: 'Flexget web UI username (usually "flexget")',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Flexget web UI password (set with "flexget web passwd")',
		},
	];

	// Flexget's API authenticates with a session cookie obtained from
	// POST /api/auth/login; the node performs that login, so there is no
	// static header to inject here.
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {},
	};

	test: ICredentialTestRequest = {
		request: {
			method: 'POST',
			baseURL: '={{$credentials.baseUrl}}',
			url: '/api/auth/login',
			body: {
				username: '={{$credentials.username}}',
				password: '={{$credentials.password}}',
			},
		},
	};
}
