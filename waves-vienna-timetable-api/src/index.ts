/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { ShowDays } from '../../shared/model/show-days';
import { getShowDays } from './services/get-show-days';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const showDays = await getShowDays(env.WAVES_VIENNA_TIMETABLE_BUCKET);

		const response = toShowDaysResponse(showDays ?? { thursday: [], friday: [], saturday: [] });

		return response;
	},
} satisfies ExportedHandler<Env>;

const toShowDaysResponse = (showDays: ShowDays): Response => {
	const showsResp = showDays;
	const jsonResp = JSON.stringify(showsResp, null, 0);

	const response = new Response(jsonResp, {
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
	});

	console.warn('do not forget to set allow origin');
	response.headers.set(
		'Access-Control-Allow-Origin',
		'*' //"https://waves-vienna-timetable.pages.dev"
	);

	return response;
};
