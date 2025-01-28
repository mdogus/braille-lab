const brailleCharMap = {
    'f,j,k': 'd',
    'f,k': 'e',
    'd,f,j': 'f',
    'd,f,j,k': 'g',
    'd,f,k': 'h',
    'd,j': 'i',
    'd,j,k': 'j',
    'f,j,l,s': 'x',
    'f,j,k,l': '?',
    'f,k,l': ':',
    'f,d,j,l': '$',
    'f,d,j,k,l': '}',
    'f,d,k,l': '|',
    'd,j,l': '{',
    'd,j,k,l': 'w', // 15
    'space': ' '
};

const brailleCharMapForHowTo = {
    'd': { 
        keyCombination: 'f,j,k', 
        dots: '[1-4-5]' 
    },
    'e': { 
        keyCombination: 'f,k', 
        dots: '[1-5]' 
    },
    'f': { 
        keyCombination: 'f,d,j', 
        dots: '[1-2-4]' 
    },
    'g': { 
        keyCombination: 'f,d,j,k', 
        dots: '[1-2-4-5]' 
    },
    'h': { 
        keyCombination: 'f,d,k', 
        dots: '[1-2-5]' 
    },
    'i': { 
        keyCombination: 'd,j', 
        dots: '[2-4]' 
    },
    'j': { 
        keyCombination: 'd,j,k', 
        dots: '[2-4-5]' 
    },
    'w': { 
        keyCombination: 'd,j,k,l', 
        dots: '[2-4-5-6]' 
    },
    'x': { 
        keyCombination: 'f,s,j,l', 
        dots: '[1-3-4-6]' 
    },
    ' ': { 
        keyCombination: 'boşluk', 
        dots: ' ' 
    }
};

export { brailleCharMap, brailleCharMapForHowTo };
