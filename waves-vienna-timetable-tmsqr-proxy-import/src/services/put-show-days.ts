import { ShowDays } from '../model/show-days';

const putShowDays = async (bucket: R2Bucket, showDays: ShowDays): Promise<R2Object | null> => {
	const showsSerialized = JSON.stringify(showDays);

	return await bucket.put(`showDays`, showsSerialized);
};

export { putShowDays };
