import diagnoses from '../../data/diagnoses.ts';
import type { Diagnosis } from '../types.ts';

const getDiagnoses = (): Diagnosis[] => diagnoses;

export default { getDiagnoses };
