class ReplitWebviewDetector {
  maxParentWindows = 100;

  isWebview() {
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

  // for backwards-compatibility
  isWebView() {
    return this.isWebview();
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

// for backwards-compatibility
const WebViewDetector = ReplitWebviewDetector;
