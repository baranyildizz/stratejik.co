// Sayfa tek ekrandır: tek parmakla sürüklemeyi engelle ki iOS Safari
// sayfa kenarında esnemesin (bounce). Linklere dokunma etkilenmez.
// Erişilebilirlik için iki parmakla yakınlaştırma serbesttir; sayfa
// yakınlaştırılmışken de tek parmakla gezinmeye izin verilir.
document.addEventListener('touchmove', function (e) {
    var zoomed = window.visualViewport && window.visualViewport.scale > 1.01;
    if (e.touches.length === 1 && !zoomed) {
        e.preventDefault();
    }
}, { passive: false });
