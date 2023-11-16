new Vue({
  el: "#app",
  data: {
    css: "",
    optimized: false
  },
  methods: {
    handleClick() {
    const textBtn = this.$refs.textBtn;
    const btnOtimizar = this.$refs.btnOtimizar;
    textBtn.innerHTML = "Otimizando...";
    btnOtimizar.disabled = true;
    btnOtimizar.classList.add('disabled');

    // const token = localStorage.getItem("token");
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJjb2xvcmhhcm1vbnkiLCJzdWIiOiI2NTJhZmQzYjAwN2JmYjZhNWY1ZjlmZmYiLCJpYXQiOjE3MDAxMDU2MjAsImV4cCI6MTcwMDUzNzYyMH0.sFMKP9Fk5eZT95Zc_2juYQOPaxLn2E16_6zyNLZ6vFk";

      if (!token) {
        window.location.href = "https://color-harmony.vercel.app/";
      }
    
      this.$nextTick(async () => {
        const url = window.location.href;
        const obj = {
          url
        };

        const config = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(obj),
        };
        const response = await fetch(
          `https://color-harmony-api.vercel.app/api-user/optimizations/mocks`,
          config
        );
        const data = await response.text();
        this.optimized = true;
        textBtn.innerHTML = "Otimizar visual";
        btnOtimizar.classList.remove('disabled');
        btnOtimizar.disabled = false;

        let styleElement = document.createElement('style');
        styleElement.id = 'optimizedCss';
        styleElement.innerHTML = data;

        document.head.appendChild(styleElement);
      });
    
      // this.$nextTick(async () => {
      //   let stylesheets = document.styleSheets;

      //   for (let i = 0; i < stylesheets.length; i++) {
      //     let stylesheet = stylesheets[i];

      //     let rules = stylesheet.cssRules;

      //     for (let j = 0; j < rules.length; j++) {
      //       let rule = rules[j];

      //       this.css += rule.cssText;
      //     }
      //   }
      //   const obj = {
      //     css: this.css,
      //   };
      //   const config = {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //     body: JSON.stringify(obj),
      //   };
      //   const response = await fetch(
      //     "http://localhost:3000/optimizations/style",
      //     config
      //   );
      //   const data = await response.text();
      //   this.optimized = true;
      //   textBtn.innerHTML = "Otimizar visual";
      //   btnOtimizar.classList.remove('disabled');
      //   btnOtimizar.disabled = false;

      //   let styleElement = document.createElement('style');
      //   styleElement.id = 'optimizedCss';
      //   styleElement.innerHTML = data;

      //   document.head.appendChild(styleElement);
      // });
    },
    handleReturn() {
        document.getElementById('optimizedCss').remove();
        this.optimized = false;
    }
  },

});
