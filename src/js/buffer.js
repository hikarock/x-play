
function BufferLoader(context, urlList, callback) {
  this.context    = context;
  this.urlList    = urlList;
  this.onload     = callback;
  this.bufferList = [];
  this.loadCount  = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {

  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  var loader = this;

  request.onload = function() {
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          console.error('error decoding file data: ' + url);
          return;
        }
        var len = 0;
        for (var j in loader.urlList) {
          len++;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == len) {
          loader.onload(loader.bufferList);
        }
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  };

  request.onerror = function() {
    console.error('BufferLoader: XHR error');
  };

  request.send();
};

BufferLoader.prototype.load = function() {
  for (var i in this.urlList) {
    this.loadBuffer(this.urlList[i], i);
  }
};
