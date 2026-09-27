<script lang="ts">
  import { onMount } from "svelte";

  const navItems = [
    { id: "#hero", label: "01 // HOME" },
    { id: "#experience", label: "02 // EXP" },
    { id: "#projects", label: "03 // PROJ" },
    { id: "#about", label: "04 // ABOUT" },
    { id: "#contact", label: "05 // CONTACT" },
  ];

  let activeSection = "#hero";

  function scrollToSection(id: string) {
    const el = document.querySelector(id);
    if (el) {
      activeSection = id;
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  onMount(() => {
    function updateActiveSection() {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // When reaching near the bottom of the page, activate the contact section
      if (scrollY + windowHeight >= documentHeight - 60) {
        activeSection = "#contact";
        return;
      }

      // Trigger line located at 35% of the viewport height from top
      const triggerY = windowHeight * 0.35;

      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const el = document.querySelector(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerY && rect.bottom > triggerY) {
            activeSection = item.id;
            return;
          }
        }
      }

      // Default top fallback
      if (scrollY < 120) {
        activeSection = "#hero";
      }
    }

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection, { passive: true });

    // Initial evaluation
    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  });
</script>

<nav
  class="fixed right-2 md:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center py-4"
  aria-label="Section Navigation"
>
  <!-- Vertical Connecting Line -->
  <div
    class="absolute top-0 bottom-0 w-[1px] bg-[#FF0000]/30 -z-10"
    aria-hidden="true"
  ></div>

  <!-- Navigation Dots -->
  <ul class="flex flex-col items-center gap-6 m-0 p-0 list-none">
    {#each navItems as item (item.id)}
      {@const isActive = activeSection === item.id}
      <li>
        <button
          type="button"
          on:click={() => scrollToSection(item.id)}
          class="group relative flex items-center justify-center p-2 min-w-[44px] min-h-[44px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF0000]"
          aria-label="Scroll to {item.label}"
          aria-current={isActive ? "true" : undefined}
        >
          <!-- Active Dot / Brutalist Marker -->
          <span
            class="block transition-all duration-300 {isActive
              ? 'h-3.5 w-3.5 bg-[#FF0000] rotate-45 shadow-[0_0_8px_#FF0000]'
              : 'h-2 w-2 border border-[#FF0000] bg-black group-hover:bg-[#FF0000]/60'}\"
          ></span>

          <!-- Desktop Label Tag -->
          <span
            class="pointer-events-none absolute right-10 whitespace-nowrap bg-black border border-[#FF0000] px-2 py-1 text-[10px] uppercase tracking-widest text-[#FF0000] transition-all duration-200 hidden md:block {isActive
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}\"
          >
            {item.label}
          </span>
        </button>
      </li>
    {/each}
  </ul>
</nav>
