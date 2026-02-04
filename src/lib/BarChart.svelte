<script>
  import { scaleLinear } from 'd3-scale';
  import { fade } from 'svelte/transition';

  // 1. This allows the parent to pass data in
   export let data = [];

  // 2. Chart Dimensions
  const width = 960;
  const barHeight = 25;
  const margin = { left: 70 };

  // 3. The D3 Scale (The Math)
  // This maps a data value (0 to 100) to a pixel value (0 to 400)
  $: xScale = scaleLinear()
    .domain([0, 100])
    .range([0, width - margin.left]);

 
  let hoveredItem = null; // Stores the data object of the bar we are touching
  let mouseX = 0;
  let mouseY = 0;

  function handleMousemove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }
</script>


<svg {width} height={data.length * (barHeight + 5)}>
  {#each data as d, i}
    <g transform="translate(0, {i * (barHeight + 5)})">
      <text x={margin.left - 5} y={barHeight / 1.5} text-anchor="end">
        {d.name}
      </text>

      <rect
        x={margin.left}
        width={xScale(d.count)}
        height={barHeight}
        fill="teal"
        on:mouseenter={() => hoveredItem = d}
        on:mouseleave={() => hoveredItem = null}
        on:mousemove={handleMousemove}
        style="transition: width 0.4s ease;" 
      />
      
      <text x={margin.left + xScale(d.count) + 5} y={barHeight / 1.5}>
        {d.count}
      </text>
    </g>
  {/each}
</svg>

{#if hoveredItem}
  <div 
    class="tooltip" 
    style="position: fixed; top: {mouseY - 40}px; left: {mouseX + 15}px;"
  >
    <strong>{hoveredItem.name}</strong>: {hoveredItem.count}
  </div>
{/if}

<style>

    .tooltip {
    pointer-events: none; /* Prevents the tooltip from blocking the mouse */
    background: white;
    padding: 5px 10px;
    border: 1px solid #333;
    border-radius: 4px;
    font-family: sans-serif;
    box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
    z-index: 1000;
  }
  text {
    font-size: 12px;
    font-family: sans-serif;
    fill: #333;
  }
  button {
    display: block;
    margin-bottom: 20px;
  }
</style>