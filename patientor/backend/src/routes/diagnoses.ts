import express from 'express';
import diagnoseService from '../services/diagnoseService.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoseService.getDiagnoses());
});

export default router;
