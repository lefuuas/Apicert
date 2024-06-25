import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({ dest: 'uploads/' });

const controleArquivosPath = path.join(__dirname, 'controle-arquivos.json');

// Função para criar o arquivo controle-arquivos.json se não existir
function criarControleArquivosInicial() {
    if (!fs.existsSync(controleArquivosPath)) {
        fs.writeFileSync(controleArquivosPath, '{}');
    }
}

// Criar o arquivo controle-arquivos.json se não existir
criarControleArquivosInicial();

// Função para ler o conteúdo do arquivo controle-arquivos.json
function lerControleArquivos() {
    try {
        const data = fs.readFileSync(controleArquivosPath);
        return JSON.parse(data);
    } catch (err) {
        console.error('Erro ao ler controle-arquivos.json:', err);
        return {};
    }
}

// Função para salvar o conteúdo no arquivo controle-arquivos.json
function salvarControleArquivos(controleArquivos) {
    try {
        const data = JSON.stringify(controleArquivos, null, 2);
        fs.writeFileSync(controleArquivosPath, data);
    } catch (err) {
        console.error('Erro ao salvar controle-arquivos.json:', err);
    }
}

function createDirectories(directory) {
    fs.mkdirSync(directory, { recursive: true });
}

// Função para lidar com o upload de PDF e mover para 'docatual'
export async function PdfUpload(req, res) {
    try {
        if (!req.file) {
            return res.status(400).send('Nenhum arquivo enviado.');
        }

        const { originalname, path: tempPath } = req.file;
        const { ext } = path.parse(originalname);
        const id = uuidv4(); // Gera um ID único

        // Criar diretório com o ID único
        const dir = path.join(__dirname, '..', 'pdfs', id);
        createDirectories(dir);

        // Criar subdiretório 'docatual'
        const docatualDir = path.join(dir, 'docatual');
        createDirectories(docatualDir);

        // Mover o arquivo para o subdiretório 'docatual' com o novo nome
        const docatualPath = path.join(docatualDir, `${id}${ext}`);
        await fs.promises.rename(tempPath, docatualPath);

        // Atualizar o controle de arquivos
        const controleArquivos = lerControleArquivos();
        controleArquivos[id] = { hasEdited: false };
        salvarControleArquivos(controleArquivos);

        res.status(200).json({ message: 'Arquivo recebido e movido para docatual.', id });
    } catch (err) {
        console.error('Erro ao mover o arquivo:', err);
        res.status(500).send('Erro ao mover o arquivo.');
    }
}

// Função para lidar com o PDF editado e mover para 'edited'
export async function PdfEditado(req, res) {
    try {
        if (!req.file || !req.body.id) {
            return res.status(400).send('Nenhum arquivo enviado ou ID não fornecido.');
        }

        const { originalname, path: tempPath } = req.file;
        const { ext } = path.parse(originalname);
        const { id } = req.body; // Receber o ID do corpo da requisição

        // Criar diretório com o ID único
        const dir = path.join(__dirname, '..', 'pdfs', id);
        createDirectories(dir);

        // Criar subdiretório 'edited'
        const editedDir = path.join(dir, 'edited');
        createDirectories(editedDir);

        // Mover o arquivo editado para o subdiretório 'edited' com o novo nome
        const editedPath = path.join(editedDir, `${id}${ext}`);
        await fs.promises.rename(tempPath, editedPath);

        // Atualizar o controle de arquivos
        const controleArquivos = lerControleArquivos();
        controleArquivos[id].hasEdited = true;
        salvarControleArquivos(controleArquivos);

        res.status(200).send('Arquivo editado recebido e movido para edited.');
    } catch (err) {
        console.error('Erro ao mover o arquivo editado:', err);
        res.status(500).send('Erro ao mover o arquivo editado.');
    }
}

// Função para obter arquivos por ID
export async function getPdf(req, res) {
    try {
        const { id } = req.params;
        const { type } = req.query;

        if (!id || !type) {
            return res.status(400).send('ID ou tipo não fornecidos.');
        }

        const dir = path.join(__dirname, '..', 'pdfs', id, type);
        const files = await fs.promises.readdir(dir);

        if (files.length === 0) {
            return res.status(404).send('Arquivo não encontrado.');
        }

        const filePath = path.join(dir, files[0]);
        res.sendFile(filePath);
    } catch (err) {
        console.error('Erro ao buscar o arquivo:', err);
        res.status(500).send('Erro ao buscar o arquivo.');
    }
}

// Rota para listar todos os IDs de arquivos
export async function listarArquivos(req, res) {
    try {
        const controleArquivos = lerControleArquivos();
        const ids = Object.keys(controleArquivos);
        res.status(200).json(ids);
    } catch (err) {
        console.error('Erro ao listar os arquivos:', err);
        res.status(500).send('Erro ao listar os arquivos.');
    }
}

// Rota para verificar se um arquivo tem versão editada
export async function verificarArquivoEditado(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send('ID não fornecido.');
        }

        const controleArquivos = lerControleArquivos();
        const hasEdited = controleArquivos[id] ? controleArquivos[id].hasEdited : false;
        res.status(200).json({ id, hasEdited });
    } catch (err) {
        console.error('Erro ao verificar se o arquivo tem versão editada:', err);
        res.status(500).send('Erro ao verificar se o arquivo tem versão editada.');
    }
}

export const uploadMiddleware = upload.single('pdf');
