let camara_boton = document.querySelector("#iniciar-camara");
let video = document.querySelector("#video");
let clic_boton = document.querySelector("#clic-foto");
let canvas = document.querySelector("#canvas");
let dataurl_container = document.querySelector("#dataurl-container");
let dataurl = document.querySelector("#dataurl");
let azure_boton = document.querySelector("#clic-azure");
let img_azure = document.querySelector("#imgazure");
let img_azureurl = document.querySelector("#imgazure-url");

camara_boton.addEventListener("click", async function () {
    let stream = null;
    try{
        stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
    }
    catch (error){
        alert(error.message);
        return;
    }

    video.srcObject = stream;
    video.style.display = "block";
    camara_boton.style.display = "none";
    clic_boton.style.display = "block";
});


clic_boton.addEventListener("click", function () {
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    let image_data_url = canvas.toDataURL("image/jpeg");

    dataurl.value = image_data_url;
    dataurl_container.style.display = "block";
});

azure_boton.addEventListener("click", async function () {
    //convertimos a binario
    canvas.toBlob(udloadFile, "image/jpeg");
});

async function udloadFile(blob){
    let file = null;
    let filename = `azure${Date.now()}.jpg`;
    const urlAzure = 'https://bryanjosuehernandezmarcialwebapifoto.azurewebsites.net';
    const urlFotoAzure = urlAzure + '/api/Foto'

    file = new File([blob], filename, {type: 'image/jpeg'});

    let data = new FormData();
    data.append('nombre', fileName);
    data.append('archivo', file);

    let response = await fetch(urlFotoAzure, {
        method: 'POST',
        body: data
    });

    if(response.status == 201){
        const datos = await response.json();
        img_azure.setAttribute('src', datos.url);
        img_azureurl.setAttribute("width", 320);
        img_azureurl.setAttribute("height", 240);
        img_azureurl.innerHTML = datos.url;
    }else {
        alert('Error al subir la imagen');
    }
}