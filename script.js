const span1 = document.querySelector('#is-webview');
const span2 = document.querySelector('#is-fullscreen');

const tests = document.querySelector('div#tests');
const iframeTests = document.querySelector('iframe#iframe-tests');

window.addEventListener('load', e => {
  if (iframeTests) {
    iframeTests.style.height = tests.clientHeight + 'px';
  }
});

const detector = new WebViewDetector();

span1.innerText = detector.isWebView();
span2.innerText = detector.isFullScreen();
