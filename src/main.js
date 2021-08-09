// console.log(111);
const defaultData = [
  { logo: "A", url: "https://www.acfun.cn" },
  { logo: "B", url: "https://www.bilibili.com" },
];
//取出来是字符串
const localData = window.localStorage.getItem("nav");
const navData = JSON.parse(localData) || defaultData;

const render = () => {
  //渲染前先把有的删除掉
  $(".navList").find("li:not(.addButton)").remove();
  navData.forEach((element, index) => {
    // console.log(element);
    let $li = $(`<li class="navItem">
        <div class="itemWraper">
      <div class="buttonPic">${element.logo}</div>
      <div class="buttonText">${formatUrl(element.url)}</div>
      <div class="close"><svg class="icon">
      <use xlink:href="#icon-close"></use>
    </svg></div>
    </div>
  </li>`).insertBefore(".addButton");

    $li.on("click", (e) => {
      window.open(element.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      navData.splice(index, 1);
      render();
    });
  });
};
//去除url中的其他字符
const formatUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://")
    .replace("www.", "")
    .replace("//.*/", "");
};
render();

// let a = "dfdfd";
// a.toUpperCase();
$(".addButton").on("click", function () {
  let url = window.prompt("输入需要保持的导航网址吧~");
  console.log(url);
  if (url.trim() === "" || !url) {
    return;
  }
  if (url.indexOf("https://") === -1) {
    url = "https://" + url;
  }
  navData.push({ logo: formatUrl(url)[0].toUpperCase(), url: url });
  window.localStorage.setItem("nav", JSON.stringify(navData));
  render();
});

window.onbeforeunload = () => {
  window.localStorage.setItem("nav", JSON.stringify(navData));
};
$(document).on("keyup", (e) => {
  //   console.log(e.originalEvent.key);
  let key = e.originalEvent.key;
  navData.forEach((item) => {
    if (key === item.logo.toLowerCase()) {
      window.open(item.url);
    }
  });
});
