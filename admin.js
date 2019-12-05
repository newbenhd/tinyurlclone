const doc = selector => document.querySelector(selector);
const storage = window.localStorage;

document.addEventListener("DOMContentLoaded", () => {
  (() => {
    const strUrls = storage.getItem("myUrls");
    if (!strUrls) return;
    const data = JSON.parse(strUrls);
    const urlListDOM = doc("#url-list");
    for (const key in data) {
      const element = document.createElement("li");
      const checkBox = document.createElement("input");
      checkBox.setAttribute("type", "checkbox");
      checkBox.checked = data[key].expire || false;
      checkBox.onclick = event => {
        data[key].expire = checkBox.checked;
        storage.setItem('myUrls', JSON.stringify(data));
      }
      element.appendChild(checkBox);
      const link = document.createElement("a");
      link.href = data[key].url;
      link.innerText = key;
      link.onclick = event => {
        data[key].visited = Date.now();
        storage.setItem('myUrls', JSON.stringify(data));
      }
      element.appendChild(link);
      urlListDOM.appendChild(element);
    }
  })();
  doc("#to-back").addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
