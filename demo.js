// Function to check if the user's language is set to Italian
// Copied from italianBlocker.js for specific demo blocking
function isItalianUserDemo() {
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

var app = new Vue({
  el: "#app",
  data() {
    return {
      protocol: "https://",
      url: "www.apple.com",
      aiPrompt: "What's on this page?",
      aiAnalysis: null,
      loading: false,
      loaded: false,
      waiting: false,
      waitMessage:
        "Please wait while we capture the screenshot and analyze it...",
      captchaToken: null,
      captchaError: null,
      ep: [
        "https://0lkdyh572d.execute-api.us-west-2.amazonaws.com/public/gs-demo-v2",
        "?url=",
        "&height=1280&aiprompt=",
      ],
    };
  },

  methods: {
    getImageAndAnalyze() {
      // <<< ADD CHECK HERE >>>
      if (isItalianUserDemo()) {
        alert("Functionality not available in your region.");
        return; // Stop execution if Italian user
      }
      // <<< END CHECK >>>

      // Verify CAPTCHA
      if (!this.captchaToken) {
        alert("Please complete the CAPTCHA verification");
        return;
      }

      // Obfuscated URL shortener detection
      let fullUrl = this.url;
      if (!fullUrl.includes("http://") && !fullUrl.includes("https://")) {
        fullUrl = this.protocol + this.url;
      } else {
        this.protocol = fullUrl.startsWith("https://") ? "https://" : "http://";
        this.url = fullUrl.replace(this.protocol, "");
      }

      // Obfuscated check
      const _0x5f = atob(
        "dGlueXVybC5jb218Yml0Lmx5fHQuY298Z29vLmdsfHRpbnkuY2N8aXMuZ2R8Y2xpY2ttZS50b3xzaG9ydHVybC5hdHxyYi5neXxvdy5seXx0bnkuaW18Y3V0dC5seXx0ci5pbXx4LmNvfGJ1ZmYubHl8cmVicmFuZC5seXxzaG9ydC5pb3xibC5pbms="
      ).split("|");
      const _0x7d = fullUrl.toLowerCase();
      for (let i = 0; i < _0x5f.length; i++) {
        if (_0x7d.indexOf(_0x5f[i]) !== -1) {
          alert(
            atob(
              "U29ycnksIHdlIGNhbid0IHNjcmVlbnNob3QgdGhhdCByZXNvdXJjZS4gVHJ5IHdpdGggYSBkaWZmZXJlbnQgVVJM"
            )
          );
          return;
        }
      }

      this.loading = true;
      this.waiting = true;
      this.aiAnalysis = null;

      const de = this.ep[0] + this.ep[1] + fullUrl + this.ep[2];

      // Option 1: Using fetch instead of axios
      fetch(de + encodeURIComponent(this.aiPrompt), {
        method: "GET",
        headers: {
          "x-cf-turnstile-response": this.captchaToken,
        },
        mode: "cors",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          this.result = data.screenshotImage;
          this.aiAnalysis = data.aiAnalysis;
          // Reset CAPTCHA after successful submission
          if (window.turnstile) {
            window.turnstile.reset();
          }
          this.captchaToken = null;
        })
        .catch((error) => {
          console.log(error);
          if (
            error.message &&
            (error.message.includes("CORS") || error.name === "TypeError")
          ) {
            alert(
              "CORS error: Try adding a proxy or checking the API Gateway CORS configuration"
            );
          } else {
            this.errored = true;
          }
          // Reset CAPTCHA on error too
          if (window.turnstile) {
            window.turnstile.reset();
          }
          this.captchaToken = null;
        })
        .finally(() => {
          this.loading = false;
          this.loaded = true;
          this.waiting = false;
        });

      /* Option 2: If the above doesn't work, uncomment this
      axios
        .get(de + encodeURIComponent(this.aiPrompt), {
          // Remove invalid crossdomain option
          headers: {
            "x-cf-turnstile-response": this.captchaToken,
          }
        })
      */

      /* Option 3: If both options above don't work, 
         you could create a CORS proxy on your own server */
    },

    restartDemo() {
      this.protocol = "https://";
      this.url = "www.apple.com";
      this.aiPrompt = "What's on this page?";
      this.result = null;
      this.aiAnalysis = null;
      this.loading = false;
      this.loaded = false;
      this.waiting = false;
      this.captchaToken = null;
      this.captchaError = null;
      // Reset CAPTCHA widget
      if (window.turnstile) {
        window.turnstile.reset();
      }
    },
  },
  mounted() {
    // Define global CAPTCHA callback function
    window.turnstileCallback = (token) => {
      this.captchaToken = token;
      this.captchaError = null;
      console.log("CAPTCHA verified successfully");
    };

    // Error callback function
    window.turnstileErrorCallback = (error) => {
      console.error("CAPTCHA error:", error);
      this.captchaError = "Error verifying CAPTCHA. Please try again.";
      this.captchaToken = null;
    };
  },
});
