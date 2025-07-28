import face_recognition
import os
import time

UPLOAD_FOLDER = 'uploads'

def verify_faces_face_recognition(path, image1_name, image2_name):
    """
    Verifica se duas imagens de rosto são da mesma pessoa usando a biblioteca face_recognition.
    
    :param path: Caminho para o diretório onde as imagens estão armazenadas.
    :param image1_name: Nome do arquivo da primeira imagem.
    :param image2_name: Nome do arquivo da segunda imagem.
    :return: Dicionário com o resultado da verificação.
    """

    complete_path = os.path.join(UPLOAD_FOLDER, path)

    try:
        start_time = time.time()
        # Carrega as imagens
        image1 = face_recognition.load_image_file(f"{complete_path}/{image1_name}")
        image2 = face_recognition.load_image_file(f"{complete_path}/{image2_name}")

        # Codifica as faces
        encoding1 = face_recognition.face_encodings(image1)[0]
        encoding2 = face_recognition.face_encodings(image2)[0]

        # Compara as faces
        results = face_recognition.compare_faces([encoding1], encoding2)

        end_time = time.time()
        duration = round(end_time - start_time, 4)

        return {
            "verified": bool(results[0]),
            "time": duration
        }
    except Exception as e:
        return {"error": str(e)}