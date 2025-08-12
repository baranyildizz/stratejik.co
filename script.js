document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('bgVideo');
    const videoContainer = document.querySelector('.video-background');

    // Videonun oynatılabileceği anı bekle
    video.addEventListener('canplay', () => {
        // Video oynatılabildiğinde, arka planı yavaşça görünür yap
        videoContainer.classList.add('loaded');
    }, { once: true });

    // Video dosyasını yüklerken hata olursa
    video.addEventListener('error', () => {
        console.error("Video yüklenemedi. Poster görseli gösteriliyor.");
        // Gerekirse burada posteri kalıcı hale getirecek bir class ekleyebilirsiniz.
        // Örneğin, videoContainer'ın arka planına poster.jpg'yi atayabilirsiniz.
        videoContainer.style.backgroundImage = `url('${video.poster}')`;
        videoContainer.style.backgroundSize = 'cover';
        videoContainer.classList.add('loaded'); // Hata durumunda da posteri göster
    });

    // Videoyu oynatmayı dene
    const playPromise = video.play();

    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // Otomatik oynatma engellendi. Bu durum mobilde ve düşük güç modunda normaldir.
            console.warn("Otomatik oynatma engellendi. Kullanıcı etkileşimi bekleniyor.");
            
            // Kullanıcı etkileşimde bulunduğunda videoyu başlatmak için bir kerelik dinleyiciler ekle.
            const startVideoOnInteraction = () => {
                video.play().catch(err => console.error("Etkileşim sonrası oynatma başarısız oldu:", err));
            };

            document.body.addEventListener('click', startVideoOnInteraction, { once: true });
            document.body.addEventListener('touchstart', startVideoOnInteraction, { once: true });
        });
    }
});
