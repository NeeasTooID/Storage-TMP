document.addEventListener("DOMContentLoaded", function () {
    const fileList = document.getElementById("file-list");

    fetch("https://api.github.com/repos/NeeasTooID/Static-HTML/contents")
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                if (item.type === "file") {
                    const listItem = document.createElement("li");
                    const link = document.createElement("a");
                    link.href = item.html_url;
                    link.textContent = item.name;
                    listItem.appendChild(link);
                    fileList.appendChild(listItem);
                }
            });
        })
        .catch(error => console.error("Error fetching file list:", error));
});
