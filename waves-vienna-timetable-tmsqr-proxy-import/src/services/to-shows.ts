import { Stage, TmsqrShowDay } from '../model/tmsqr-show-day';
import { Show } from '../../../shared/model/show';

export const toShows = (showDay: TmsqrShowDay): Show[] => {
	return [...showDay.stages]
		.map((stage) => toShowsInternal(stage))
		.flat()
		.sort((a, b) => new Date(a.end).getTime() - new Date(b.start).getTime());
};

const toShowsInternal = (stage: Stage): Show[] => {
	return stage.performances.map((p) => ({
		id: p.id,
		artistName: p.artist,
		start: p.start,
		end: p.end,
		venue: stage.title,
		showcase: p.artistJson.Description ?? '',
		thumbnail: p.artistJson.ImageURL,
	}));
};
