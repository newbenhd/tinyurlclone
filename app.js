const doc = selector => document.querySelector(selector);
const storage = window.localStorage;

document.addEventListener("DOMContentLoaded", () => {
  doc("#form-convert").addEventListener("submit", event => {
    event.preventDefault();
    const input = doc("#input-url").value;
    const protocolOk =
      input.indexOf("http://") === 0 || input.indexOf("https://") === 0;
    const url = protocolOk ? input : "http://" + input;
    const data = storage.getItem("myUrls");
    if (!data)
      storage.setItem(
        "myUrls",
        JSON.stringify({
          [input]: {
            url,
            visited: Date.now(),
          }
        })
      );
    else {
      const urls = JSON.parse(data);
      urls[input] = {
        url,
        visited: Date.now(),
      };
      storage.setItem("myUrls", JSON.stringify(urls));
    }
    const uniqueId =
      Math.random()
        .toString(36)
        .substring(2) + Date.now().toString(36);
    const element = document.createElement("a");
    element.href = url;
    element.innerText = `http://tinyurl/${uniqueId}`;
    doc("#url-output").appendChild(element);
    doc("#input-url").value = "";
  });

  doc("#to-admin-page").addEventListener("click", () => {
    const password = prompt("Enter admin password");
    if (password !== "ilovetesting") alert("Wrong password");
    window.location.href = "admin.html";
  });
});

