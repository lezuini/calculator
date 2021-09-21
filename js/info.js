const d = document,
  $info = d.getElementById("info");

export default function info() {
  const toggleHide = () => {
    if (!$info.classList.contains("hidden")) {
      $info.classList.remove("show");

      setTimeout(() => {
        $info.classList.add("hidden");
      }, 210);
    } else {
      $info.classList.remove("hidden");

      setTimeout(() => {
        $info.classList.add("show");
      }, 40);
    }
  };

  d.addEventListener("click", (e) => {
    if (e.target.matches(".infoBtn")) {
      toggleHide();
    }
  });

  const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    d.cookie = name + "=" + (value || "") + expires + "; path=/" + "; secure";
  };

  const getCookie = (name) => {
    let nameEQ = name + "=";
    let ca = d.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const checkCookie = () => {
    let firstTime = getCookie("firstTime");

    if (firstTime === null) {
      toggleHide();
      setCookie("firstTime", "false", 10);
    }
  };

  //Prevent the info from appearing every time you recharge
  checkCookie();
}
