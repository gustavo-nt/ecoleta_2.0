// Dark Mode
const html = document.querySelector('html');
let check = JSON.parse(localStorage.getItem('darkMode'));
const toggle = document.querySelector('#dark-mode');
const borderMap = document.querySelector('.map-container');

if(!check) {
    localStorage.setItem('darkMode', JSON.stringify({
        value: false
    }));

    check = JSON.parse(localStorage.getItem('darkMode'));
}

if(toggle) {
    const container = document.createElement('div');
    const content = document.createElement('div');
    const icon = document.createElement('img');

    if(container) {
        Object.assign(container.style,{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
        });
    }

    if(content) {
        Object.assign(content.style,{
            marginTop: '15px',
            marginRight: '15px',
            cursor: 'pointer'
        });
    }

    if(icon) {
        icon.style.maxWidth = '36px';
        if(check.value) {
            icon.setAttribute('src', './assets/moon.svg');
        } else {
            icon.setAttribute('src', './assets/sun.svg');
        }
    }

    content.appendChild(icon);
    container.appendChild(content);
    toggle.appendChild(container);

    toggle.addEventListener('click', function(event){
        if(!check.value) {
            localStorage.setItem('darkMode', JSON.stringify({
                value: true
            }));
            check.value = true;
            icon.setAttribute('src', './assets/moon.svg');
        } else {
            localStorage.setItem('darkMode', JSON.stringify({
                value: false
            }));
            check.value = false;
            icon.setAttribute('src', './assets/sun.svg');
        }
    
        dark(check.value);
    });
}

// Altered images
const images = {
    logo: document.querySelector('header img.logo'),
    backHome: document.querySelector('body #page-home'),
    pencilTool: document.querySelectorAll('.edit a img'),
    upload: document.querySelector('.upload img')
}

const initialColors = {
    bg: window.getComputedStyle(html).getPropertyValue('--bg'),
    titleColor: window.getComputedStyle(html).getPropertyValue('--title-color'),
    primaryColor: window.getComputedStyle(html).getPropertyValue('--primary-color'), 
    darkColor: window.getComputedStyle(html).getPropertyValue('--dark-color'),
    form: window.getComputedStyle(html).getPropertyValue('--form'),
    input: window.getComputedStyle(html).getPropertyValue('--input'),
    span: window.getComputedStyle(html).getPropertyValue('--span'),
    liSelected: window.getComputedStyle(html).getPropertyValue('--li-selected'),
    bgResults: window.getComputedStyle(html).getPropertyValue('--bg-results'),
    textResults: window.getComputedStyle(html).getPropertyValue('--text-results'),
    light: window.getComputedStyle(html).getPropertyValue('--white'),
    selectImage: window.getComputedStyle(html).getPropertyValue('--select-image'),
    infoMap: window.getComputedStyle(html).getPropertyValue('--info-map'),
    backAside: window.getComputedStyle(html).getPropertyValue('--back-aside')
}

const darkMode = {
    bg: 'rgba(24, 24, 28, 1)',
    titleColor: 'rgba(255, 255, 255, 1)',
    primaryColor: 'rgba(52, 203, 121, 1)',
    darkColor: 'rgba(255, 255, 255, 1)',
    form: 'rgba(49, 49, 49, 0.5)',
    input: 'rgba(245, 245, 245, 1)',
    span: 'rgba(0, 0, 0, 1)',
    liSelected: 'rgba(210, 239, 222, 1)',
    bgResults: 'rgba(24, 24, 28, 1)',
    textResults: 'rgba(255, 255, 255, 1)',
    light: 'rgba(37, 37, 39, 1)',
    selectImage: 'rgba(255, 255, 255, 1)',
    infoMap: 'rgba(0, 0, 0, 0.8)',
    backAside: 'rgba(20, 20, 20, 0.8)'
}

const transformKey = key => '--' + key.replace(/([A-Z])/, '-$1').toLowerCase();

function changeColors(colors) {
    Object.keys(colors).map(function(key) {
        html.style.setProperty(transformKey(key), colors[key]);
    });
};

// Function responsible for changing colors
dark(check.value);

// Setting the chosen theme and changing the images
function dark(value) {
    if(value) {
        changeColors(darkMode); 
        if(images.logo) {
            images.logo.src = './assets/dark_mode/logo-dark.svg';
        }

        if(images.backHome) {
            images.backHome.style.backgroundImage ='url(./assets/dark_mode/home-background-dark.svg)';
        }

        if(images.pencilTool) {
            images.pencilTool.forEach(value => {
                value.src = './assets/dark_mode/pencil-dark.svg'
            });
        }
        
        if(images.upload) {
            images.upload.style.filter = 'opacity(1)';
            images.upload.src = './assets/dark_mode/picture-light.png'
        }
        
        if(borderMap) {
            borderMap.style.border = 0;
        }

    } else {
        changeColors(initialColors);
        if(images.logo) {
            images.logo.src = './assets/logo.svg';
        }
        
        if(images.backHome) {
            images.backHome.style.backgroundImage = 'url(./assets/home-background.svg)';
        }

        if(images.pencilTool) {
            images.pencilTool.forEach(value => {
                value.src = './assets/pencil-tool.svg'
            });
        }

        if(images.upload) {
            images.upload.style.filter = 'opacity(0.5)';
            images.upload.src = './assets/picture.png'
        }

        if(borderMap) {
            borderMap.style.border = '1px solid #DDE3F0';
        }
    } 
}


// // Dark Mode
// const html = document.querySelector('html');
// let check = JSON.parse(localStorage.getItem('darkMode'));
// const toggle = document.querySelector('#page-home .content header div');

// if(!check) {
//     localStorage.setItem('darkMode', JSON.stringify({
//         value: false
//     }));

//     check = JSON.parse(localStorage.getItem('darkMode'));
// }

// // Instantiates the Toggle component
// if(toggle) {
//     if(check.value) {
//         var checkbox = new Toggle({value: true});
//     } else {
//         var checkbox = new Toggle();
//     }
    
//     toggle.appendChild(checkbox.getView());
// }

// // Stores the current theme in LocalStorage
// if(checkbox) {
//     checkbox.setOnUpdateValue(function(value) {
//         if(localStorage.darkMode == null) {
//             localStorage.setItem('darkMode', JSON.stringify({
//                 value: value
//             }));
//         } else {
//             var check = JSON.parse(localStorage.getItem('darkMode'));
//             check.value = value;
//             localStorage.darkMode =  JSON.stringify(check);
//         }
//         dark(value);
//     });
// }

// // Altered images
// const images = {
//     logo: document.querySelector('header img'),
//     backHome: document.querySelector('body #page-home'),
//     pencilTool: document.querySelectorAll('.edit a img'),
//     upload: document.querySelector('.upload img')
// }

// const initialColors = {
//     bg: window.getComputedStyle(html).getPropertyValue('--bg'),
//     titleColor: window.getComputedStyle(html).getPropertyValue('--title-color'),
//     primaryColor: window.getComputedStyle(html).getPropertyValue('--primary-color'), 
//     darkColor: window.getComputedStyle(html).getPropertyValue('--dark-color'),
//     form: window.getComputedStyle(html).getPropertyValue('--form'),
//     input: window.getComputedStyle(html).getPropertyValue('--input'),
//     span: window.getComputedStyle(html).getPropertyValue('--span'),
//     liSelected: window.getComputedStyle(html).getPropertyValue('--li-selected'),
//     bgResults: window.getComputedStyle(html).getPropertyValue('--bg-results'),
//     textResults: window.getComputedStyle(html).getPropertyValue('--text-results'),
//     light: window.getComputedStyle(html).getPropertyValue('--white'),
//     selectImage: window.getComputedStyle(html).getPropertyValue('--select-image')
// }

// const darkMode = {
//     bg: 'rgba(24, 24, 28, 1)',
//     titleColor: 'rgba(255, 255, 255, 1)',
//     primaryColor: 'rgba(52, 203, 121, 1)',
//     darkColor: 'rgba(255, 255, 255, 1)',
//     form: 'rgba(49, 49, 49, 0.5)',
//     input: 'rgba(245, 245, 245, 1)',
//     span: 'rgba(0, 0, 0, 1)',
//     liSelected: 'rgba(210, 239, 222, 1)',
//     bgResults: 'rgba(24, 24, 28, 1)',
//     textResults: 'rgba(255, 255, 255, 1)',
//     light: 'rgba(37, 37, 39, 1)',
//     selectImage: 'rgba(255, 255, 255, 1)'
// }

// const transformKey = key => '--' + key.replace(/([A-Z])/, '-$1').toLowerCase();

// function changeColors(colors) {
//     Object.keys(colors).map(function(key) {
//         html.style.setProperty(transformKey(key), colors[key]);
//     });
// };

// // Function responsible for changing colors
// dark(check.value);

// // Setting the chosen theme and changing the images
// function dark(value) {
//     if(value) {
//         changeColors(darkMode); 
//         images.logo.src = './assets/dark_mode/logo-dark.svg';

//         if(images.backHome) {
//             images.backHome.style.backgroundImage ='url(./assets/dark_mode/home-background-dark.svg)';
//         }

//         if(images.pencilTool) {
//             images.pencilTool.forEach(value => {
//                 value.src = './assets/dark_mode/pencil-dark.svg'
//             });
//         }
        
//         if(images.upload) {
//             images.upload.style.filter = 'opacity(1)';
//             images.upload.src = './assets/dark_mode/picture-light.png'
//         }
        
//     } else {
//         changeColors(initialColors);
//         images.logo.src = './assets/logo.svg';
        
//         if(images.backHome) {
//             images.backHome.style.backgroundImage = 'url(./assets/home-background.svg)';
//         }

//         if(images.pencilTool) {
//             images.pencilTool.forEach(value => {
//                 value.src = './assets/pencil-tool.svg'
//             });
//         }

//         if(images.upload) {
//             images.upload.style.filter = 'opacity(0.5)';
//             images.upload.src = './assets/picture.png'
//         }
//     } 
// }