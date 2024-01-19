document.addEventListener("DOMContentLoaded", function () {
    const fileList = document.getElementById("file-list");
    const openRootFolderButton = document.getElementById("open-root-folder");

    function fetchFiles(url) {
        return fetch(url)
            .then(response => response.json());
    }

    function displayContents(contents) {
        fileList.innerHTML = '';  // Clear existing content

        contents.forEach(item => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");

            if (item.type === "file") {
                const rawLink = document.createElement("a");
                link.href = item.html_url;
                link.textContent = item.name;

                rawLink.href = item.download_url;
                rawLink.textContent = "View Raw";
                rawLink.setAttribute("target", "_blank");

                listItem.appendChild(link);
                listItem.appendChild(document.createTextNode(" | "));
                listItem.appendChild(rawLink);
            } else if (item.type === "dir") {
                const dirLink = document.createElement("a");
                dirLink.href = "#";  // Placeholder for now
                dirLink.textContent = item.name + "/";
                dirLink.addEventListener("click", function () {
                    openFolder(item.url);
                });

                listItem.appendChild(dirLink);
            }

            fileList.appendChild(listItem);
        });
    }

    function openFolder(folderUrl) {
        fetchFiles(folderUrl)
            .then(data => {
                displayContents(data);
            })
            .catch(error => console.error("Error opening folder:", error));
    }

    openRootFolderButton.addEventListener("click", function () {
        fetchFiles("https://api.github.com/repos/NeeasTooID/Static-HTML/contents")
            .then(data => {
                displayContents(data);
            })
            .catch(error => console.error("Error fetching file list:", error));
    });
});
