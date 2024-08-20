export interface TmsqrShowDay {
	startTime: string;
	endTime: string;
	stages: Stage[];
}

export interface Stage {
	title: string;
	subTitle: null | string;
	id: number;
	performances: Performance[];
}

interface Performance {
	artist: string;
	id: number;
	start: string;
	end: string;
	info: string;
	artistJson: ArtistJson;
}

interface ArtistJson {
	ID: number;
	Title: string;
	Description: null | string | string;
	ImageURL?: string;
	SocialLinks: (SocialLink | SocialLink)[];
	Gigs: Gigs;
	YoutubePreview: null | null | string | string;
}

interface Gigs {}

interface SocialLink {
	ClassName: string;
	LastEdited: string;
	Created: string;
	Type: string;
	Url: string;
	ArtistID: number;
	FestivalID: number;
	EditionID: number;
	ID: number;
	RecordClassName: string;
}
