// searchBar.ts

/**
 * Initializes the search bar with an event listener to filter country data.
 *
 * @param {Function} onSearch A callback function to execute when the search input is provided.
 */
export function initializeSearchBar(
  onSearch: (searchTerm: string) => void
): void {
  const searchBar = document.getElementById("search-bar") as HTMLInputElement;

  if (!searchBar) {
    console.warn("Search bar element not found!");
    return;
  }

  searchBar.addEventListener("input", () => {
    const searchTerm = searchBar.value.trim().toLowerCase();
    onSearch(searchTerm);
  });
}
