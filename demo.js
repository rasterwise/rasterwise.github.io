var app = new Vue({
  el: "#app",
  data() {
    return {
      protocol: "https://",
      url: "www.apple.com",
      aiPrompt: "What's on this page?", // Pre-populate with the desired text
      result: null,
      aiAnalysis: null,
      loading: false,
      loaded: false,
      waiting: false,
      waitMessage:
        "Please wait while we capture the screenshot and analyze it...",
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

      axios
        .get(
          "https://0lkdyh572d.execute-api.us-west-2.amazonaws.com/public/get-screenshot-demo?url=" +
            fullUrl +
            "&height=1280&aiprompt=" +
            encodeURIComponent(this.aiPrompt),
          { crossdomain: true }
        )
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
