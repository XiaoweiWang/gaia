'use strict';

var searchSingle;


//function initModule () {
 var Module = {
 
  _isReady: false,
 
  filePackagePrefixURL:'js/imes/jsstroke/',
   
  canvas: {},
   

  _main: function(){
    //console.log('hello');
    searchSingle=
      Module.cwrap('strokeSearchSearch','number',['string','number','number']);
    var strokesSearchInit=
      Module.cwrap('strokeSearchInit','',[]);
    strokesSearchInit();
    Module._isReady = true;
    console.log('engine is ready');
  },
  
  //searchSingle: function(){ console.log('no override!');},
  
  
  /*_initSearch: function(){
    var searchInit = Module.cwrap('strokeSearchInit','',[]);
    searchInit();
  },*/
  
    getResults: function(strokes, limit){
          //var searchSingle = Module.cwrap('strokeSearchSearch','number',['string','number','number']);
          
          // Create example data to test float_multiply_array
          var data = new Int32Array(limit);
          
          // Get data byte size, allocate memory on Emscripten heap, and get pointer
          var nDataBytes = data.length * data.BYTES_PER_ELEMENT;
          var dataPtr = Module._malloc(nDataBytes);
          
          // Copy data to Emscripten heap (directly accessed from Module.HEAPU8)
          var dataHeap = new Uint8Array(Module.HEAPU8.buffer, dataPtr, nDataBytes);
          dataHeap.set(new Uint8Array(data.buffer));
          
          // Call function and get result
          //var strokevalue = document.getElementById("strokeall").value;
          //testStrokeSearch (strokes,dataHeap.byteOffset);
          //searchInit();
          //this.searchSingle (strokes,limit,dataHeap.byteOffset);
          //var searchtest = Module.cwrap('strokeSearchSearch','number',['string','number','number']);
          //searchtest (strokes,limit,dataHeap.byteOffset);
          searchSingle(strokes,limit,dataHeap.byteOffset);
          var result = new Int32Array(dataHeap.buffer, dataHeap.byteOffset, data.length);
          console.log('resultlength:'+result.length);
          
          // Free memory
          //Module._free(dataHeap.byteOffset);
          
          //Module._searchSingle = searchSingle;
          console.log('finished search');
          return result;
          
    }
  };
  
  //HOW to import js?
  /*try {
   document.write('<script type="text/javascript" src = "engine_test.js"></script>');
  } catch (e) {
    console.log(e.toString());
  }*/
  

  
 (function () { 
//}

/* for non-Mozilla browsers */
if (!KeyEvent) {
  var KeyEvent = {
    DOM_VK_BACK_SPACE: 0x8,
    DOM_VK_RETURN: 0xd
  };
}

var IMEngineBase = function engineBase_constructor() { //？
  this._glue = {};
};

IMEngineBase.prototype = {  //prototype, some parts to be overrided, no modify here
  /**
   * Glue ojbect between the IMEngieBase and the IMEManager.
   */
  _glue: {
    /**
     * The source code path of the IMEngine
     * @type String
     */
    path: '', //need

    /**
     * Sends candidates to the IMEManager
     */
    sendCandidates: function(candidates) {}, //need

    /**
     * Sends pending symbols to the IMEManager.
     */
    sendPendingSymbols: function(symbols) {},  //need

    /**
     * Passes the clicked key to IMEManager for default action.
     * @param {number} keyCode The key code of an integer.
     */
    sendKey: function(keyCode) {},

    /**
     * Sends the input string to the IMEManager.
     * @param {String} str The input string.
     */
    sendString: function(str) {},

    /**
     * Change the keyboad
     * @param {String} keyboard The name of the keyboard.
     */
    alterKeyboard: function(keyboard) {}  //unsure?
  },

  /**
   * Initialization.
   * @param {Glue} glue Glue object of the IMManager.
   */
  init: function engineBase_init(glue) {
    this._glue = glue;
  },

  /**
   * Destruction.
   */
  uninit: function engineBase_uninit() {
  },

  /**
   * Notifies when a keyboard key is clicked.
   * @param {number} keyCode The key code of an integer number.
   */
  click: function engineBase_click(keyCode) {
  },

  /**
   * Notifies when pending symbols need be cleared
   */
  empty: function engineBase_empty() {
  },

  /**
   * Notifies when a candidate is selected.
   * @param {String} text The text of the candidate.
   * @param {Object} data User data of the candidate.
   */
  select: function engineBase_select(text, data) { //user data no need
  },

  /**
   * Notifies when the IM is shown
   */
  activate: function engineBase_activate(language, state, options) {
  },

  /**
   * Called when the keyboard is hidden
   */
  deactivate: function engineBase_deactivate() {
  }
};

var IMEngine = function engine_constructor() {  //constructor func?
  IMEngineBase.call(this);
};

IMEngine.prototype = {
  // Implements IMEngineBase
  __proto__: new IMEngineBase(),

  // Buffer limit will force output the longest matching terms
  // if the length of the syllables buffer is reached.
  _kBufferLenLimit: 51,

  // Remember the candidate length of last searching result because we don't
  // want to output all candidates at a time.
  // Set it to 0 when we don't need the candidates buffer anymore.
  _candidatesLength: 0,

  _workerTimeout: 600000,

  /**
   * The last selected text used to generate prediction.
   * @type string
   */
  _historyText: '',

  _pendingSymbols: '',
  _firstCandidate: '', 
  _keypressQueue: [],
  _isWorking: false,

  _isActive: false,
  _uninitTimer: null,

  _sendPendingSymbols: function engine_sendPendingSymbols() {//no need change alot, to show strokes

    if (this._pendingSymbols) {
      var self = this;
      var symbols = '';
      var len = this._pendingSymbols.length;
      for (var id = 0; id< len; id++){
        //var strokeSymb = this._pendingSymbols[id] +1;
        switch(this._pendingSymbols[id]){
        case 'h':
          symbols += '㇐';
          break;
        case 's':
          symbols += '㇑';
          break;
        case 'p':
          symbols += '㇓';
          break;
        case 'n':
          symbols += '㇔';
          break;
        case 'z':
          symbols += '㇜';
          break;
        case '?':
          symbols += '*';
          break;
        }
      }
      //self._glue.setComposition(self._pendingSymbols);
      self._glue.setComposition(symbols);

    } else {
      this._glue.endComposition();
    }
  },

  /**
   * Send candidates list.
   * @param {Array.<string>} candidates The candidates to be sent.
   * @return {void}  No return value.
   */
  _sendCandidates: function engine_sendCandidates(candidates) {  //ok
    var list = []; // hold candidates
    var len = candidates.length;
    for (var id = 0; id < len; id++) {
      var cand = String.fromCharCode(candidates[id]);
      if (id == 0) {
        this._firstCandidate = cand;
      }
      list.push([cand, id]);
    }

    this._glue.sendCandidates(list);//send candidates to list, set first candidate
  },

  _start: function engine_start() { //start engine? no modify
    if (this._isWorking)
      return;

    this._isWorking = true;
    this._next();
    console.log('started');
  },

  _next: function engine_next() {

    if (!this._keypressQueue.length) {
      this._isWorking = false;
      //
      //this.empty();
      return;
    }

    var code = this._keypressQueue.shift(); //shift: delete first element and return its value
    // We use keycode 65 to represent "'" for pinyin input method
    
    console.log('inputcode:'+code);
    var realCode =  (code == 333) ? 63 : code;

    if (code == 0) {
      // This is a select function operation.
      this._updateCandidatesAndSymbols(this._next.bind(this));
      return;
    }


    // Backspace - delete last input symbol if exists
    if (code === KeyEvent.DOM_VK_BACK_SPACE) {

      if (!this._pendingSymbols) {
        if (this._firstCandidate) {

          // prevent updateCandidateList from making the same suggestions
          this.empty();
        }

        // pass the key to IMEManager for default action
        this._glue.sendKey(realCode);
        this._next();
      } else {
        this._pendingSymbols = this._pendingSymbols.substring(0,
          this._pendingSymbols.length - 1);

        this._updateCandidatesAndSymbols(this._next.bind(this));
      }

      return;
    }

    // Select the first candidate if needed.
    if (code === KeyEvent.DOM_VK_RETURN ||
        !this._isStrokeKey(code) ||
        this._pendingSymbols.length >= this._kBufferLenLimit) {
      var sendKey = true;
      if (this._firstCandidate) {
        if (this._pendingSymbols) {
          // candidate list exists; output the first candidate
          this._glue.endComposition(this._firstCandidate);
          // no return here
          if (code === KeyEvent.DOM_VK_RETURN) {
            sendKey = false;
          }
        }
        this._sendCandidates([]);
      }

      //pass the key to IMEManager for default action
      this.empty();
      if (sendKey) {
        this._glue.sendKey(realCode);
      }
      this._next();
      return;
    }

    // add symbol to pendingSymbols
    this._appendNewSymbol(realCode);
    this._updateCandidatesAndSymbols(this._next.bind(this));
  },

  //stroke keys: h,s,p,n,z, and the code for vague search
  _isStrokeKey :function engine_isStrokeKey(code) {
    if( code===333||   code === 104 ||code ===110 || code===112 || code === 115 ||code ===122){
      return true;
    }
    
    return false;
  },
  
  _appendNewSymbol: function engine_appendNewSymbol(code) {
    var symbol = String.fromCharCode(code);
    this._pendingSymbols += symbol;
    console.log('appendsymbol:'+symbol);
  },

  _updateCandidatesAndSymbols: function engine_updateCandsAndSymbols(callback) {
    var self = this;
    this._updateCandidateList(function() {
      self._sendPendingSymbols();
      console.log('updatecandssymbols');
      callback();
    });
  },

  _updateCandidateList: function engine_updateCandidateList(callback) {

    var self = this;
    var numberOfCandidatesPerRow = this._glue.getNumberOfCandidatesPerRow ?
      this._glue.getNumberOfCandidatesPerRow() : Number.Infinity;

    this._candidatesLength = 0;

    if (!this._pendingSymbols) { // reserved for prediction
      // If there is no pending symbols, make prediction with the previous
      // select words.

        callback();
    } else {
      // Update the candidates list by the pending pinyin string.
      this._historyText = '';
      var candidates = Module.getResults(this._pendingSymbols,50);
      //var candidates = Module.getResults(this._pendingSymbols,numberOfCandidatesPerRow + 1);
      var num = candidates.length;
      /*for (var i=0;i<candidates.length;i++){
        candidates[i] = String.fromCharCode(candidates[i]);
      }*/
      //var candidates = Module.getResults(this._pendingSymbols,30);
      console.log('got results!'+'candsLen:'+num);
        if (num > numberOfCandidatesPerRow + 1)
          self._candidatesLength = num;
      self._sendCandidates(candidates);
      //self._sendCandidates(candidates.slice(0,numberOfCandidatesPerRow));
      callback();

      /*emEngineWrapper.post('im_search', { //parameters of im_search
        queryString: this._pendingSymbols,
        limit: numberOfCandidatesPerRow + 1
      }, function(returnValue) {
        var num = returnValue.length;
        var candidates = returnValue.results;

        if (num > numberOfCandidatesPerRow + 1)
          self._candidatesLength = num;

        self._sendCandidates(candidates);
        callback();
      });*/
    }
  },

  _alterKeyboard: function engine_changeKeyboard(keyboard) {
    this._resetKeypressQueue();
    this.empty();

    this._glue.alterKeyboard(keyboard);
  },
  
  _resetKeypressQueue: function engine_abortKeypressQueue() {
    this._keypressQueue = [];
    this._isWorking = false;
  },

  /**
   * Override
   */
  init: function engine_init(glue) {
    IMEngineBase.prototype.init.call(this, glue); 
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "js/imes/jsstroke/engine_test.js";
    document.body.appendChild(script);
  
    console.log('engine inited');
    
  },

  /**
   * Override
   */
  uninit: function engine_uninit() {
    IMEngineBase.prototype.uninit.call(this);

    if (this._uninitTimer) {
      clearTimeout(this._uninitTimer);
      this._uninitTimer = null;
    }

    /*if (emEngineWrapper.isReady())
      emEngineWrapper.uninit();*/

    this._resetKeypressQueue();
    this.empty();
  },

  /**
   *Override
   */
  click: function engine_click(keyCode) {
    IMEngineBase.prototype.click.call(this, keyCode);
    if(Module._isReady){
    //this._keypressQueue.push(keyCode);
      switch (keyCode) {
        case -31: // Switch to English Symbol Panel, Page 1
        case -32: // Switch to English Symbol Panel, Page 2
          var index = Math.abs(keyCode);
          var symbolPage = index % 10;
          this._alterKeyboard(
          'zh-Hans-Stroke-Symbol-En-' + symbolPage);
          break;
        default:
          this._keypressQueue.push(keyCode);
          break;
      }
    /*switch (keyCode) {
      default:
        this._keypressQueue.push(keyCode);
        break;
    }*/
    
    this._start(); //after click, start search
    }
    
  },

  /**
   * Override
   */
  select: function engine_select(text, data) {
    IMEngineBase.prototype.select.call(this, text, data);

    /*if (!emEngineWrapper.isReady())
      return;*/

    var self = this;
    var nextStep = function(text) {
      if (text) {
        if (self._pendingSymbols) {
          self._pendingSymbols = '';
          self._glue.endComposition(text);
        } else {
          self._glue.setComposition('');
          self._glue.endComposition(text);
        }
        self._historyText = text;
        self._candidatesLength = 0;
      }
      self._keypressQueue.push(0);
      self._start();
    };
    
    //if (!this._pendingSymbols){
    nextStep(text);
    //}
    
    this.empty();

    /*if (this._pendingSymbols) {
      emEngineWrapper.post('im_choose', {
        candId: parseInt(data)
      }, nextStep);
    } else {
      // A predication candidate is selected.
      nextStep(text);
    }*/
  },

  /**
   * Override
   */
  empty: function engine_empty() {
    IMEngineBase.prototype.empty.call(this);
    this._pendingSymbols = '';
    this._historyText = '';
    this._firstCandidate = '';
    this._sendPendingSymbols();
    this._sendCandidates([]);
    console.log('working area emptied');
  },

  /**
   * Override
   */
  activate: function engine_activate(language, state, options) {  //TBM
    IMEngineBase.prototype.activate.call(this, language, state, options);

    /*if (this._uninitTimer) {
      clearTimeout(this._uninitTimer);
      this._uninitTimer = null;
    }*/

    //var inputType = state.type;
    //debug('Activate. Input type: ' + inputType);
    var self = this;
    //initModule();
    self._start();

    /*if (!emEngineWrapper.isReady()) {
      var self = this;
      this._accessUserDict('load', null, function(byteArray) {
        emEngineWrapper.init(self._glue.path, byteArray, function(isOk) {
          if (isOk) {
            self._start();
          } else {
            debug('emEngineWrapper initialize failed!!');
          }
        });
      });
    } else {
      emEngineWrapper.post('im_flush_cache', {}, null);
    }*/
    

    this._isActive = true;
    console.log('engine activated');
  },

  /**
   * Override
   */
  deactivate: function engine_deactivate() { //TBM
    IMEngineBase.prototype.deactivate.call(this);

    if (!this._isActive){
      return;
    }
   // if (this._pendingSymbols  && this._firstCandidate) {
      //this._glue.endComposition(this._firstCandidate);
   //   this._sendCandidates([]);
      //this._glue.sendString(this._firstCandidate);
   //   console.log('send first candidate when deactivate');
   // }
    

    this._isActive = false;

    this._resetKeypressQueue();
    this.empty();
    console.log('engine deactivated');
  },

  getMoreCandidates: function engine_getMore(indicator, maxCount, callback) {
    if (this._candidatesLength == 0) {
    console.log('getMoreCandidates:nocandidates');
      callback(null);
      return;
    }
    //var numberOfCandidatesPerRow = this._glue.getNumberOfCandidatesPerRow ?this._glue.getNumberOfCandidatesPerRow() : Number.Infinity;
    var num = this._candidatesLength;
    maxCount = Math.min((maxCount || num) + indicator, num);
    var results = Module.getResults(this._pendingSymbols,maxCount);
    console.log('morecandidiates:resultslength:'+results.length);

    //var msgId = this._pendingSymbols ? 'im_get_candidates' : 'im_get_predicts';

    //emEngineWrapper.post(msgId, {
    //  start: indicator,
    //  count: maxCount
    //}, function(results) {
      var len = results.length;
      var list = [];
      for (var i = 7; i < len; i++) {
        list.push([String.fromCharCode(results[i]), i + indicator]);
      }
      callback(list);
    //});
  }
  
};

var jsstroke = new IMEngine();

// Expose jspinyin as an AMD module
if (typeof define === 'function' && define.amd)
  define('jsstroke', [], function() { return jsstroke; });

// Expose the engine to the Gaia keyboard
if (typeof InputMethods !== 'undefined') {
  InputMethods.jsstroke = jsstroke;
}



})();