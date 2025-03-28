(function () {
  // Function to check if the user's language is set to Italian
  function isItalianUser() {
    const userLanguage = navigator.language || navigator.userLanguage || "";
    const languagesList = navigator.languages || [];

    // Check primary language
    if (userLanguage.toLowerCase().startsWith("it")) {
      return true;
    }

    // Check if Italian is in the first 2 preferred languages
    return languagesList
      .slice(0, 2)
      .some((lang) => lang.toLowerCase().startsWith("it"));
  }

  // Function to block the website
  function blockWebsite() {
    // Create blocking style
    const blockingStyle = document.createElement("style");
    blockingStyle.id = "italian-blocker";
    blockingStyle.textContent = `
            html, body, body * {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
            }

            html::after {
                content: '';
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #ffffff;
                z-index: 2147483647;
            }
        `;

    // Apply blocking immediately
    document.head.appendChild(blockingStyle);

    // Stop any further resource loading
    window.stop();

    // Clear body content
    const clearBody = () => {
      document.body.innerHTML = "";
      document.body.style.display = "none";
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", clearBody);
    } else {
      clearBody();
    }

    // Prevent any attempts to remove the blocking style
    const observer = new MutationObserver(() => {
      if (!document.getElementById("italian-blocker")) {
        document.head.appendChild(blockingStyle);
      }
    });

    observer.observe(document.head, {
      childList: true,
      subtree: true,
    });
  }

  // Check and block if Italian user
  if (isItalianUser()) {
    blockWebsite();
  }
})();
