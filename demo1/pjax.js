(function (Barba) {
    document.addEventListener("DOMContentLoaded", function (event) {
        console.log('pjax start');
        // Barba init
        Barba.Pjax.start();

        // Barba prefetch init
        Barba.Prefetch.init();
    });
}(Barba));
