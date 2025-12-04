document.addEventListener('DOMContentLoaded', function() {
    const colorButtons = document.querySelectorAll('.color-btn');
    const centerPhones = document.querySelectorAll('.center-phone');
    const rightPhones = document.querySelectorAll('.right-phone');
    const leftPhones = document.querySelectorAll('.left-phone');
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
                centerPhones.forEach(phone => phone.classList.remove('exiting'));
                rightPhones.forEach(phone => phone.classList.remove('exiting'));
                leftPhones.forEach(phone => phone.classList.remove('exiting'));
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
        centerPhones.forEach(phone => phone.classList.remove('active', 'exiting'));
        rightPhones.forEach(phone => phone.classList.remove('active', 'exiting'));
        leftPhones.forEach(phone => phone.classList.remove('active', 'exiting'));
        
        showPhoneInPosition('center', 'black', false);
        showPhoneInPosition('right', 'silver', false);
        showPhoneInPosition('left', 'purple', false);
    }
    

    initializePhones();
    
    console.log('Center phones found:', centerPhones.length);
    console.log('Right phones found:', rightPhones.length);
    console.log('Left phones found:', leftPhones.length);
    console.log('All elements should be 3. If not, check your HTML structure.');
});

const hamburger = document.getElementById('hamburger');
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