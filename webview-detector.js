class WebViewDetector {
  constructor() {
    
  }

  isWebView(direct = false) {
    // if direct, will only return true if the direct parent is a webview
    // if not, it will detect webviews in higher levels

    // if localstorage is accesible, cannot be in webview
    try {
      localStorage;
      return false;
    } catch (err) {
      // if not accessible, may be due to webview
      // OR cookie settings, so must continue checking
    }

    // if replit is in ancestor origins, is in webview
    // only if not direct, because if not direct, should
    // return false but this might make it true
    if (!direct)
      if (window.location.ancestorOrigins.contains('https://replit.com') || window.location.ancestorOrigins.contains('http://replit.com'))
        return true;

    let pathsToCheck = [window.location.pathname];

    try {
      pathsToCheck.push(window.top.location.pathname);
    } catch (err) {  }

    if (direct) {
      try {
        pathsToCheck.push(window.parent.location.pathname);
      } catch (err) {  }
    } else {
      let topParent = window;
      while (true) {
        try {
          const current = topParent.parent;

          if (topParent == current) {
            break;
          } else {
            topParent = current;
            pathsToCheck.push(topParent.location.pathname);
          }
        } catch (err) {
          
        }
      }
    }

    for (const path of pathsToCheck) {
      if (path == '/__devtools_wrapper.html')
        return true;
    }

    return false;
  }

  isFullScreen() {
    // if isn't in webview, URL matches fullscreen, is not in an iframe
    // and has no ancestor origins, then is fullscreen
    if ((!this.isWebView()) && /^(?:([^.\/]+)(\.|--))?[^.\/]+\.repl\.co$/i.test(window.location.hostname) && (!frameElement) && window.location.ancestorOrigins.length === 0)
      return true;
    return false;
  }
}