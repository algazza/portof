<script lang="ts">
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { onMount } from "svelte";
  import { heroSection } from "../constanta/hero";
  import { Foto1, Foto1Transparent } from "../constanta/image";
  import GooeyHeading from "./GooeyHeading.svelte";

  gsap.registerPlugin(ScrollTrigger);

  let heroContainer: HTMLElement;
  let bodyMaskedEl: HTMLElement;
  let heroImageEl: HTMLElement;
  let imgInnerEl: HTMLElement;
  let scannerEl: HTMLElement;
  let badgesEl: HTMLElement;

  function scrollToSection(id: string) {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  onMount(() => {
    const ctx = gsap.context(() => {
      // Coordinated cinematic intro timeline with bidirectional scroll trigger (R-19, R-31)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroContainer,
          start: "top 60%",
          end: "bottom 15%",
          toggleActions: "restart reverse restart reverse",
        },
      });

      // Visual decor elements enter
      tl.fromTo(
        badgesEl,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.5, ease: "power3.inOut" },
      );

      // Hero Photo Cinematic Scanner Reveal: Frame materializes, red laser sweeps, photo resolves
      if (heroImageEl) {
        tl.fromTo(
          heroImageEl,
          {
            opacity: 0,
            y: 45,
            scale: 0.92,
            boxShadow: "0px 0px 0px #FF0000",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            boxShadow: "8px 8px 0px #FF0000",
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.2",
        );
      }

      if (imgInnerEl) {
        tl.fromTo(
          imgInnerEl,
          {
            scale: 1.18,
            filter: "grayscale(100%) contrast(250%) brightness(0.2) blur(6px)",
          },
          {
            scale: 1,
            filter: "grayscale(100%) contrast(200%) brightness(0.95) blur(0px)",
            duration: 1.0,
            ease: "power3.out",
          },
          "<",
        );
      }

      // Red laser scanner beam sweeps down across the dossier photo
      if (scannerEl) {
        tl.fromTo(
          scannerEl,
          {
            top: "0%",
            opacity: 1,
          },
          {
            top: "100%",
            duration: 0.85,
            ease: "power2.inOut",
          },
          "<",
        ).to(
          scannerEl,
          {
            opacity: 0,
            duration: 0.2,
          },
          "-=0.1",
        );
      }

      // Body text solid slide up through masked overflow-hidden (ZERO OPACITY ANIMATION as per DESIGN.md)
      if (bodyMaskedEl) {
        tl.fromTo(
          bodyMaskedEl,
          { y: "105%" },
          {
            y: "0%",
            duration: 0.75,
            ease: "power3.out",
          },
          "-=0.4",
        );
      }
    }, heroContainer);

    return () => ctx.revert();
  });
</script>

<section
  id="hero"
  bind:this={heroContainer}
  class="relative min-h-screen w-full flex flex-col justify-center px-4 sm:px-6 md:px-16 pt-24 pb-16 overflow-hidden border-b border-[#FF0000]/30 dither-grid-fine"
>
  <!-- The Batman 2022 Industrial Watermark & Coordinates -->
  <div
    bind:this={badgesEl}
    class="flex flex-wrap items-center justify-between gap-4 border-b border-[#FF0000] pb-3 mb-8 w-full"
  >
    <div class="flex items-center gap-3">
      <span class="inline-block h-3 w-3 bg-[#FF0000]"></span>
      <span
        class="font-caption text-[#FF0000] tracking-widest text-[10px] sm:text-xs"
      >
        SYSTEM.SYS // BATMAN_AESTHETIC.2022 // REEVES_NOIR
      </span>
    </div>
    <div
      class="font-caption text-[#FF0000]/70 font-mono text-[10px] sm:text-xs"
    >
      LOC: 07°00′S 110°24′E // SEMARANG_ID
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
    <!-- Left Column: Typography & Intentional Hierarchy with Zero Overflow Guarantee (R-03) -->
    <div
      class="lg:col-span-8 flex flex-col z-10 w-full max-w-full overflow-hidden"
    >
      <!-- Sub-label / Name -->
      <div class="mb-3">
        <span
          class="font-caption text-[#FF0000] bg-black px-2 py-1 border border-[#FF0000] tracking-widest inline-block text-[11px] sm:text-xs"
        >
          // {heroSection.name}
        </span>
      </div>

      <!-- Dominant Role Heading with responsive scaling (no red circles, no overflow) -->
      <div class="mb-4 w-full max-w-full overflow-hidden">
        <GooeyHeading level="h1" text={heroSection.role.toUpperCase()} />
      </div>

      <!-- Masked Body Slogan: Strictly Slide Up Solidly (NO OPACITY TRANSITION) -->
      <div
        class="masked-body-wrapper my-4 sm:my-6 max-w-2xl border-l-2 border-[#FF0000] pl-4"
      >
        <div bind:this={bodyMaskedEl} class="masked-body-content">
          <p
            class="font-body text-[#FF0000] font-medium text-sm sm:text-base md:text-lg leading-relaxed"
          >
            {heroSection.slogan}
          </p>
        </div>
      </div>

      <!-- Brutalist Action Triggers -->
      <div class="flex flex-wrap items-center gap-4 mt-2 sm:mt-4">
        <button
          type="button"
          on:click={() => scrollToSection("#projects")}
          class="btn-brutalist"
          aria-label="View Project Case Studies"
        >
          VIEW PROJECTS
          <span class="ml-2 font-mono" aria-hidden="true">[03]</span>
        </button>

        <button
          type="button"
          on:click={() => scrollToSection("#experience")}
          class="btn-brutalist-outline"
          aria-label="View Career Experience"
        >
          EXPLORE CAREER
          <span class="ml-2 font-mono" aria-hidden="true">[02]</span>
        </button>
      </div>
    </div>

    <!-- Right Column: Visual Portrait with Batman Noir Duotone Halftone Scanner Reveal -->
    <div
      class="lg:col-span-4 relative flex justify-center items-center w-full mt-6 lg:mt-0"
    >
      <div
        bind:this={heroImageEl}
        style="opacity: 0;"
        class="relative w-full max-w-[280px] sm:max-w-[340px] aspect-[4/5] border-2 border-[#FF0000] bg-black overflow-hidden"
      >
        <!-- The Portrait Image with GSAP Filter & Zoom Reveal -->
        <img
          bind:this={imgInnerEl}
          src={Foto1Transparent || Foto1}
          alt="Portrait of Fadhil Al Ghaza"
          class="w-full h-full object-cover object-top mix-blend-luminosity filter transition-transform duration-500 hover:scale-105"
        />

        <!-- Red Laser Scanner Beam -->
        <div
          bind:this={scannerEl}
          class="pointer-events-none absolute left-0 right-0 h-[3px] bg-[#FF0000] shadow-[0_0_14px_#FF0000] z-20"
          aria-hidden="true"
        ></div>

        <!-- Duotone Red Overlay with Halftone Dots -->
        <div
          class="pointer-events-none absolute inset-0 bg-[#FF0000]/25 mix-blend-color"
        ></div>
        <div
          class="halftone-overlay pointer-events-none absolute inset-0 opacity-35 mix-blend-screen"
        ></div>

        <!-- Brutalist Frame Tags -->
        <div
          class="absolute top-2 left-2 bg-black border border-[#FF0000] px-2 py-0.5 text-[10px] font-mono text-[#FF0000] z-10"
        >
          ID: AG-2026
        </div>
        <div
          class="absolute bottom-2 right-2 bg-black border border-[#FF0000] px-2 py-0.5 text-[10px] font-mono text-[#FF0000] z-10"
        >
          FRONTEND_SPECIALIST
        </div>
      </div>
    </div>
  </div>
</section>
