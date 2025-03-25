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
      ep: [
        "aHR0cHM6Ly8wbGtkeWg1NzJkLmV4ZWN1dGUtYXBpLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tL3B1YmxpYy9nZXQtc2NyZWVuc2hvdC1kZW1v",
        "?url=",
        "&height=1280&aiprompt=",
      ],
    };
  },

  methods: {
    getImageAndAnalyze() {
      // Obfuscated URL shortener detection
      const _0x4e7d = [
        "\x64\x65\x63\x6F\x64\x65",
        "\x66\x72\x6F\x6D\x43\x68\x61\x72\x43\x6F\x64\x65",
        "\x74\x69\x6E\x79\x75\x72\x6C\x2E\x63\x6F\x6D\x7C\x62\x69\x74\x2E\x6C\x79\x7C\x74\x2E\x63\x6F\x7C\x67\x6F\x6F\x2E\x67\x6C\x7C\x74\x69\x6E\x79\x2E\x63\x63\x7C\x69\x73\x2E\x67\x64\x7C\x63\x6C\x69\x63\x6B\x6D\x65\x2E\x74\x6F\x7C\x73\x68\x6F\x72\x74\x75\x72\x6C\x2E\x61\x74\x7C\x72\x62\x2E\x67\x79\x7C\x6F\x77\x2E\x6C\x79\x7C\x74\x6E\x79\x2E\x69\x6D\x7C\x63\x75\x74\x74\x2E\x6C\x79\x7C\x74\x72\x2E\x69\x6D\x7C\x78\x2E\x63\x6F\x7C\x62\x75\x66\x66\x2E\x6C\x79\x7C\x72\x65\x62\x72\x61\x6E\x64\x2E\x6C\x79\x7C\x73\x68\x6F\x72\x74\x2E\x69\x6F\x7C\x62\x6C\x2E\x69\x6E\x6B",
        "\x73\x70\x6C\x69\x74",
        "\x6C\x6F\x77\x65\x72\x43\x61\x73\x65",
        "\x69\x6E\x63\x6C\x75\x64\x65\x73",
        "\x53\x6F\x72\x72\x79\x2C\x20\x77\x65\x20\x63\x61\x6E\x27\x74\x20\x73\x63\x72\x65\x65\x6E\x73\x68\x6F\x74\x20\x74\x68\x61\x74\x20\x72\x65\x73\x6F\x75\x72\x63\x65\x2E\x20\x54\x72\x79\x20\x77\x69\x74\x68\x20\x61\x20\x64\x69\x66\x66\x65\x72\x65\x6E\x74\x20\x55\x52\x4C",
      ];
      const _0x50b2 = function (_0x4e7d) {
        return decodeURIComponent(
          atob(_0x4e7d)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
      };

      let fullUrl = this.url;
      if (!fullUrl.includes("http://") && !fullUrl.includes("https://")) {
        fullUrl = this.protocol + this.url;
      } else {
        this.protocol = fullUrl.startsWith("https://") ? "https://" : "http://";
        this.url = fullUrl.replace(this.protocol, "");
      }

      const _0xf4a8 = fullUrl[_0x4e7d[4]]();
      const _0xb7c1 = _0x4e7d[2][_0x4e7d[3]]("|");
      for (let _0xa12e = 0; _0xa12e < _0xb7c1.length; _0xa12e++) {
        if (_0xf4a8[_0x4e7d[5]](_0xb7c1[_0xa12e])) {
          alert(_0x4e7d[6]);
          return;
        }
      }

      this.loading = true;
      this.waiting = true;
      this.aiAnalysis = null;

      const de = atob(this.ep[0]) + this.ep[1] + fullUrl + this.ep[2];

      axios
        .get(de + encodeURIComponent(this.aiPrompt), {
          crossdomain: true,
          headers: {
            Origin: window.location.origin,
          },
        })
        .then((response) => {
          this.result = response.data.screenshotImage;
          this.aiAnalysis = response.data.aiAnalysis;
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
          this.loaded = true;
          this.waiting = false;
        });
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
    },
  },
});
