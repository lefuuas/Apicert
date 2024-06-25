const axios = require('axios');
// const FormData = require('form-data');
// const fs = require('fs');
// const path = require('path');

// const fileToUpload = 'C:/Users/Pedro/Documents/apiCertificado/webserver_templete/125971342.pdf';  // Caminho do arquivo que você deseja enviar

// // Criando um objeto FormData para enviar o arquivo original
// const formData = new FormData();
// formData.append('pdf', fs.createReadStream(fileToUpload), {
//     filename: path.basename(fileToUpload)  // Nome original do arquivo
// });

// // Configuração do Axios para enviar a requisição POST para upload
// axios.post('http://localhost:3000/pdf/upload', formData, {
//     headers: {
//         ...formData.getHeaders()  // Adiciona os headers necessários para multipart/form-data
//     }
// })
// .then(uploadResponse => {
//     const { id } = uploadResponse.data;
//     console.log('Arquivo original enviado com sucesso. ID:', id);

//     // Simulando envio de PDF editado
//     const fileEdited = 'C:/Users/Pedro/Documents/apiCertificado/webserver_templete/ebook.pdf';
//     const editedFormData = new FormData();
//     editedFormData.append('pdf', fs.createReadStream(fileEdited), {
//         filename: path.basename(fileEdited)  // Nome original do arquivo editado
//     });
//     editedFormData.append('id', id);

//     // Configuração do Axios para enviar a requisição POST para edição
//     return axios.post('http://localhost:3000/pdf/edit', editedFormData, {
//         headers: {
//             ...editedFormData.getHeaders()  // Adiciona os headers necessários para multipart/form-data
//         }
//     });
// })

// async function downloadFile(url, localFilePath) {
//     try {
//         const response = await axios.get(url, { responseType: 'stream' });

//         const writer = fs.createWriteStream(localFilePath);
//         response.data.pipe(writer);

//         return new Promise((resolve, reject) => {
//             writer.on('finish', resolve);
//             writer.on('error', reject);
//         });
//     } catch (error) {
//         console.error('Erro ao baixar o arquivo:', error.message);
//         throw error;
//     }
// }
// // Exemplo de uso
// const id = 'e5d032bb-0ed4-427d-ad3b-93617a9c7e89';

// const baseUrl = 'http://localhost:3000/pdf';
// const docatualUrl = `${baseUrl}/${id}?type=docatual`;
// const editedUrl = `${baseUrl}/${id}?type=edited`;

// const docatualFilePath = path.join('C:/Users/Pedro/Documents/apiCertificado/webserver_templete/', 'docatual.pdf');
// const editedFilePath = path.join('C:/Users/Pedro/Documents/apiCertificado/webserver_templete/', 'edited.pdf');

// downloadFile(docatualUrl, docatualFilePath)
//     .then(() => downloadFile(editedUrl, editedFilePath))
//     .then(() => {
//         console.log('Arquivos baixados com sucesso.');
//     })
//     .catch((error) => {
//         console.error('Erro ao baixar os arquivos:', error.message);
//     });


// // Exemplo de uso das rotas
async function exemploConsumirRotas() {
//     try {
//         // Upload de um PDF
//         const uploadResponse = await axios.post(`${baseUrl}/pdf/upload`, formData, {
//             headers: {
//                 ...formData.getHeaders()
//             }
//         });
//         const { id } = uploadResponse.data;

//         console.log('Arquivo enviado com sucesso. ID:', id);

//         // Verificar se o arquivo tem versão editada
//         const editedResponse = await axios.get(`${baseUrl}/pdf/${id}/edited`);
//         const { hasEdited } = editedResponse.data;

//         console.log(`O arquivo com ID ${id} ${hasEdited ? 'já tem' : 'ainda não tem'} uma versão editada.`);

        // Listar todos os IDs de arquivos existentes
        const baseUrl = 'http://localhost:3000';
        const listarResponse = await axios.get(`${baseUrl}/pdf/listar`);
        const ids = listarResponse.data;

        console.log('IDs de arquivos existentes:', ids);
//     } catch (error) {
//         console.error('Erro ao consumir as rotas:', error.message);
    }
// }

// // Executar o exemplo
exemploConsumirRotas();
