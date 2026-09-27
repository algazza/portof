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
      // Reversible masked body text reveal (Strictly NO opacity, solid slide up)
      if (bodyMaskedEl) {
        gsap.fromTo(
          bodyMaskedEl,
          { y: "105%" },
          {
            y: "0%",
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top 75%",
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
  id="experience"
  bind:this={sectionEl}
  class="relative min-h-screen w-full bg-black border-b border-[#FF0000]/30 py-24 px-4 sm:px-6 md:px-16 flex flex-col justify-center overflow-hidden"
>
  <!-- Section Header -->
  <div class="mb-12 md:mb-16 max-w-3xl">
    <div class="flex items-center gap-2 mb-2">
      <span class="h-2 w-2 bg-[#FF0000]" aria-hidden="true"></span>
      <span class="font-caption text-[#FF0000] tracking-widest text-xs">
        // ARCHIVE 02 // CHRONOLOGY
      </span>
    </div>

    <GooeyHeading level="h2" text="EXPERIENCE" />

    <!-- Masked Body Description (STRICT: NO OPACITY FADE-IN, REVERSIBLE) -->
    <div class="masked-body-wrapper mt-4">
      <div bind:this={bodyMaskedEl} class="masked-body-content">
        <p
          class="font-body text-[#FF0000] text-sm md:text-base max-w-xl leading-relaxed"
        >
          Chronological timeline of engineering tenures in high-performance web
          systems, banking architectures, and real-time platforms. Click any
          milestone to open full dossier.
        </p>
      </div>
    </div>
  </div>

  <!-- TIMELINE CONTAINER (Pure Natural Vertical Scroll with Axis Line) -->
  <div class="relative w-full max-w-5xl mx-auto">
    <!-- Continuous Red Vertical Timeline Axis (Garis Waktu Utama) -->
    <div
      class="absolute left-3.5 sm:left-4 md:left-8 top-3 bottom-6 w-[2px] bg-[#FF0000]/40 -z-0"
      aria-hidden="true"
    >
      <!-- Pulsing top origin marker -->
      <div class="absolute -top-1.5 -left-[3px] h-2 w-2 bg-[#FF0000]"></div>
      <!-- Base end cap marker -->
      <div class="absolute -bottom-1 -left-[3px] h-2 w-2 bg-[#FF0000]"></div>
    </div>

    <!-- Timeline Entries -->
    <div
      class="flex flex-col gap-10 sm:gap-14 pl-10 sm:pl-14 md:pl-20 relative z-10"
    >
      {#each experiencesArray as exp, index (exp.company + exp.startDate)}
        <div class="relative flex flex-col items-start group">
          <!-- Timeline Node Marker Centered Directly on the Vertical Line -->
          <div
            class="absolute -left-[35px] sm:-left-[49px] md:-left-[73px] top-1 flex items-center justify-center h-5 w-5 border-2 border-[#FF0000] bg-black rotate-45 group-hover:bg-[#FF0000] transition-colors"
            aria-hidden="true"
          >
            <div
              class="h-1.5 w-1.5 bg-[#FF0000] group-hover:bg-black transition-colors"
            ></div>
          </div>

          <!-- Date & Phase Badge (Stempel Garis Waktu) -->
          <div class="flex flex-wrap items-center gap-3 mb-3">
            <span
              class="inline-block bg-black border border-[#FF0000] px-3 py-1 font-mono text-xs sm:text-sm font-bold text-[#FF0000] shadow-[3px_3px_0px_#FF0000]"
            >
              TIMELINE: {exp.startDate.toUpperCase()} // {exp.endDate.toUpperCase()}
            </span>
            <span class="font-mono text-xs text-[#FF0000]/70">
              [PHASE 0{index + 1}]
            </span>
            <span
              class="text-[11px] font-mono text-[#FF0000] bg-black border border-[#FF0000]/60 px-2 py-0.5"
            >
              {exp.endDate === "Present" ? "STATUS: ACTIVE" : "ARCHIVED"}
            </span>
          </div>

          <!-- Milestone Dossier Card -->
          <div
            class="dither-card w-full p-6 sm:p-8 flex flex-col justify-between bg-black cursor-pointer group focus-visible:outline-2 focus-visible:outline-[#FF0000]"
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
            <!-- Card Header -->
            <div>
              <div
                class="flex items-center justify-between border-b border-[#FF0000]/40 pb-3 mb-4"
              >
                <span class="font-mono text-xs text-[#FF0000]">
                  REF: EXP-0{index + 1} // {exp.position.toUpperCase()}
                </span>
                <span class="text-xs font-mono text-[#FF0000]/80">
                  {exp.company}
                </span>
              </div>

              <!-- Role & Company -->
              <h3
                class="font-h3 text-xl sm:text-2xl text-[#FF0000] font-bold group-hover:underline"
              >
                {exp.role}
              </h3>
              <h4
                class="font-h4 text-sm sm:text-base text-[#FF0000] mt-1 font-semibold"
              >
                @{exp.company}
              </h4>

              <!-- Description -->
              <p
                class="font-body text-[#FF0000] mt-4 line-clamp-3 leading-relaxed text-sm sm:text-base"
              >
                {exp.description}
              </p>
            </div>

            <!-- Skills & Trigger -->
            <div class="mt-6 pt-4 border-t border-[#FF0000]/40">
              <div class="flex flex-wrap gap-1.5 mb-4">
                {#each exp.skills as skill}
                  <span
                    class="text-[11px] font-mono border border-[#FF0000]/70 px-2 py-0.5 text-[#FF0000] bg-black"
                  >
                    #{skill}
                  </span>
                {/each}
              </div>

              <div
                class="flex items-center justify-between text-xs font-mono font-bold text-[#FF0000] group-hover:text-black group-hover:bg-[#FF0000] p-2 transition-colors border border-[#FF0000]/40"
              >
                <span>OPEN FULL DOSSIER</span>
                <span aria-hidden="true">[+]</span>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Detail Dossier Modal -->
<ExperienceModal
  isOpen={isModalOpen}
  experience={selectedExperience}
  onClose={closeModal}
/>
