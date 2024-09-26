function showSection(sectionId) {
    // Ocultar todas las secciones y detener la reproducción de los videos
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
        
        // Detener videos reiniciando el src de cada iframe dentro de la sección
        const iframes = section.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            const src = iframe.src;
            iframe.src = ''; // Quitar el src para detener el video
            iframe.src = src; // Restablecer el src para que pueda reproducirse de nuevo si se vuelve a mostrar
        });
    });

    // Mostrar la sección seleccionada
    const selectedSection = document.getElementById(sectionId);
    selectedSection.style.display = 'block';
}

function submitAnswers() {
    // Recoger las respuestas de las preguntas
    const answer1 = document.getElementById('question1').value;
    const answer2 = document.getElementById('question2').value;

    // Verificar que las cajas de texto no estén vacías
    if (!answer1 || !answer2) {
        alert("Por favor, responde ambas preguntas.");
        return;
    }
    document.getElementById('question1').value = '';
    document.getElementById('question2').value = '';
}

function handleSocialMediaUsage(usesSocialMedia) {
    if (usesSocialMedia) {
        document.getElementById("socialMediaList").style.display = "block";
        document.getElementById("noSocialMediaMessage").style.display = "none";
    } else {
        document.getElementById("socialMediaList").style.display = "none";
        document.getElementById("noSocialMediaMessage").style.display = "block";
        document.getElementById("aiQuestion").style.display = "block";
    }
}

function showAIMessage() {
    const selectedNetworks = Array.from(document.querySelectorAll('input[name="q2"]:checked'))
                                  .map(input => input.value);
    const message = `¿Sabías que las redes sociales (${selectedNetworks.join(', ')}), utilizan algoritmos elaborados con IA y machine learning para ofrecerte una experiencia personalizada?`;
    document.getElementById("aiMessage").textContent = message;
    document.getElementById("aiMessage").style.display = "block";
    document.getElementById("aiQuestion").style.display = "block";  // Mover aquí la pregunta
}

function showVideo() {
    document.getElementById("youtubeVideo").style.display = "block";
    document.getElementById("thankYouMessage").style.display = "none";
}

function showThankYouMessage() {
    document.getElementById("thankYouMessage").style.display = "block";
    document.getElementById("youtubeVideo").style.display = "none";
}

// Array de URLs de imágenes aleatorias (puedes usar cualquier conjunto de imágenes que prefieras)
const randomImages = [
    'https://pampermut.com/blog/wp-content/uploads/2020/05/Como-es-el-caracter-de-tu-perro-segun-su-horoscopo-scaled.jpg',
    'https://t2.uc.ltmcdn.com/es/posts/7/8/2/como_cuidar_un_conejo_domestico_7287_600.jpg',
    'https://inaturalist-open-data.s3.amazonaws.com/photos/175267007/original.jpg',
    'https://spanish.xinhuanet.com/photo/2020-03/01/138826147_15828585709341n.jpg',
    'https://cdn.download.ams.birds.cornell.edu/api/v2/asset/95481341/1200',
];

// URL de la imagen del gatito
const catImage = 'https://www.zooplus.es/magazine/wp-content/uploads/2018/04/fotolia_169457098.jpg';

// Inicialización del captcha
function initializeCaptcha() {
    const captchaImages = document.getElementById('captchaImages');
    captchaImages.innerHTML = ''; // Limpiar el contenedor

    const images = [...randomImages]; // Copiamos el array de imágenes aleatorias
    const randomIndex = Math.floor(Math.random() * 6); // Posición aleatoria
    images.splice(randomIndex, 0, catImage); // Insertar la imagen del gato en una posición aleatoria

    createCaptchaImages(images); // Crear las imágenes
}

// Crear imágenes en el DOM
function createCaptchaImages(images) {
    const captchaImages = document.getElementById('captchaImages');
    images.forEach((imageUrl, index) => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Captcha Image ${index + 1}`;
        img.style.width = '150px';
        img.style.margin = '10px';
        img.onclick = () => checkCaptcha(imageUrl); // Comprobar si es el gato
        captchaImages.appendChild(img);
    });
}


// Función para verificar si se seleccionó la imagen correcta
function checkCaptcha(selectedImage) {
    const resultMessage = document.getElementById('resultMessage');
    if (selectedImage === catImage) {
        resultMessage.textContent = '¡Correcto! Has seleccionado la imagen del gatito.';
        resultMessage.style.color = 'white';

        // Mostrar el mensaje adicional
        const extraMessage = document.createElement('p');
        extraMessage.textContent = '¡Felicitaciones! Google necesitó 16.000 procesadores para enseñarle a una computadora a identificar imágenes de gatos.';
        extraMessage.style.color = 'white';
        resultMessage.appendChild(extraMessage); // Agregar el mensaje debajo del resultado
    } else {
        resultMessage.textContent = 'Error. Por favor, selecciona la imagen correcta.';
        resultMessage.style.color = 'white';
    }
}


// Inicializar el captcha al cargar la página
window.onload = initializeCaptcha;
