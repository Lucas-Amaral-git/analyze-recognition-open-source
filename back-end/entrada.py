from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import base64, os, uuid

from deepface_recognition import verify_faces_deepface
from openface_recognition import verify_faces_openface
from facerecognition_recognition import verify_faces_face_recognition

app = Flask(__name__)
CORS(app)  # permite que o front acesse o back mesmo em outra porta

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload():
    data = request.get_json()
    base64_str = data.get('imagem')
    nome = data.get('nome')

    if not base64_str or not base64_str.startswith('data:image'):
        return jsonify({'erro': 'Imagem inválida'}), 400

    header, encoded = base64_str.split(',', 1)
    extension = header.split('/')[1].split(';')[0]

    if not os.path.isdir(os.path.join(UPLOAD_FOLDER, nome)) or not os.path.isfile(os.path.join(UPLOAD_FOLDER, nome, "exemplo.png")):
        filename = f"exemplo.{extension}"
    else:
        filename = f"{uuid.uuid4()}.{extension}"

    pasta_usuario = os.path.join(UPLOAD_FOLDER, nome)
    os.makedirs(pasta_usuario, exist_ok=True)
    caminho = os.path.join(pasta_usuario, filename)

    exemplo_path = os.path.join(pasta_usuario, "exemplo.png")
    if os.path.isfile(exemplo_path):
        possuiFotoExemplo = True
    else:
        possuiFotoExemplo = False

    with open(caminho, 'wb') as f:
        f.write(base64.b64decode(encoded))

    result_deepface = {}
    result_openface = {}
    result_face_recognition = {}
    if possuiFotoExemplo:
        # Aqui você pode chamar a função de verificação de faces
        result_deepface = verify_faces_deepface(nome, filename, "exemplo.png")
        result_openface = verify_faces_openface(nome, filename, "exemplo.png")
        result_face_recognition = verify_faces_face_recognition(nome, filename, "exemplo.png")

    return jsonify({'mensagem': 'Imagem recebida com sucesso', 'arquivo': filename, 'possuiFotoExemplo': possuiFotoExemplo, 'resultados' : {'resultado_deepface': result_deepface, 'resultado_openface': result_openface, 'resultado_face_recognition': result_face_recognition}})

# Para acessar o HTML localmente (opcional)
# @app.route('/')
# def index():
#     return send_from_directory('.', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)