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
      let fullUrl = this.url;
      if (!fullUrl.includes("http://") && !fullUrl.includes("https://")) {
        fullUrl = this.protocol + this.url;
      } else {
        this.protocol = fullUrl.startsWith("https://") ? "https://" : "http://";
        this.url = fullUrl.replace(this.protocol, "");
      }

      this.loading = true;
      this.waiting = true;
      this.aiAnalysis = null;

      const de = atob(this.ep[0]) + this.ep[1] + fullUrl + this.ep[2];

      axios
        .get(de + encodeURIComponent(this.aiPrompt), {
          crossdomain: true,
          headers: {
            "X-Client-Origin": window.location.origin,
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
