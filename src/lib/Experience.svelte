<script lang="ts">
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { onMount } from "svelte";
  import { experiencesArray } from "../constanta/experiences";
  import ExperienceModal from "./ExperienceModal.svelte";
  import GooeyHeading from "./GooeyHeading.svelte";

  gsap.registerPlugin(ScrollTrigger);

  let sectionEl: HTMLElement;
  let bodyMaskedEl: HTMLElement;
  let timelineLineEl: HTMLElement;
  let cardsContainerEl: HTMLElement;

  let selectedExperience: (typeof experiencesArray)[0] | null = null;
  let isModalOpen: boolean = false;

  function openModal(exp: (typeof experiencesArray)[0]) {
    selectedExperience = exp;
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
    selectedExperience = null;
  }

  onMount(() => {
    const ctx = gsap.context(() => {
      if (bodyMaskedEl) {
        gsap.fromTo(
          bodyMaskedEl,
          { y: "105%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bodyMaskedEl,
              start: "top 85%",
              end: "bottom 10%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      }

      if (timelineLineEl) {
        gsap.fromTo(
          timelineLineEl,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: cardsContainerEl,
              start: "top 75%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      }

      const timelineItems = cardsContainerEl
        ? cardsContainerEl.querySelectorAll(".timeline-item")
        : [];

      timelineItems.forEach((item, index) => {
        const card = item.querySelector(".timeline-card");
        const node = item.querySelector(".timeline-node");
        const connector = item.querySelector(".timeline-connector");
        const isLeft = index % 2 === 0;

        if (node) {
          gsap.fromTo(
            node,
            { scale: 0, rotation: 0, opacity: 0 },
            {
              scale: 1,
              rotation: 45,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "bottom 15%",
                toggleActions: "play reverse play reverse",
              },
            },
          );
        }

        if (connector) {
          gsap.fromTo(
            connector,
            {
              scaleX: 0,
              transformOrigin: isLeft ? "right center" : "left center",
            },
            {
              scaleX: 1,
              duration: 0.4,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 78%",
                end: "bottom 15%",
                toggleActions: "play reverse play reverse",
              },
            },
          );
        }

        if (card) {
          const isDesktop = window.innerWidth >= 1024;
          const initialX = isDesktop ? (isLeft ? -70 : 70) : 40;

          gsap.fromTo(
            card,
            {
              x: initialX,
              opacity: 0,
              scale: 0.95,
            },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "bottom 15%",
                toggleActions: "play reverse play reverse",
              },
            },
          );
        }
      });
    }, sectionEl);

    return () => ctx.revert();
  });
</script>

<section
  id="experience"
  bind:this={sectionEl}
  class="relative min-h-screen w-full bg-black border-b border-[#FF0000]/30 py-24 px-4 sm:px-8 md:px-16 overflow-hidden dither-grid-fine"
>
  <div class="mb-16 max-w-3xl">
    <div class="flex items-center gap-2 mb-2">
      <span class="h-2 w-2 bg-[#FF0000]" aria-hidden="true"></span>
      <span class="font-caption text-[#FF0000] tracking-widest text-xs"
        >// ARCHIVE 02</span
      >
    </div>

    <GooeyHeading level="h2" text="EXPERIENCE" />

    <div class="masked-body-wrapper mt-4">
      <div bind:this={bodyMaskedEl} class="masked-body-content">
        <p
          class="font-body text-[#FF0000] max-w-xl text-sm sm:text-base leading-relaxed"
        >
          Track record in modern web architecture, enterprise banking, and
          client-facing digital products. Click any timeline dossier card to
          inspect complete specifications.
        </p>
      </div>
    </div>
  </div>

  <div
    bind:this={cardsContainerEl}
    class="relative w-full max-w-6xl mx-auto py-8"
  >
    <div
      class="absolute top-0 bottom-0 left-6 sm:left-8 lg:left-1/2 -translate-x-1/2 w-[2px] bg-[#FF0000]/25"
      aria-hidden="true"
    ></div>

    <div
      bind:this={timelineLineEl}
      class="absolute top-0 bottom-0 left-6 sm:left-8 lg:left-1/2 -translate-x-1/2 w-[2px] bg-[#FF0000] shadow-[0_0_12px_#FF0000] z-0"
      aria-hidden="true"
    ></div>

    <div class="flex flex-col gap-12 lg:gap-16 relative z-10">
      {#each experiencesArray as exp, index (exp.company + exp.startDate)}
        {@const isLeft = index % 2 === 0}
        <div
          class="timeline-item relative flex flex-col lg:flex-row items-center w-full {isLeft
            ? 'lg:justify-start'
            : 'lg:justify-end'}"
        >
          <div
            class="timeline-node absolute left-6 sm:left-8 lg:left-1/2 -translate-x-1/2 top-8 lg:top-1/2 lg:-translate-y-1/2 h-5 w-5 bg-black border-2 border-[#FF0000] z-20 flex items-center justify-center shadow-[0_0_10px_#FF0000]"
            aria-hidden="true"
          >
            <span class="h-2 w-2 bg-[#FF0000] block"></span>
          </div>

          <div
            class="timeline-connector hidden lg:block absolute top-1/2 -translate-y-1/2 h-[2px] bg-[#FF0000] shadow-[0_0_8px_#FF0000] z-10 {isLeft
              ? 'right-1/2 mr-2.5 w-10'
              : 'left-1/2 ml-2.5 w-10'}"
            aria-hidden="true"
          ></div>

          <div
            class="timeline-card w-[calc(100%-3rem)] sm:w-[calc(100%-4.5rem)] ml-12 sm:ml-16 lg:ml-0 lg:w-[calc(50%-48px)] dither-card p-6 sm:p-8 flex flex-col justify-between bg-black cursor-pointer group focus-visible:outline-2 focus-visible:outline-[#FF0000] shadow-[6px_6px_0px_rgba(255,0,0,0.4)] hover:shadow-[8px_8px_0px_#FF0000] transition-all"
            role="button"
            tabindex="0"
            on:click={() => openModal(exp)}
            on:keydown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openModal(exp);
              }
            }}
            aria-label="View details for {exp.role} at {exp.company}"
          >
            <div>
              <div
                class="flex flex-wrap items-center justify-between gap-2 border-b border-[#FF0000] pb-3 mb-4"
              >
                <span
                  class="font-mono text-xs text-[#FF0000] font-bold tracking-wider"
                >
                  REF: EXP-0{index + 1} // {exp.position.toUpperCase()}
                </span>
                <span
                  class="text-xs font-mono text-[#FF0000] border border-[#FF0000] px-2 py-0.5 bg-black"
                >
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>

              <h3
                class="font-h3 text-[#FF0000] font-bold group-hover:underline"
              >
                {exp.role}
              </h3>
              <h4 class="font-h4 text-[#FF0000] mt-1 font-semibold opacity-90">
                @{exp.company}
              </h4>

              <p
                class="font-body text-[#FF0000] mt-4 line-clamp-3 leading-relaxed text-sm sm:text-base"
              >
                {exp.description}
              </p>
            </div>

            <div class="mt-6 pt-4 border-t border-[#FF0000]/40">
              <div class="flex flex-wrap gap-1.5 mb-4">
                {#each exp.skills.slice(0, 4) as skill}
                  <span
                    class="text-[11px] font-mono border border-[#FF0000]/70 px-2 py-0.5 text-[#FF0000] bg-black"
                  >
                    {skill}
                  </span>
                {/each}
                {#if exp.skills.length > 4}
                  <span
                    class="text-[11px] font-mono border border-[#FF0000]/70 px-2 py-0.5 text-[#FF0000] bg-black"
                  >
                    +{exp.skills.length - 4} MORE
                  </span>
                {/if}
              </div>

              <div
                class="flex items-center justify-between text-xs font-mono font-bold text-[#FF0000] group-hover:text-black group-hover:bg-[#FF0000] p-2 transition-colors"
              >
                <span>OPEN DOSSIER</span>
                <span aria-hidden="true">[+]</span>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<ExperienceModal
  isOpen={isModalOpen}
  experience={selectedExperience}
  onClose={closeModal}
/>
