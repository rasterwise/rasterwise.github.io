var app = new Vue({
  el: "#app",
  data() {
    return {
      protocol: "https://",
      url: "www.apple.com",
      result: null,
      loading: false,
      loaded: false,
    };
  },

  methods: {
    getImage() {
      let fullUrl = this.url;
      if (!fullUrl.includes("http://") && !fullUrl.includes("https://")) {
        fullUrl = this.protocol + this.url;
      } else {
        this.protocol = fullUrl.startsWith("https://") ? "https://" : "http://";
        this.url = fullUrl.replace(this.protocol, "");
      }

      this.loading = true;
      axios
        .get(
          "https://0lkdyh572d.execute-api.us-west-2.amazonaws.com/public/get-screenshot-demo?url=" +
            fullUrl +
            "&height=1280",
          { crossdomain: true }
        )
        .then((response) => {
          this.result = response.data.screenshotImage;
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
          this.loaded = true;
        });
    },
  },
});
