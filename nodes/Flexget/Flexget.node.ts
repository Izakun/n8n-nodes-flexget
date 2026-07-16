import {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
	NodeApiError,
	NodeConnectionTypes,
	NodeOperationError,
} from 'n8n-workflow';

export class Flexget implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Flexget',
		name: 'flexget',
		icon: { light: 'file:flexget.svg', dark: 'file:flexget.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Control your Flexget daemon through its API',
		defaults: { name: 'Flexget' },
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'flexgetApi', required: true }],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Execute Task', value: 'executeTask', action: 'Execute a task' },
					{ name: 'Get Tasks', value: 'getTasks', action: 'Get many tasks' },
					{ name: 'Get Version', value: 'getVersion', action: 'Get the server version' },
				],
				default: 'getTasks',
			},
			{
				displayName: 'Task Name',
				name: 'task',
				type: 'string',
				default: '',
				required: true,
				description: 'Name of the Flexget task to execute',
				displayOptions: { show: { operation: ['executeTask'] } },
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const credentials = await this.getCredentials('flexgetApi', i);
				const baseURL = (credentials.baseUrl as string).replace(/\/+$/, '');
				const operation = this.getNodeParameter('operation', i) as string;
				const param = <T>(name: string, fallback?: T) =>
					this.getNodeParameter(name, i, fallback as T) as T;

				const request = (method: IHttpRequestMethods, url: string, body?: IDataObject) =>
					this.helpers.httpRequestWithAuthentication.call(this, 'flexgetApi', {
						method,
						baseURL,
						url,
						body,
						json: true,
					} as IHttpRequestOptions);

				const handlers: Record<string, () => Promise<unknown>> = {
					getVersion: () => request('GET', '/api/server/version'),
					getTasks: () => request('GET', '/api/tasks'),
					executeTask: () =>
						request('POST', '/api/tasks/execute', { tasks: [param<string>('task')] }),
				};

				const handler = handlers[operation];
				if (!handler) {
					throw new NodeOperationError(this.getNode(), `Unsupported operation: ${operation}`, {
						itemIndex: i,
					});
				}

				const response = await handler();
				if (Array.isArray(response)) {
					for (const element of response) {
						returnData.push({ json: element as IDataObject, pairedItem: { item: i } });
					}
				} else {
					returnData.push({ json: response as IDataObject, pairedItem: { item: i } });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message }, pairedItem: { item: i } });
					continue;
				}
				throw new NodeApiError(this.getNode(), error as JsonObject, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
