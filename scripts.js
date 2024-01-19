document.addEventListener("DOMContentLoaded", function () {
    const fileList = document.getElementById("file-list");

    function fetchFiles(url) {
        return fetch(url)
            .then(response => response.json());
    }

    function displayContents(contents) {
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
                dirLink.href = item.html_url;
                dirLink.textContent = item.name + "/";
                listItem.appendChild(dirLink);
            }

            fileList.appendChild(listItem);
        });
    }

    fetchFiles("https://api.github.com/repos/NeeasTooID/Static-HTML/contents")
        .then(data => {
            displayContents(data);
            const folders = data.filter(item => item.type === "dir");
            return Promise.all(folders.map(folder => fetchFiles(folder.url)));
        })
        .then(folderContents => {
            folderContents.forEach(contents => displayContents(contents));
        })
        .catch(error => console.error("Error fetching file list:", error));
});
