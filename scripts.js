document.addEventListener("DOMContentLoaded", function () {
    const fileList = document.getElementById("file-list");
    const backButton = document.getElementById("back-button");
    const currentPath = document.getElementById("current-path");

    const state = {
        path: [],
    };

    function fetchFiles(url) {
        return fetch(url)
            .then(response => response.json());
    }

    function displayContents(contents) {
        fileList.innerHTML = '';

        contents.forEach(item => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");

            if (item.type === "file") {
                link.href = item.download_url;
                link.textContent = item.name;

                listItem.appendChild(link);
            } else if (item.type === "dir") {
                const dirLink = document.createElement("a");
                dirLink.href = "#";  // Placeholder for now
                dirLink.textContent = item.name + "/";
                dirLink.addEventListener("click", function () {
                    openFolder(item.url, item.name);
                });

                listItem.appendChild(dirLink);
            }

            fileList.appendChild(listItem);
        });
    }

    function openFolder(folderUrl, folderName) {
        fetchFiles(folderUrl)
            .then(data => {
                state.path.push(folderName);
                updateUI();
                displayContents(data);
            })
            .catch(error => console.error("Error opening folder:", error));
    }

    function navigateBack() {
        if (state.path.length > 1) {
            state.path.pop();
            const currentFolder = state.path[state.path.length - 1];

            if (currentFolder) {
                fetchFiles(`https://api.github.com/repos/NeeasTooID/Static-HTML/contents/${currentFolder}`)
                    .then(data => {
                        updateUI();
                        displayContents(data);
                    })
                    .catch(error => console.error("Error navigating back:", error));
            } else {
                // If currentFolder is undefined, fetch root folder contents
                fetchFiles("https://api.github.com/repos/NeeasTooID/Static-HTML/contents")
                    .then(data => {
                        state.path.push("Root");
                        updateUI();
                        displayContents(data);
                    })
                    .catch(error => console.error("Error fetching file list:", error));
            }
        }
    }

    function updateUI() {
        currentPath.textContent = state.path.join(" / ");
        backButton.disabled = state.path.length === 1;
    }

    backButton.addEventListener("click", navigateBack);

    fetchFiles("https://api.github.com/repos/NeeasTooID/Static-HTML/contents")
        .then(data => {
            state.path.push("Root");
            updateUI();
            displayContents(data);
        })
        .catch(error => console.error("Error fetching file list:", error));
});
