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
  let photoContainerEl: HTMLElement;
  let scannerLineEl: HTMLElement;
  let metricsBoxEl: HTMLElement;

  // Split description paragraphs and format cleanly
  const paragraphs = aboutMe.description
    .split("\n\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
    .map((p) => p.replace(/—/g, ", "));

  onMount(() => {
    const ctx = gsap.context(() => {
      if (photoContainerEl) {
        const photoTl = gsap.timeline({
          scrollTrigger: {
            trigger: photoContainerEl,
            start: "top 80%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
        });

        photoTl.fromTo(
          photoContainerEl,
          {
            clipPath: "inset(100% 0% 0% 0%)",
            opacity: 0,
            y: 48,
            scale: 0.94,
            rotate: 2,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 1.05,
            ease: "expo.out",
          },
        );

        if (scannerLineEl) {
          photoTl.fromTo(
            scannerLineEl,
            { top: "0%", opacity: 0 },
            {
              top: "100%",
              opacity: 1,
              duration: 0.75,
              ease: "power2.inOut",
              repeat: 1,
              yoyo: true,
            },
            "-=0.4",
          );
        }
      }

      if (metricsBoxEl) {
        gsap.fromTo(
          metricsBoxEl,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: metricsBoxEl,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      }

      const maskedItems = bodyMaskedContainer
        ? bodyMaskedContainer.querySelectorAll(".masked-body-content")
        : [];

      maskedItems.forEach((item) => {
        gsap.fromTo(
          item,
          { y: "105%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              end: "bottom 12%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      });
    }, sectionEl);

    return () => ctx.revert();
  });
</script>

<section
  id="about"
  bind:this={sectionEl}
  class="relative min-h-screen w-full bg-black border-b border-[#FF0000]/30 py-24 px-4 sm:px-8 md:px-16 overflow-hidden"
>
  <div class="flex items-center gap-2 mb-4">
    <span class="h-2 w-2 bg-[#FF0000]" aria-hidden="true"></span>
    <span class="font-caption text-[#FF0000] tracking-widest text-xs"
      >// DOSSIER 04 // BIOGRAPHY</span
    >
  </div>

  <div class="mb-12 border-b-2 border-[#FF0000] pb-6">
    <GooeyHeading level="h1" text="AL GHAZA" className="tracking-tighter" />
    <span
      class="font-caption text-[#FF0000] block mt-2 tracking-widest text-xs"
    >
      LEGAL: {aboutMe.name.toUpperCase()} // FRONTEND ENGINEER
    </span>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
    <div class="lg:col-span-4 order-2 lg:order-1">
      <div
        bind:this={photoContainerEl}
        class="photo-reveal relative w-full max-w-85 mx-auto border-2 border-[#FF0000] bg-black shadow-[8px_8px_0px_#FF0000] overflow-hidden"
      >
        <div
          bind:this={scannerLineEl}
          class="scanner-beam-line"
          aria-hidden="true"
        >
          <div class="scanner-beam-glow"></div>
        </div>

        <img
          src={Foto2 || aboutMe.image}
          alt="Al Ghaza Portrait"
          class="w-full h-auto object-cover grayscale contrast-200 brightness-90 filter transition-transform duration-500"
          loading="lazy"
        />
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
    </div>

    <div
      bind:this={bodyMaskedContainer}
      class="lg:col-span-8 order-1 lg:order-2 flex flex-col gap-6"
    >
      {#each paragraphs as paragraph, idx}
        <div class="masked-body-wrapper border-l-2 border-[#FF0000] pl-6 py-1">
          <div class="masked-body-content">
            <p
              class="font-body text-[#FF0000] text-sm sm:text-base md:text-lg leading-relaxed"
            >
              {paragraph}
            </p>
          </div>
        </div>
      {/each}

      <div class="masked-body-wrapper mt-4">
        <div class="masked-body-content">
          <div
            class="p-4 border border-[#FF0000] bg-black inline-block shadow-[4px_4px_0px_#FF0000]"
          >
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
