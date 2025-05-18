document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const navi = document.querySelector('.navi');
    let previousScrollPosition = window.pageYOffset;
    let isNavHidden = false;

    // Fungsi untuk menampilkan tab yang dipilih
    function showTab(tabId) {
        // Sembunyikan semua konten tab
        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        // Hapus kelas 'active' dari semua tombol
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });

        // Tampilkan konten tab yang sesuai
        document.getElementById(tabId).classList.add('active');

        // Tambahkan kelas 'active' pada tombol yang diklik
        const activeButton = document.querySelector(`.tab-button[data-tab-id="${tabId}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }

        // Sembunyikan navbar saat tab diklik
        hideNavbar();
    }

    // Fungsi untuk menyembunyikan navbar
    function hideNavbar() {
        if (!isNavHidden) {
            navi.style.transform = 'translateY(-100%)';
            navi.style.transition = 'transform 0.3s ease-in-out';
            isNavHidden = true;
        }
    }

    // Fungsi untuk menampilkan navbar
    function showNavbar() {
        if (isNavHidden) {
            navi.style.transform = 'translateY(0)';
            navi.style.transition = 'transform 0.3s ease-in-out';
            isNavHidden = false;
        }
    }

    // Tambahkan event listener ke setiap tombol tab
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tabId;
            showTab(tabId);
        });
    });

    // Tambahkan event listener ke link navbar "Info Game" dan "Penggarap"
    const navLinks = document.querySelectorAll('.navi nav ul li a'); // Select all links in nav
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Dapatkan target dari tautan (misalnya, #materi-tab, #team-profile)
            const targetId = this.getAttribute('href');
            // Hilangkan '#' untuk mendapatkan ID yang sesuai
            const tabId = targetId.substring(1);

            // Temukan tombol tab yang sesuai dan klik
            const targetTabButton = document.querySelector(`.tab-button[data-tab-id="${tabId}"]`);
            if (targetTabButton) {
                targetTabButton.click(); // Trigger klik pada tombol tab
            }
            hideNavbar();
        });
    });

    // Tampilkan tab pertama secara default saat halaman dimuat
    if (tabButtons.length > 0) {
        const firstTabId = tabButtons[0].dataset.tabId;
        showTab(firstTabId);
    }

    // Event listener untuk scroll
    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.pageYOffset;

        if (currentScrollPosition > previousScrollPosition) {
            // Scroll ke bawah
            hideNavbar();
        } else {
            // Scroll ke atas
            showNavbar();
        }

        previousScrollPosition = currentScrollPosition;
    });
});
