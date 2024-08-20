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

import { IdOfDay } from './model/id-of-day.enum';
import { ShowDays } from './model/show-days';
import { getShowDay } from './services/get-tmsqr-shows';
import { putShowDays } from './services/put-show-days';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const tmsqrShowDay = await startImport(env);

		return toShowsResponse(tmsqrShowDay);
	},

	// The scheduled handler is invoked at the interval set in our wrangler.toml's
	// [[triggers]] configuration.
	async scheduled(controller: ScheduledController, env: Env, ctx: ExecutionContext): Promise<void> {
		// A Cron Trigger can make requests to other endpoints on the Internet,
		// publish to a Queue, query a D1 Database, and much more.

		// You could store this result in KV, write to a D1 Database, or publish to a Queue.
		// In this template, we'll just log the result:
		console.log(`trigger fired at ${controller.cron}`);

		ctx.waitUntil(startImport(env));
	},
} satisfies ExportedHandler<Env>;

async function startImport(env: Env): Promise<ShowDays> {
	const tmsqrShowsThursday = await getShowDay(IdOfDay.Thursday);

	const tmsqrShowsFriday = await getShowDay(IdOfDay.Friday);

	const tmsqrShowsSaturday = await getShowDay(IdOfDay.Saturday);

	const allShowDays = {
		thursday: tmsqrShowsThursday,
		friday: tmsqrShowsFriday,
		saturday: tmsqrShowsSaturday,
	};

	console.log(env.WAVES_VIENNA_TIMETABLE_BUCKET);

	await putShowDays(env.WAVES_VIENNA_TIMETABLE_BUCKET, allShowDays);

	return allShowDays;
}

const toShowsResponse = (showDays: ShowDays): Response => {
	const jsonResp = JSON.stringify(showDays, null, 0);

	const response = new Response(jsonResp, {
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
	});

	return response;
};
