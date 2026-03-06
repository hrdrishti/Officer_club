/* ══ PAGE PROTECTION SCRIPT ══
   Disables right-click, text selection, and common DevTools shortcuts.
   Note: Browsers cannot be fully prevented from opening DevTools via F12,
   but we block view-source, Ctrl+U, and minimize usability of DevTools.
*/

(function () {
    'use strict';

    /* 1. Block right-click context menu */
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        return false;
    });

    /* 2. Disable text selection site-wide */
    document.addEventListener('selectstart', function (e) {
        e.preventDefault();
        return false;
    });

    /* 3. Block keyboard shortcuts */
    document.addEventListener('keydown', function (e) {
        var key = e.keyCode || e.which;

        // F12
        if (key === 123) {
            e.preventDefault();
            return false;
        }
        // Ctrl+U (view source)
        if (e.ctrlKey && key === 85) {
            e.preventDefault();
            return false;
        }
        // Ctrl+S (save page)
        if (e.ctrlKey && key === 83) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+I (DevTools)
        if (e.ctrlKey && e.shiftKey && key === 73) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && key === 74) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+C (Inspector)
        if (e.ctrlKey && e.shiftKey && key === 67) {
            e.preventDefault();
            return false;
        }
        // Ctrl+A (select all) - optional, keep if you want
        // if (e.ctrlKey && key === 65) { e.preventDefault(); return false; }
    });

    /* 4. DevTools open detection via window size difference.
          When DevTools are docked on the side, window.outerWidth - window.innerWidth > 100.
          When docked on the bottom, outerHeight - innerHeight > 100.
          On detection, redirect to login or show a blank overlay.
    */
    var devtoolsOpen = false;
    var threshold = 160;

    function detectDevTools() {
        var widthDiff = window.outerWidth - window.innerWidth;
        var heightDiff = window.outerHeight - window.innerHeight;
        if (widthDiff > threshold || heightDiff > threshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                // Show blocking overlay
                var overlay = document.getElementById('__protect_overlay__');
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.id = '__protect_overlay__';
                    overlay.style.cssText = [
                        'position:fixed', 'top:0', 'left:0', 'width:100vw', 'height:100vh',
                        'background:#0a0a0a', 'z-index:999999', 'display:flex',
                        'align-items:center', 'justify-content:center',
                        'flex-direction:column', 'gap:1rem'
                    ].join(';');
                    overlay.innerHTML = [
                        '<div style="font-size:3rem;">🔒</div>',
                        '<p style="color:#fff;font-family:sans-serif;font-size:1.1rem;margin:0;">',
                        'Access Restricted. Please close developer tools.',
                        '</p>'
                    ].join('');
                    document.body.appendChild(overlay);
                } else {
                    overlay.style.display = 'flex';
                }
            }
        } else {
            if (devtoolsOpen) {
                devtoolsOpen = false;
                var overlay = document.getElementById('__protect_overlay__');
                if (overlay) overlay.style.display = 'none';
            }
        }
    }

    // Check every second
    setInterval(detectDevTools, 1000);

    /* 5. Disable drag to prevent image/content dragging */
    document.addEventListener('dragstart', function (e) {
        e.preventDefault();
        return false;
    });

})();
