import { Show } from '../../../shared/model/show';
import { IdOfDay } from '../model/id-of-day.enum';
import { TmsqrShowDay } from '../model/tmsqr-show-day';
import { toShows } from './to-shows';

const getTmsqrShowDay = async (idOfDay: IdOfDay): Promise<Show[]> => {
	const showsUrl = `https://tmsqr.app/api/timetable/667bd96a3d805/stage/${idOfDay}/`;

	const res = await fetch(showsUrl, {
		method: 'GET',
		headers: {
			// Fool Tmsqr Bot Detection by setting Host and User-Agent
			Host: 'tmsqr.app',
			'User-Agent': 'Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
		},
	});

	if (!res.ok) {
		throw Error(`could not fetch data from procfu`);
	}

	const json = await res.json();

	const showDay = toShows(json as TmsqrShowDay);

	return showDay;
};

export { getTmsqrShowDay as getShowDay };
