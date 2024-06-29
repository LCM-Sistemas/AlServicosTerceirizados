document.addEventListener('DOMContentLoaded', function() {
    console.log("Script ARIA carregado");
    var tabs = document.querySelectorAll('.elementor-tab-title');
    tabs.forEach(function(tab) {
        console.log("Processando tab:", tab);
        tab.removeAttribute('aria-selected'); // Remover aria-selected
        
        var contentId = tab.getAttribute('aria-controls');
        var content = document.getElementById(contentId);
        if (content) {
            content.setAttribute('aria-labelledby', tab.id);
            content.setAttribute('role', 'region');
            content.setAttribute('aria-hidden', tab.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
            console.log("Atributos ARIA aplicados ao conteúdo:", content);
        }
        tab.setAttribute('role', 'button');
        tab.setAttribute('tabindex', '0');
        tab.setAttribute('aria-expanded', tab.getAttribute('aria-expanded') === 'true' ? 'true' : 'false');
        console.log("Atributos ARIA aplicados ao tab:", tab);
    });
});
