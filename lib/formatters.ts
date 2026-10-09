/**
 * HTML, CSS, and JS formatter & bundler utilities
 */

export function bundleCode(
  html: string,
  css: string,
  js: string,
  title: string = 'HTML Previewer Document'
): string {
  const hasDocType = /<!DOCTYPE\s+html/i.test(html);
  const hasHtml = /<html[^>]*>/i.test(html);
  const hasHead = /<head[^>]*>/i.test(html);
  const hasBody = /<body[^>]*>/i.test(html);
  const hasViewport = /<meta\s+[^>]*name=["']viewport["'][^>]*>/i.test(html);

  const viewportTag = hasViewport
    ? ''
    : '<meta name="viewport" content="width=device-width, initial-scale=1.0">';

  const userStyleTag = css.trim() ? `<style>\n${css}\n</style>` : '';
  const userScriptTag = js.trim() ? `<script>\n${js}\n</script>` : '';

  if (hasHtml || hasHead || hasBody || hasDocType) {
    let result = html;

    if (!hasDocType) {
      result = `<!DOCTYPE html>\n${result}`;
    }

    if (hasHead) {
      if (!hasViewport) {
        result = result.replace(/<head[^>]*>/i, `$&  ${viewportTag}\n`);
      }
      if (userStyleTag) {
        result = result.replace(/<\/head>/i, `  ${userStyleTag}\n</head>`);
      }
    } else if (hasHtml) {
      result = result.replace(
        /<html[^>]*>/i,
        `$&<head>\n  <meta charset="UTF-8">\n  ${viewportTag}\n  <title>${title}</title>\n  ${userStyleTag}\n</head>`
      );
    } else {
      result = `<head>\n  <meta charset="UTF-8">\n  ${viewportTag}\n  <title>${title}</title>\n  ${userStyleTag}\n</head>\n${result}`;
    }

    if (userScriptTag) {
      if (/<\/body>/i.test(result)) {
        result = result.replace(/<\/body>/i, `  ${userScriptTag}\n</body>`);
      } else {
        result = `${result}\n${userScriptTag}`;
      }
    }

    if (!hasHtml) {
      result = `<html lang="en">\n${result}\n</html>`;
    }

    return result;
  }

  // Construct full HTML5 document
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
    }
    html, body {
      width: 100%;
      min-height: 100%;
      margin: 0;
      padding: 0;
    }
${css.trim() ? css : '/* Add styles here */'}
  </style>
</head>
<body>
${html.trim()}

  <script>
${js.trim() ? js : '// JavaScript code'}
  </script>
</body>
</html>`;
}

/**
 * Creates sandbox document with interceptor for console and uncaught errors
 */
export function createSandboxDocument(html: string, css: string, js: string): string {
  const consoleInterceptor = `
  <script>
    (function() {
      function send(type, args) {
        try {
          var serialized = Array.from(args).map(function(arg) {
            if (arg === null) return 'null';
            if (arg === undefined) return 'undefined';
            if (typeof arg === 'object') {
              try { return JSON.stringify(arg, null, 2); }
              catch(e) { return String(arg); }
            }
            return String(arg);
          }).join(' ');
          window.parent.postMessage({
            source: 'html-previewer-console',
            type: type,
            message: serialized,
            timestamp: new Date().toLocaleTimeString()
          }, '*');
        } catch(e) {}
      }

      var _log = console.log;
      var _warn = console.warn;
      var _error = console.error;
      var _info = console.info;

      console.log = function() { send('log', arguments); if (_log) _log.apply(console, arguments); };
      console.warn = function() { send('warn', arguments); if (_warn) _warn.apply(console, arguments); };
      console.error = function() { send('error', arguments); if (_error) _error.apply(console, arguments); };
      console.info = function() { send('info', arguments); if (_info) _info.apply(console, arguments); };

      window.onerror = function(msg, url, line) {
        send('error', ['Error: ' + msg + (line ? ' (Line ' + line + ')' : '')]);
        return false;
      };

      window.addEventListener('unhandledrejection', function(event) {
        send('error', ['Unhandled Promise Rejection: ' + (event.reason ? (event.reason.message || event.reason) : 'Unknown')]);
      });
    })();
  </script>`;

  const userStylesTag = css.trim() ? `<style id="preview-user-styles">\n${css}\n</style>` : '';

  const userScriptTag = `
  <script id="preview-user-script">
    try {
      ${js}
    } catch(err) {
      console.error(err.message || String(err));
    }
  </script>`;

  const hasDocType = /<!DOCTYPE\s+html/i.test(html);
  const hasHtml = /<html[^>]*>/i.test(html);
  const hasHead = /<head[^>]*>/i.test(html);
  const hasBody = /<body[^>]*>/i.test(html);
  const hasViewport = /<meta\s+[^>]*name=["']viewport["'][^>]*>/i.test(html);

  const viewportMetaTag = hasViewport
    ? ''
    : '<meta name="viewport" content="width=device-width, initial-scale=1.0">';

  // If user provided an HTML structure with html/head/body
  if (hasHtml || hasHead || hasBody) {
    let doc = html;

    // Inject into head
    if (hasHead) {
      if (!hasViewport) {
        doc = doc.replace(/<head[^>]*>/i, `$&  ${viewportMetaTag}\n`);
      }
      doc = doc.replace(/<\/head>/i, `  ${consoleInterceptor}\n  ${userStylesTag}\n</head>`);
    } else if (hasHtml) {
      doc = doc.replace(
        /<html[^>]*>/i,
        `$&<head>\n  <meta charset="UTF-8">\n  ${viewportMetaTag}\n  ${consoleInterceptor}\n  ${userStylesTag}\n</head>`
      );
    } else {
      doc = `<head>\n  <meta charset="UTF-8">\n  ${viewportMetaTag}\n  ${consoleInterceptor}\n  ${userStylesTag}\n</head>\n${doc}`;
    }

    // Inject into body
    if (/<\/body>/i.test(doc)) {
      doc = doc.replace(/<\/body>/i, `  ${userScriptTag}\n</body>`);
    } else {
      doc = `${doc}\n${userScriptTag}`;
    }

    if (!hasHtml) {
      doc = `<html lang="en">\n${doc}\n</html>`;
    }

    if (!hasDocType) {
      doc = `<!DOCTYPE html>\n${doc}`;
    }

    return doc;
  }

  // HTML Fragment: wrap in standard full HTML5 document without altering styling
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${consoleInterceptor}
  ${userStylesTag}
</head>
<body>
${html}
${userScriptTag}
</body>
</html>`;
}

/**
 * Extracts <style> and <script> contents from an imported HTML string
 */
export function extractCode(rawHtml: string): { html: string; css: string; js: string } {
  let css = '';
  let js = '';
  let cleanHtml = rawHtml;

  // Extract <style>
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let matchStyle: RegExpExecArray | null;
  while ((matchStyle = styleRegex.exec(rawHtml)) !== null) {
    if (matchStyle[1].trim()) {
      css += (css ? '\n\n' : '') + matchStyle[1].trim();
    }
  }
  cleanHtml = cleanHtml.replace(styleRegex, '');

  // Extract <script> (only inline scripts, not external src)
  const scriptRegex = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
  let matchScript: RegExpExecArray | null;
  while ((matchScript = scriptRegex.exec(rawHtml)) !== null) {
    if (matchScript[1].trim()) {
      js += (js ? '\n\n' : '') + matchScript[1].trim();
    }
  }
  cleanHtml = cleanHtml.replace(scriptRegex, '');

  // Extract inside body if present to keep HTML clean in editor
  const bodyMatch = /<body[^>]*>([\s\S]*?)<\/body>/i.exec(cleanHtml);
  if (bodyMatch && bodyMatch[1].trim()) {
    cleanHtml = bodyMatch[1].trim();
  } else {
    // strip <!DOCTYPE>, <html>, <head> if empty
    cleanHtml = cleanHtml
      .replace(/<!DOCTYPE[^>]*>/gi, '')
      .replace(/<html[^>]*>/gi, '')
      .replace(/<\/html>/gi, '')
      .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '')
      .trim();
  }

  return {
    html: cleanHtml.trim(),
    css: css.trim(),
    js: js.trim(),
  };
}

/**
 * Simple, robust indentation formatter for HTML
 */
export function formatHTML(html: string): string {
  let formatted = '';
  let indent = 0;
  const tab = '  ';

  // Normalize lines and tokenize tags
  const tokens = html
    .replace(/>\s*</g, '><')
    .replace(/</g, '\n<')
    .replace(/>/g, '>\n')
    .split('\n')
    .map(t => t.trim())
    .filter(Boolean);

  const voidTags = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
    'link', 'meta', 'param', 'source', 'track', 'wbr'
  ]);

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.startsWith('</')) {
      indent = Math.max(0, indent - 1);
      formatted += tab.repeat(indent) + token + '\n';
    } else if (token.startsWith('<') && !token.startsWith('<!')) {
      const tagNameMatch = token.match(/^<([a-zA-Z0-9]+)/);
      const tagName = tagNameMatch ? tagNameMatch[1].toLowerCase() : '';
      const isSelfClosing = token.endsWith('/>') || voidTags.has(tagName);

      formatted += tab.repeat(indent) + token + '\n';
      if (!isSelfClosing) {
        indent++;
      }
    } else {
      // Text node
      formatted += tab.repeat(indent) + token + '\n';
    }
  }

  return formatted.trim();
}

/**
 * Clean indentation formatter for CSS
 */
export function formatCSS(css: string): string {
  let formatted = '';
  let indent = 0;
  const tab = '  ';

  const lines = css
    .replace(/\{/g, ' {\n')
    .replace(/\}/g, '\n}\n')
    .replace(/;/g, ';\n')
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);

  for (const line of lines) {
    if (line === '}') {
      indent = Math.max(0, indent - 1);
      formatted += tab.repeat(indent) + line + '\n\n';
    } else if (line.endsWith('{')) {
      formatted += tab.repeat(indent) + line + '\n';
      indent++;
    } else {
      formatted += tab.repeat(indent) + line + '\n';
    }
  }

  return formatted.trim();
}

/**
 * Clean formatter for JS
 */
export function formatJS(js: string): string {
  let formatted = '';
  let indent = 0;
  const tab = '  ';

  const lines = js
    .replace(/\{/g, ' {\n')
    .replace(/\}/g, '\n}\n')
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);

  for (const line of lines) {
    if (line.startsWith('}')) {
      indent = Math.max(0, indent - 1);
    }
    formatted += tab.repeat(indent) + line + '\n';
    if (line.endsWith('{')) {
      indent++;
    }
  }

  return formatted.trim();
}

/**
 * Triggers a native file download in the browser
 */
export function downloadFile(content: string, filename: string, mimeType: string = 'text/html') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
