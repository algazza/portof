<script lang="ts">
  function scrollToSection(id: string) {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
</script>

<header
  class="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 bg-black/80 backdrop-blur-xs"
>
  <a
    href="#hero"
    on:click|preventDefault={() => scrollToSection("#hero")}
    class="group relative inline-flex items-center text-decoration-none focus-visible:outline-2 focus-visible:outline-[#FF0000]"
    aria-label="Al Ghaza Homepage"
  >
    <div class="relative">
      <span
        class="font-h3 text-[#FF0000] tracking-tighter uppercase font-extrabold select-none"
      >
        AL GHAZA
      </span>
      <span
        class="halftone-overlay pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply group-hover:opacity-75 transition-opacity"
        aria-hidden="true"
      ></span>
    </div>
    <span
      class="ml-2 hidden text-[10px] tracking-widest text-[#FF0000]/70 uppercase sm:inline-block font-mono"
    >
      [DEV.2026]
    </span>
  </a>

  <a
    href="#contact"
    on:click|preventDefault={() => scrollToSection("#contact")}
    class="btn-brutalist text-xs md:text-sm tracking-wider uppercase font-bold"
    aria-label="Navigate to contact section"
  >
    <span>CONTACT ME</span>
    <span
      class="ml-2 inline-block h-2 w-2 bg-black animate-pulse"
      aria-hidden="true"
    ></span>
  </a>
</header>
