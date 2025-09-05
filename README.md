# 🧠 Reconhecimento Facial com Python
Este repositório contém um projeto de reconhecimento facial construído com Python e Flask. A aplicação permite o envio de uma imagem para o servidor, onde ela é salva e comparada com uma imagem de exemplo previamente cadastrada. Utilizando diferentes tecnologias de reconhecimento facial — como DeepFace, OpenFace e face_recognition — o sistema analisa se há correspondência entre os rostos e retorna os resultados da comparação.

## 🛠️ Guia de Instalação - Reconhecimento Facial

Siga os passos abaixo para configurar o ambiente do projeto corretamente no Windows 11.

### ⚙️ Configuração Básica

1. **Instale o Python 3.10.0**
   Baixe em: [https://www.python.org/downloads/release/python-3100/](https://www.python.org/downloads/release/python-3100/)

   > ⚠️ Lembre-se de adicionar às variáveis de ambiente.

---

### 🔌 Dependências do Flask

Instale o Flask e o CORS:

```bash
pip install flask
pip install flask-cors
```

---

### 🤖 Dependências do DeepFace

Para usar o DeepFace:

```bash
pip install deepface
pip install tf-keras
```

---

### 🧠 Dependências do face\_recognition para Linux

Se você estiver usando **Linux (Ubuntu/Debian/etc.)**, siga os passos abaixo para instalar o `face_recognition`:

1. Instale dependências do sistema:

```bash
sudo apt update
sudo apt install -y build-essential cmake python3-dev python3-pip libopenblas-dev liblapack-dev libx11-dev libgtk-3-dev
```

> Essas bibliotecas são importantes para compilar o `dlib`, usado internamente pelo `face_recognition`.

 2. Instale o `dlib` e o `face_recognition` via `pip`:

```bash
pip install dlib
pip install face_recognition
```

### 🧠 Dependências do face\_recognition para Windows

1. **Instale o [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)**
   Durante a instalação, marque:

   * *C++ build tools*
   * *Windows 10 SDK*

2. **Instale o CMake**
   Baixe e instale: [https://cmake.org/download/](https://cmake.org/download/)
   Ou via pip:

   ```bash
   pip install cmake
   ```

3. **Instale o `dlib`**

   ```bash
   pip install dlib
   ```

4. **Instale o `face_recognition`**

   ```bash
   pip install face_recognition
   ```

---

### ✅ Finalizando

Após a instalação de todas as dependências, você pode executar o back-end com:

```bash
python entrada.py
```

O front-end pode ser aberto no navegador diretamente com um Live Server do VS Code ou configurado para ser servido pelo próprio Flask, se preferir. 

Se for utilizar o Live Server do VS Code, é importante que não capture alterações nas pastas `back-end/__pycache__` e `back-end/uploads`, porque pode gerar um reload na tela que vai atrapalhar a exibição dos resultados.

Alunos: Rafael Botelho Cabral, Paulo Cesar Farias Júnior e Lucas Amaral.
