const span1 = document.querySelector('#is-webview-direct');
const span2 = document.querySelector('#is-webview');
const span3 = document.querySelector('#is-fullscreen');

const tests = document.querySelector('div#tests');
const iframeTests = document.querySelector('iframe#iframe-tests');

window.addEventListener('load', e => {
  iframeTests.style.height = tests.clientHeight + 'px';
});

const detector = new WebViewDetector();

span1.innerText = detector.isWebView(true);
span2.innerText = detector.isWebView(false);
span3.innerText = detector.isFullScreen();