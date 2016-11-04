window.Polymer = {
  lazyRegister: true,
  dom: 'shadow'
};

(function() {
  var onload = function() {
    if (!window.HTMLImports) {
      document.dispatchEvent(
        new CustomEvent('WebComponentsReady', {bubbles: true})
      );
    }
  };
  var webComponentsSupported = (
    'registerElement' in document
    && 'import' in document.createElement('link')
    && 'content' in document.createElement('template')
  );
  if (!webComponentsSupported) {
    var script = document.createElement('script');
    script.async = true;
    script.src = '/bower_components/webcomponentsjs/webcomponents-lite.min.js';
    script.onload = onload;
    document.head.appendChild(script);
  } else {
    onload();
  }
})();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js');
  });
}
