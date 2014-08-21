Keyboards['zh-Hans-Stroke'] = {
  label: 'Chinese - Simplified - Stroke',
  shortLabel: '笔',
  menuLabel: '笔画',
  needsCandidatePanel: true,
  //needsCommaKey: true,
  disableAlternateLayout: true, // Hide "12&"
  hidesSwitchKey: true,
  basicLayoutKey: '㇐㇑㇓',
  imEngine: 'jsstroke',
  types: ['text', 'url', 'email', 'number'],
  width: 12,
  textLayoutOverwrite: {
    ',': false,
    '.': false
  },
  alt: {
    '.': '.,?!;:',
    '。': '。，？！'
  },
  keys: [
  [{value:'㇐', keyCode: 104, ratio: 4},{value:'㇑',keyCode: 115,ratio: 4},{value:'㇓',keyCode: 112,ratio: 4}],
  [{value:'㇔', keyCode: 110, ratio: 4},{value:'㇜',keyCode:122, ratio: 4},{value:'通', keyCode: 333,ratio: 4}],
  [{value:'12&',  keyCode:-2  ,ratio: 4},{value:'。',className: 'alternate-indicator',  ratio: 4},{ value: '⌫', ratio: 4, keyCode: KeyEvent.DOM_VK_BACK_SPACE }],
  [
      {value:'笔画', className: 'switch-key alternate-indicator', keyCode: -3, ratio: 4},
      { value: '&nbsp', keyCode: KeyEvent.DOM_VK_SPACE, ratio: 4 },
      { value: '↵', ratio: 4, keyCode: KeyEvent.DOM_VK_RETURN }
    ]
  ],
  alternateLayout: {
    needsCommaKey: true,
    //disableAlternateLayout: true,
    //hidesSwitchKey: true,
    textLayoutOverwrite: {
      ',': '，',
      '.': '。'
    },
    //basicLayoutKey: '㇐㇑㇓',
    keys: [
      [
        { value: '1' }, { value: '2' }, { value: '3' } , { value: '4' },
        { value: '5' }, { value: '6' }, { value: '7' } , { value: '8' },
        { value: '9' }, { value: '0' }
      ], [
        { value: '？' }, { value: '！' }, { value: '：' }, { value: '；' },
        //ellipsis, keep unchanged?
        { value: '……', compositeKey: '……', className: 'pinyin-ch-ellipsis' },
        { value: '～' }, { value: '（' }, { value: '）' },
        { value: '“' }, { value: '”' }
      ], [
        { value: 'Alt', keyCode: KeyEvent.DOM_VK_ALT },
        { value: '<div class="zh-encode-switcher \
                              zh-encode-switcher-half">半</div> \
                  <div class="zh-encode-switcher \
                              zh-encode-switcher-selected">全</div>',
          keyCode: -31
        },
        { value: '、' }, { value: '＠' }, { value: '＆' }, { value: '＾' },
        { value: '＃' }, { value: '％' }, { value: '／' },
        { value: '⌫', keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        //{value:'㇐㇑㇓',  keyCode:-1  ,ratio: 1.8},
        //{value:'笔画', className: 'switch-key alternate-indicator', keyCode: -3, ratio: 1.8},
        { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ]
  },
  symbolLayout: {   // Chinese symbol 2
    needsCommaKey: true,
    //hidesSwitchKey: true,
    textLayoutOverwrite: {
      ',': '，',
      '.': '。'
    },
    //basicLayoutKey: '㇐㇑㇓',
    keys: [
      [
        { value: '1' }, { value: '2' }, { value: '3' } , { value: '4' },
        { value: '5' }, { value: '6' }, { value: '7' } , { value: '8' },
        { value: '9' }, { value: '0' }
      ], [
        { value: '＋' }, { value: '－' }, { value: '＿' }, { value: '＝' },
        { value: '＄' }, { value: '￥' }, { value: '《' }, { value: '》' },
        { value: '｛' }, { value: '｝' }
      ], [
        { value: 'Alt', keyCode: KeyEvent.DOM_VK_ALT },
        { value: '<div class="zh-encode-switcher \
                              zh-encode-switcher-half">半</div> \
                  <div class="zh-encode-switcher \
                              zh-encode-switcher-selected">全</div>',
          keyCode: -32
        },
        { value: '【' }, { value: '】' }, { value: '「' }, { value: '」' },
        { value: '＊' }, { value: '·' }, { value: '｜' },
        { value: '⌫', keyCode: KeyEvent.DOM_VK_BACK_SPACE }
      ], [
        //{value:'笔画', className: 'switch-key alternate-indicator', keyCode: -3, ratio: 2},
        { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
        { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
      ]
    ]
  }
};

Keyboards['zh-Hans-Stroke-Symbol-En-1'] = {
  needsCandidatePanel: true,
  needsCommaKey: true,
  //hidesSwitchKey: true,
  width: 10,
  basicLayoutKey: '㇐㇑㇓',
  keys: [
    [
      { value: '1' }, { value: '2' }, { value: '3' } , { value: '4' },
      { value: '5' }, { value: '6' }, { value: '7' } , { value: '8' },
      { value: '9' }, { value: '0' }
    ], [
      { value: '?' }, { value: '!' }, { value: ':' }, { value: ';' },
      { value: '…' }, { value: '~' }, { value: '(' }, { value: ')' },
      { value: '\'' }, { value: '"' }
    ], [
      { value: 'Alt', keyCode: -32 },
      { value: '<div class="zh-encode-switcher \
                            zh-encode-switcher-half \
                            zh-encode-switcher-selected">半</div> \
                <div class="zh-encode-switcher">全</div>',
        keyCode: -2
      },
      { value: '\\' }, { value: '@' }, { value: '&' }, { value: '^' },
      { value: '#' }, { value: '%' }, { value: '/' },
      { value: '⌫', keyCode: KeyEvent.DOM_VK_BACK_SPACE }
    ], [
      //{value:'笔画', className: 'switch-key alternate-indicator', keyCode: -3, ratio: 2},
      { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
      { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
    ]
  ]
};

Keyboards['zh-Hans-Stroke-Symbol-En-2'] = {
  needsCandidatePanel: true,
  needsCommaKey: true,
  //hidesSwitchKey: true,
  width: 10,
  basicLayoutKey: '㇐㇑㇓',
  keys: [
    [
      { value: '1' }, { value: '2' }, { value: '3' } , { value: '4' },
      { value: '5' }, { value: '6' }, { value: '7' } , { value: '8' },
      { value: '9' }, { value: '0' }
    ], [
      { value: '+' }, { value: '-' }, { value: '_' }, { value: '=' },
      { value: '$' }, { value: '¥' }, { value: '<' }, { value: '>' },
      { value: '{' }, { value: '}' }
    ], [
      { value: 'Alt', keyCode: -31 },
      { value: '<div class="zh-encode-switcher \
                            zh-encode-switcher-half \
                            zh-encode-switcher-selected">半</div> \
                <div class="zh-encode-switcher">全</div>',
        keyCode: -5
      },
      { value: '[' }, { value: ']' }, { value: '「' }, { value: '」' },
      { value: '*' }, { value: '`' }, { value: '|' },
      { value: '⌫', keyCode: KeyEvent.DOM_VK_BACK_SPACE }
    ], [
      //{value:'笔画', className: 'switch-key alternate-indicator', keyCode: -3, ratio: 2},
      { value: '&nbsp', ratio: 8, keyCode: KeyboardEvent.DOM_VK_SPACE },
      { value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN }
    ]
  ]
};
