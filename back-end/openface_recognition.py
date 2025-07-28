from deepface import DeepFace
import os

UPLOAD_FOLDER = 'uploads'

def verify_faces_openface(path, image1_name, image2_name):

    complete_path = os.path.join(UPLOAD_FOLDER, path)
    """
    Verifica se duas imagens de rosto são da mesma pessoa.
    
    :param image1_name: Caminho para a primeira imagem.
    :param image2_name: Caminho para a segunda imagem.
    :return: Dicionário com o resultado da verificação.
    """
    try:
        result = DeepFace.verify(f"{complete_path}/{image1_name}", f"{complete_path}/{image2_name}", "OpenFace")
        return result
    except Exception as e:
        return {"error": str(e)}