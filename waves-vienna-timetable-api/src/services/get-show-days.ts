import { ShowDays } from '../../../shared/model/show-days';

const getShowDays = async (bucket: R2Bucket): Promise<ShowDays | null> => {
	const showDaysResponse = await bucket.get('showDays');

	if (!showDaysResponse) {
		return null;
	}

	const data = await showDaysResponse.json<ShowDays>();

	return data;
};

export { getShowDays };
