<script lang="ts">
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { onMount } from "svelte";
  import { projectsArray } from "../constanta/projects";
  import GooeyHeading from "./GooeyHeading.svelte";

  gsap.registerPlugin(ScrollTrigger);

  let sectionEl: HTMLElement;
  let bodyMaskedEl: HTMLElement;

  onMount(() => {
    const ctx = gsap.context(() => {
      // Reversible masked body text entrance and exit (R-19, R-31, strictly NO opacity)
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
  id="projects"
  bind:this={sectionEl}
  class="relative min-h-screen w-full bg-black border-b border-[#FF0000]/30 py-24 px-4 sm:px-6 md:px-16"
>
  <!-- Section Title -->
  <div class="mb-12 max-w-3xl">
    <div class="flex items-center gap-2 mb-2">
      <span class="h-2 w-2 bg-[#FF0000]" aria-hidden="true"></span>
      <span class="font-caption text-[#FF0000] tracking-widest text-xs"
        >// DIRECTORY 03</span
      >
    </div>

    <GooeyHeading level="h2" text="SELECTED PROJECTS" />

    <!-- Masked Body Description (STRICT: NO OPACITY FADE-IN, REVERSIBLE) -->
    <div class="masked-body-wrapper mt-4">
      <div bind:this={bodyMaskedEl} class="masked-body-content">
        <p
          class="font-body text-[#FF0000] text-sm md:text-base max-w-2xl leading-relaxed"
        >
          Curated showcase of web applications, client solutions, and
          open-source contributions. Built with resilient architectures and
          attention to interface dynamics.
        </p>
      </div>
    </div>
  </div>

  <!-- Brutalist Project Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
    {#each projectsArray as project, index (project.title)}
      {@const hasLiveLink = Boolean(project.link && project.link.trim() !== "")}
      <article
        class="dither-card bg-black border-2 border-[#FF0000] flex flex-col justify-between overflow-hidden group {hasLiveLink
          ? 'hover:shadow-[8px_8px_0px_#FF0000]'
          : 'opacity-95'}"
      >
        <!-- Mockup Visual Display -->
        <div
          class="relative w-full aspect-[16/9] border-b-2 border-[#FF0000] bg-black overflow-hidden"
        >
          <img
            src={project.image}
            alt="Preview of {project.title}"
            class="w-full h-full object-cover object-center grayscale contrast-150 brightness-90 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          <!-- Red Tint & Halftone Dither Overlay -->
          <div
            class="pointer-events-none absolute inset-0 bg-[#FF0000]/20 mix-blend-color"
          ></div>
          <div
            class="halftone-overlay pointer-events-none absolute inset-0 opacity-40 mix-blend-screen group-hover:opacity-20 transition-opacity"
          ></div>

          <!-- Status Badge in Image Corner -->
          <div
            class="absolute top-3 left-3 bg-black border border-[#FF0000] px-2.5 py-1 text-[11px] font-mono text-[#FF0000]"
          >
            INDEX: PRJ-0{index + 1} // {project.context.toUpperCase()}
          </div>

          {#if hasLiveLink}
            <div
              class="absolute top-3 right-3 bg-[#FF0000] text-black px-2.5 py-1 text-[11px] font-mono font-bold tracking-wider"
            >
              LIVE APP AVAILABLE
            </div>
          {:else}
            <div
              class="absolute top-3 right-3 bg-black border border-[#FF0000] text-[#FF0000] px-2.5 py-1 text-[11px] font-mono tracking-wider"
            >
              {project.FERepo || project.BERepo
                ? "SOURCE CODE AVAILABLE"
                : "PRIVATE DEPLOYMENT"}
            </div>
          {/if}
        </div>

        <!-- Content Area -->
        <div class="p-6 md:p-8 flex flex-col flex-1 justify-between">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="text-xs font-mono text-[#FF0000]/80"
                >ROLE: {project.role}</span
              >
            </div>

            <h3 class="font-h3 text-[#FF0000] font-bold">
              {project.title}
            </h3>

            <p
              class="font-body text-[#FF0000] mt-3 leading-relaxed text-sm md:text-base"
            >
              {project.description}
            </p>
          </div>

          <div class="mt-6 pt-4 border-t border-[#FF0000]/40">
            <!-- Tech Stack Tags -->
            <div class="flex flex-wrap gap-2 mb-6">
              {#each project.tech_stack as tech}
                <span
                  class="text-xs font-mono border border-[#FF0000] px-2 py-0.5 text-[#FF0000] bg-black"
                >
                  {tech}
                </span>
              {/each}
            </div>

            <!-- Action Links: Guaranteed working links, zero dead controls -->
            <div class="flex flex-wrap items-center gap-3">
              {#if hasLiveLink}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-brutalist text-xs font-mono font-bold"
                  aria-label="Visit live website for {project.title}"
                >
                  LAUNCH LIVE SITE
                  <span class="ml-2" aria-hidden="true">↗</span>
                </a>
              {/if}

              {#if project.FERepo}
                <a
                  href={project.FERepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-brutalist-outline text-xs font-mono font-bold"
                  aria-label="View frontend source repository for {project.title}"
                >
                  FRONTEND REPO
                  <span class="ml-1.5" aria-hidden="true">↗</span>
                </a>
              {/if}

              {#if project.BERepo}
                <a
                  href={project.BERepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-brutalist-outline text-xs font-mono font-bold"
                  aria-label="View backend source repository for {project.title}"
                >
                  BACKEND REPO
                  <span class="ml-1.5" aria-hidden="true">↗</span>
                </a>
              {/if}

              {#if !hasLiveLink && !project.FERepo && !project.BERepo}
                <span
                  class="inline-flex items-center text-xs font-mono border border-[#FF0000]/50 px-3 py-2 text-[#FF0000]/80"
                >
                  // ENTERPRISE PROJECT [CONFIDENTIAL CODEBASE]
                </span>
              {/if}
            </div>
          </div>
        </div>
      </article>
    {/each}
  </div>
</section>
