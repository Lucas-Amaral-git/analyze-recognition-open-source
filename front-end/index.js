const video = document.getElementById('video');
const capturarButton = document.getElementById('capturar');
const reiniciarButton = document.getElementById('reiniciar-captura');
const analisarButton = document.getElementById('analisar-captura');
const foto = document.getElementById('foto');
const canvas = document.getElementById('canvas');
const contexto = canvas.getContext('2d');
const fileInput = document.getElementById('fileInput');
const divBotoesCapturar = document.getElementById('botoes-captura-container');
const divBotaoReiniciarCaptura = document.getElementById('botao-resultado-container');
const divResultadosContainer = document.getElementById('resultados-container');
const inputNome = document.getElementById('nome');

document.addEventListener('DOMContentLoaded', () => {

    iniciarCamera();
    capturarButton.addEventListener('click', clickCapturarButton);
    reiniciarButton.addEventListener('click', clickCapturarButton);
    analisarButton.addEventListener('click', function(event) {
        event.preventDefault();

        analisarCaptura(event);
        return false;
    });

    fileInput.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            foto.src = e.target.result;
            foto.style.display = 'block';
            video.style.display = 'none';
            divBotoesCapturar.classList.add('escondido');
            divBotaoReiniciarCaptura.classList.remove('escondido');
        }

        reader.readAsDataURL(file);
        }
    });
});

async function iniciarCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (err) {
        console.error("Erro ao acessar a câmera: ", err);
    }
}

function clickCapturarButton(){
    if (divBotaoReiniciarCaptura.classList.contains('escondido')) {
        capturarFoto();
    } else {
        reiniciarCaptura();
    }
}

function capturarFoto() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    contexto.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imagemData = canvas.toDataURL('image/png');

    foto.src = imagemData;
    foto.style.display = 'block';
    video.style.display = 'none';
    divBotoesCapturar.classList.add('escondido');
    divBotaoReiniciarCaptura.classList.remove('escondido');
}

function reiniciarCaptura(){
    capturarButton.innerText = 'Capturar Foto';
    capturarButton.removeAttribute('data-recapturar');
    foto.style.display = 'none';
    video.style.display = 'block';
    divBotoesCapturar.classList.remove('escondido');
    divBotaoReiniciarCaptura.classList.add('escondido');
    divResultadosContainer.classList.add('escondido');
}

function getImageFromTag(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL('image/png');  // ou 'image/jpeg'
}

function analisarCaptura(event) {
    event.preventDefault();

    var img = getImageFromTag(foto);

    var nome = inputNome.value;

    if( ! nome || nome.trim() === '') {
        alert('Por favor, insira um nome antes de analisar a captura.');
        return;
    }

    divResultadosContainer.classList.add('escondido');

    enviarImagem(img, nome.trim());

    return false;
}

async function enviarImagem(img, nome) {
    const dados = { imagem: img, nome: nome };
    const dadosJson = JSON.stringify(dados);

    try {
        const response = await fetch('http://localhost:5000/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: dadosJson
        });

        const data = await response.json();
        console.log(data);

        if(! data.possuiFotoExemplo){
            alert('Imagem de exemplo cadastrada. As próximas imagens serão para comparação.');
        } else {

            if (data.resultados) {
                preencherResultados(data.resultados);
            }

            alert('Imagem enviada com sucesso.');
        }
    } catch (error) {
        console.error('Erro no envio:', error);
        alert('Erro ao enviar imagem.');
    }
}

function preencherResultados(resultados) {

    divResultadosContainer.classList.remove('escondido');
    
    if(resultados.resultado_deepface !== undefined){
        document.getElementById('reconhecimento_deepface').querySelector('.resultado-reconhecimento').innerText = resultados.resultado_deepface.verified ? 'Reconhecido' : 'Não reconhecido';
    }
    
    if(resultados.resultado_openface !== undefined){
        document.getElementById('reconhecimento_openface').querySelector('.resultado-reconhecimento').innerText = resultados.resultado_openface.verified ? 'Reconhecido' : 'Não reconhecido';
    }
    
    if(resultados.resultado_face_recognition !== undefined){
        document.getElementById('reconhecimento_face-recognition').querySelector('.resultado-reconhecimento').innerText = resultados.resultado_face_recognition.verified ? 'Reconhecido' : 'Não reconhecido';
    }
}