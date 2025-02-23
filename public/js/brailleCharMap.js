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
    "a": {
        "character": "a",
        "dots": "1",
        "keyCombination": "f"
    },
    "b": {
        "character": "b",
        "dots": "1_2",
        "keyCombination": "f_d"
    },
    "c": {
        "character": "c",
        "dots": "1_4",
        "keyCombination": "f_j"
    },
    "ç": {
        "character": "*",
        "dots": "1_6",
        "keyCombination": "f_l"
    },
    "d": {
        "character": "d",
        "dots": "1_4_5",
        "keyCombination": "f_j_k"
    },
    "e": {
        "character": "e",
        "dots": "1_5",
        "keyCombination": "f_k"
    },
    "f": {
        "character": "f",
        "dots": "1_2_4",
        "keyCombination": "f_d_j"
    },
    "g": {
        "character": "g",
        "dots": "1_2_4_5",
        "keyCombination": "f_d_j_k"
    },
    "h": {
        "character": "h",
        "dots": "1_2_5",
        "keyCombination": "f_d_k"
    },
    "i": {
        "character": "i",
        "dots": "2_4",
        "keyCombination": "d_j"
    },
    "j": {
        "character": "j",
        "dots": "_ 2_4_5",
        "keyCombination": "j_k"
    },
    "k": {
        "character": "k",
        "dots": "1_3",
        "keyCombination": "f_s"
    },
    "l": {
        "character": "l",
        "dots": "1_2_3",
        "keyCombination": "f_d_s"
    },
    "m": {
        "character": "m",
        "dots": "1_3_4",
        "keyCombination": "f_s_j"
    },
    "n": {
        "character": "n",
        "dots": "1_3_4_5",
        "keyCombination": "f_s_j_k"
    },
    "o": {
        "character": "o",
        "dots": "1_3_5",
        "keyCombination": "f_s_k"
    },
    "p": {
        "character": "p",
        "dots": "1_2_3_4",
        "keyCombination": "f_d_s_j"
    },
    "q": {
        "character": "q",
        "dots": "1_2_3_4_5",
        "keyCombination": "f_d_s_j_k"
    },
    "r": {
        "character": "r",
        "dots": "1_2_3_5",
        "keyCombination": "f_d_s_k"
    },
    "s": {
        "character": "s",
        "dots": "2_3_4",
        "keyCombination": "d_s_j"
    },
    "t": {
        "character": "t",
        "dots": "2_3_4_5",
        "keyCombination": "d_s_j_k"
    },
    "u": {
        "character": "u",
        "dots": "1_3_6",
        "keyCombination": "f_s_l"
    },
    "v": {
        "character": "v",
        "dots": "1_2_3_6",
        "keyCombination": "f_d_s_l"
    },
    "w": {
        "character": "w",
        "dots": "2_4_5_6",
        "keyCombination": "d_j_k_l"
    },
    "x": {
        "character": "x",
        "dots": "1_3_4_6",
        "keyCombination": "f_s_j_l"
    },
    "y": {
        "character": "y",
        "dots": "1_3_4_5_6",
        "keyCombination": "f_s_j_l"
    },
    "z": {
        "character": "z",
        "dots": "1_3_5_6",
        "keyCombination": "f_s_k_l"
     }
};

export { brailleCharMap, brailleCharMapForHowTo };
