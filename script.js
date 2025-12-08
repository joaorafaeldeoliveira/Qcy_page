document.addEventListener('DOMContentLoaded', function() {
    const colorButtons = document.querySelectorAll('.color-btn');
    const body = document.body;
    
    const themeConfig = {
        'black': {
            center: 'black',
            right: 'silver',
            left: 'purple'
        },
        'silver': {
            center: 'silver',
            right: 'purple',
            left: 'black'
        },
        'purple': {
            center: 'purple',
            right: 'black',
            left: 'silver'
        }
    };
    
    let currentTheme = 'black';
    
    function showPhoneInPosition(position, color, isExiting = false) {
        const phones = document.querySelectorAll(`.${position}-phone`);
        phones.forEach(phone => {
            phone.classList.remove('active', 'exiting');
            if (phone.dataset.color === color) {
                if (isExiting) {
                    phone.classList.add('exiting');
                } else {
                    phone.classList.add('active');
                }
            }
        });
    }
    
    function changeTheme(theme) {
        if (theme === currentTheme) return;
        
        body.setAttribute('data-theme', theme);
        
        colorButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.theme === theme) {
                btn.classList.add('active');
            }
        });
        showPhoneInPosition('center', themeConfig[currentTheme].center, true);
        showPhoneInPosition('right', themeConfig[currentTheme].right, true);
        showPhoneInPosition('left', themeConfig[currentTheme].left, true);
        
        setTimeout(() => {
            showPhoneInPosition('center', themeConfig[theme].center, false);
            showPhoneInPosition('right', themeConfig[theme].right, false);
            showPhoneInPosition('left', themeConfig[theme].left, false);
            
            setTimeout(() => {
                document.querySelectorAll('.center-phone, .right-phone, .left-phone').forEach(phone => {
                    phone.classList.remove('exiting');
                });
            }, 800);
        }, 100);
        
        currentTheme = theme;
    }
    
    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.dataset.theme;
            changeTheme(theme);
        });
    });
    
    function initializePhones() {
        showPhoneInPosition('center', 'black', false);
        showPhoneInPosition('right', 'silver', false);
        showPhoneInPosition('left', 'purple', false);
    }
    
    initializePhones();

    const searchToggle = document.getElementById('searchToggle');
    const searchInput = document.getElementById('searchInput');
    const iconsContainer = document.getElementById('iconsContainer');
    
    let isSearchActive = false;
    
    if (searchToggle) {
        searchToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (!isSearchActive) {
                iconsContainer.classList.add('search-active');
                isSearchActive = true;
                
                setTimeout(() => {
                    searchInput.focus();
                }, 300);
            } else {
                closeSearch();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isSearchActive) {
                closeSearch();
            }
            if (e.key === 'Enter' && isSearchActive && document.activeElement === searchInput) {
                const query = searchInput.value.trim();
                if (query) {
                    alert(`Buscando por: "${query}"`);
                    searchInput.value = '';
                    closeSearch();
                }
            }
        });
        
        document.addEventListener('click', function(e) {
            if (isSearchActive && 
                !searchToggle.contains(e.target) && 
                !searchInput.contains(e.target)) {
                closeSearch();
            }
        });
        
        function closeSearch() {
            iconsContainer.classList.remove('search-active');
            isSearchActive = false;
            searchInput.value = '';
        }
    }
    
    const hamburger = document.getElementById('hamburgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu.querySelectorAll('a');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    const mobileSearchToggle = document.getElementById('mobileSearchToggle');
    const mobileSearchOverlay = document.getElementById('mobileSearchOverlay');
    const closeSearchMobile = document.getElementById('closeSearchMobile');
    
    mobileSearchToggle.addEventListener('click', () => {
        mobileSearchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeSearchMobile.addEventListener('click', () => {
        mobileSearchOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    mobileSearchOverlay.addEventListener('click', (e) => {
        if (e.target === mobileSearchOverlay) {
            mobileSearchOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    const mobileSearchInput = mobileSearchOverlay.querySelector('input');
    mobileSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const query = mobileSearchInput.value.trim();
            if (query) {
                alert(`Buscando por: "${query}"`);
                mobileSearchInput.value = '';
                mobileSearchOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileSearchOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});