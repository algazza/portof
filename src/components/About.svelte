<script lang="ts">
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { onMount } from "svelte";
  import { aboutMe } from "../constanta/about";
  import { Foto2, Foto2Transparent } from "../constanta/image";
  import GooeyHeading from "./GooeyHeading.svelte";

  gsap.registerPlugin(ScrollTrigger);

  let sectionEl: HTMLElement;
  let bodyMaskedContainer: HTMLElement;

  // Split description paragraphs and format cleanly
  const paragraphs = aboutMe.description
    .split("\n\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
    .map((p) => p.replace(/—/g, ", ")); // Sanitize em dash in accordance with antislop R-02

  onMount(() => {
    const ctx = gsap.context(() => {
      const maskedItems = bodyMaskedContainer
        ? bodyMaskedContainer.querySelectorAll(".masked-body-content")
        : [];

      // Reversible masked body stagger reveal (Strictly NO opacity, solid slide up)
      if (maskedItems.length > 0) {
        gsap.fromTo(
          maskedItems,
          { y: "105%" },
          {
            y: "0%",
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top 70%",
              end: "bottom 15%",
              toggleActions: "restart reverse restart reverse",
            },
          },
        );
      }
    }, sectionEl);

    return () => ctx.revert();
  });
</script>

<section
  id="about"
  bind:this={sectionEl}
  class="relative min-h-screen w-full bg-black border-b border-[#FF0000]/30 py-24 px-4 sm:px-6 md:px-16 overflow-hidden"
>
  <!-- Section Tag -->
  <div class="flex items-center gap-2 mb-4">
    <span class="h-2 w-2 bg-[#FF0000]" aria-hidden="true"></span>
    <span class="font-caption text-[#FF0000] tracking-widest text-xs"
      >// DOSSIER 04 // BIOGRAPHY</span
    >
  </div>

  <!-- Giant Brutalist Name Title ("Al Ghaza" much larger than paragraphs) -->
  <div
    class="mb-12 border-b-2 border-[#FF0000] pb-6 max-w-full overflow-hidden"
  >
    <GooeyHeading level="h1" text="AL GHAZA" className="tracking-tighter" />
    <span
      class="font-caption text-[#FF0000] block mt-2 tracking-widest text-xs"
    >
      LEGAL: {aboutMe.name.toUpperCase()} // FRONTEND ENGINEER
    </span>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
    <!-- Visual Portrait with The Batman Halftone Grain -->
    <div class="lg:col-span-4 order-2 lg:order-1">
      <div
        class="relative w-full max-w-[340px] mx-auto border-2 border-[#FF0000] bg-black shadow-[8px_8px_0px_#FF0000] overflow-hidden"
      >
        <img
          src={Foto2 || Foto2Transparent || aboutMe.image}
          alt="Al Ghaza Portrait"
          class="w-full h-auto object-cover grayscale contrast-200 brightness-90 filter transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <!-- Duotone Red Overlay -->
        <div
          class="pointer-events-none absolute inset-0 bg-[#FF0000]/25 mix-blend-color"
        ></div>
        <div
          class="halftone-overlay pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
        ></div>

        <div
          class="p-3 bg-black border-t-2 border-[#FF0000] flex justify-between items-center text-[10px] font-mono text-[#FF0000]"
        >
          <span>STATUS: ACTIVE_DEVELOPER</span>
          <span>LOCATION: SEMARANG_ID</span>
        </div>
      </div>

      <!-- Quick Metrics Brutalist Badge -->
      <div
        class="mt-6 max-w-[340px] mx-auto border border-[#FF0000] p-4 bg-black dither-grid-fine"
      >
        <div class="text-xs font-mono text-[#FF0000] font-bold mb-2">
          // CORE EXPERTISE
        </div>
        <ul
          class="text-xs font-mono text-[#FF0000] space-y-1.5 list-none p-0 m-0"
        >
          <li>→ High-Performance Web Architectures</li>
          <li>→ UI Motion & Fluid GSAP Choreography</li>
          <li>→ Dynamic Low-Code Form Automation</li>
          <li>→ Banking & Enterprise Web Interfaces</li>
        </ul>
      </div>
    </div>

    <!-- Right: Bio Content with Masked Slide-Up (Strictly NO OPACITY ANIMATION) -->
    <div
      bind:this={bodyMaskedContainer}
      class="lg:col-span-8 order-1 lg:order-2 flex flex-col gap-6"
    >
      {#each paragraphs as paragraph}
        <div class="masked-body-wrapper border-l-2 border-[#FF0000] pl-6 py-1">
          <div class="masked-body-content">
            <p
              class="font-body text-[#FF0000] text-sm md:text-lg leading-relaxed"
            >
              {paragraph}
            </p>
          </div>
        </div>
      {/each}

      <div class="masked-body-wrapper mt-4">
        <div class="masked-body-content">
          <div class="p-4 border border-[#FF0000] bg-black inline-block">
            <span
              class="font-caption text-[#FF0000] tracking-wider font-bold text-xs sm:text-sm"
            >
              PHILOSOPHY: REAL-WORLD PROBLEM SOLVING OVER SUPERFICIAL AI
              DECORATION
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
