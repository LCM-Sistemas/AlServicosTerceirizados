document.addEventListener('DOMContentLoaded', function () {
    var waLink = document.getElementById('wc_whatsapp_link');
    if (waLink && /Win|Mac|Linux/.test(navigator.platform)) {
        waLink.href = 'https://api.whatsapp.com/send?phone=5511964975381';
    }
});

function setEvent(category, action) {
    console.log('Evento registrado:', category, action);
}
