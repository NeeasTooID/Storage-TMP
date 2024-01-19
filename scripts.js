document.addEventListener("DOMContentLoaded", function () {
    const fileList = document.getElementById("file-list");

    fetch("https://api.github.com/repos/NeeasTooID/Static-HTML/contents")
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                if (item.type === "file") {
                    const listItem = document.createElement("li");
                    const link = document.createElement("a");
                    const rawLink = document.createElement("a");

                    link.href = item.html_url;
                    link.textContent = item.name;

                    rawLink.href = item.download_url;
                    rawLink.textContent = "View Raw";
                    rawLink.setAttribute("target", "_blank");

                    listItem.appendChild(link);
                    listItem.appendChild(document.createTextNode(" | "));
                    listItem.appendChild(rawLink);

                    fileList.appendChild(listItem);
                }
            });
        })
        .catch(error => console.error("Error fetching file list:", error));
});
