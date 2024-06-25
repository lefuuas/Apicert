import express from 'express';
import * as PDF from '../controllers/PDF.js';

const router = express.Router();

router.post('/pdf/upload', PDF.uploadMiddleware, PDF.PdfUpload);

router.post('/pdf/edit', PDF.uploadMiddleware, PDF.PdfEditado);

router.get('/pdf/:id', PDF.getPdf);

router.get('/pdf/listar', PDF.listarArquivos);

router.get('/pdf/:id/edited', PDF.verificarArquivoEditado);

export default router;
