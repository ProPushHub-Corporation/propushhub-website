import type { Job } from '../data/jobTypes';
import type { Partner } from '../data/partnerTypes';
import type { TeamMember } from '../data/teamTypes';
import { createCollection } from './collection';
import type { RemoteCollection, RemoteDoc } from './collection';

/** Firestore collections that feed pages. Fields are documented in DATA_TYPES.md. */
export const teamData = createCollection<TeamMember>('team', 'team-data');
export const partnerData = createCollection<Partner>('partners', 'partners-data');
export const jobData = createCollection<Job>('jobs', 'jobs-data');

/** Every data-driven collection, typed loosely for code that treats them all the same (hydration, prerender). */
export const remoteCollections = [teamData, partnerData, jobData] as unknown as RemoteCollection<RemoteDoc>[];
