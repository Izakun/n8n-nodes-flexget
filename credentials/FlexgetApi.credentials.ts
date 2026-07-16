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
			description: 'Base URL of the Flexget web/API server (e.g. http://flexget:5050). No trailing slash.',
		},
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Flexget API token (generate with "flexget web passwd")',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{$credentials.apiToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/api/server/version',
		},
	};
}
