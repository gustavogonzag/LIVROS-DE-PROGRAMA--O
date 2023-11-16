new Vue({
  el: "#app",
  data: {
    css: "",
    optimized: false
  },
  methods: {
    handleSetToken() {
      const token = document.getElementById("token").value;
      localStorage.setItem("token", token);
      document.getElementById('close-modal').click();
      setTimeout(() => {
        this.handleClick();
      },1000)
    },
    handleClick() {
    const token = localStorage.getItem("token");

      if (!token) {
        document.getElementById('open-modal').click();
        return;
      }

      const textBtn = this.$refs.textBtn;
      const btnOtimizar = this.$refs.btnOtimizar;
      textBtn.innerHTML = "Otimizando...";
      btnOtimizar.disabled = true;
      btnOtimizar.classList.add('disabled');

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
