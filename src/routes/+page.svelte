<script lang="ts">
  import ResourceCard from '$lib/ResourceCard.svelte';
  export let data; // Loaded from +page.ts

  let searchTerm = "";
  let selectedCategory = "All";
  let sortOrder = "newest";

  // Get a unique list of categories for the dropdown
  const categories = ["All", ...new Set(data.chartData.map(d => d.category))];

  // REACTIVE LOGIC: This recalculates whenever any variable inside it changes
  $: filteredResources = data.chartData
    .filter(item => {
      let searchableText = [item.title, item.description].join(" ");
    
      const matchesSearch = searchableText.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
        if (sortOrder === "newest") {
    // We want the item that came LATER in the array to come FIRST
    return data.chartData.indexOf(b) - data.chartData.indexOf(a);
  } 
  if (sortOrder === "oldest") {
    // Keep them in their original order
    return data.chartData.indexOf(a) - data.chartData.indexOf(b);
  }
      if (sortOrder === "az") return a.title.localeCompare(b.title);
      if (sortOrder === "za") return b.title.localeCompare(a.title);
      return 0; // Default (Order from sheet)
    });
</script>

<section class="section">
  <div class="container">
    <h1 class="title">Resource Library</h1>
    <p class="subtitle">Showing <strong>{filteredResources.length}</strong> resources</p>

    <div class="field is-grouped is-grouped-multiline mb-6">
      <div class="control is-expanded">
        <input class="input" type="text" placeholder="Search..." bind:value={searchTerm} />
      </div>
      <div class="control">
        <div class="select">
          <select bind:value={selectedCategory}>
            {#each categories as cat}
              <option value={cat}>{cat}</option>
            {/each}
          </select>
        </div>

        <div class="select">
  <select bind:value={sortOrder}>
    <option value="newest">Newest First</option>
    <option value="oldest">Oldest First</option>
    <option value="az">Alphabetical (A-Z)</option>
  </select>
</div>


      </div>
    </div>

    <div class="columns is-multiline">
      {#each filteredResources as item (item.title)}
        <div class="column is-12-tablet is-4-desktop">
          <ResourceCard {...item} />
        </div>
      {/each}
    </div>
  </div>
</section>