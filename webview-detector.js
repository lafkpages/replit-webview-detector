class WebViewDetector {
  maxParentWindows = 100;

  isWebView() {
    if (this.isFullScreen()) {
      return false;
    }

    const windows = [window];

    while (true) {
      try {
        const lastWindow = windows[windows.length - 1];
        const newWindow = lastWindow.parent;

        if (lastWindow === newWindow) {
          break;
        }

        if (windows.length > this.maxParentWindows) {
          break;
        }

        windows.push(newWindow);
      } catch {
        break;
      }
    }

    for (const window of windows) {
      let parentIsWrapper = false;
      try {
        if (window.parent.location.pathname == '/__replco/devtools_wrapper.html') {
          parentIsWrapper = true;
        }
      } catch {}

      if (parentIsWrapper && window.location.origin.endsWith('.replit.dev')) {
        return true;
      }
    }

    return false;
  }

  isFullScreen() {
    try {
      if (window.top === window) {
        return true;
      }
    } catch {}

    return false;
  }
}