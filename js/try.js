document.getElementById("searchBox").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const query = this.value.trim();
    if (query) {
      window.location.href = `searchResult.html?q=${encodeURIComponent(query)}`;
    }
  }
});
