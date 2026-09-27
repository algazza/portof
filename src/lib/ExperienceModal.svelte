<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  export let isOpen: boolean = false;
  export let experience: {
    role: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    skills: string[];
  } | null = null;
  export let onClose: () => void;

  let modalEl: HTMLDivElement;
  let closeButtonEl: HTMLButtonElement;

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape" && isOpen) {
      onClose();
    }
  }

  $: if (isOpen && closeButtonEl) {
    setTimeout(() => {
      closeButtonEl?.focus();
    }, 50);
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
  });

  onDestroy(() => {
    window.removeEventListener("keydown", handleKeydown);
  });
</script>

{#if isOpen && experience}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    tabindex="-1"
  >
    <div
      class="absolute inset-0 cursor-pointer"
      on:click={onClose}
      aria-hidden="true"
    ></div>

    <div
      bind:this={modalEl}
      class="relative z-10 w-full max-w-2xl bg-black border-2 border-[#FF0000] p-6 md:p-8 shadow-[8px_8px_0px_#FF0000] dither-grid-fine"
    >
      <div
        class="flex items-start justify-between border-b border-[#FF0000] pb-4 mb-6"
      >
        <div>
          <span class="font-caption text-[#FF0000] tracking-widest block mb-1">
            RECORD // DOSSIER: {experience.position.toUpperCase()}
          </span>
          <h3 id="modal-title" class="font-h3 text-[#FF0000] font-bold">
            {experience.role}
          </h3>
          <p class="font-body text-[#FF0000] font-semibold mt-1">
            {experience.company}
          </p>
        </div>

        <button
          bind:this={closeButtonEl}
          type="button"
          on:click={onClose}
          class="btn-brutalist p-2 min-h-[44px] min-w-[44px] text-xs font-mono font-bold"
          aria-label="Close dossier dialog"
        >
          [ESC] ✕
        </button>
      </div>

      <div
        class="inline-flex items-center gap-2 border border-[#FF0000] px-3 py-1 mb-6 bg-black"
      >
        <span class="h-2 w-2 bg-[#FF0000]" aria-hidden="true"></span>
        <span class="font-caption text-[#FF0000] font-mono tracking-wider">
          TIMELINE: {experience.startDate} — {experience.endDate}
        </span>
      </div>

      <div class="mb-8">
        <h4 class="font-h4 text-[#FF0000] mb-2">// SCOPE & IMPACT</h4>
        <p class="font-body text-[#FF0000] leading-relaxed">
          {experience.description}
        </p>
      </div>

      <div>
        <h4 class="font-h4 text-[#FF0000] mb-3">// TECHNOLOGIES & TOOLS</h4>
        <div class="flex flex-wrap gap-2">
          {#each experience.skills as skill}
            <span
              class="border border-[#FF0000] px-2.5 py-1 text-xs font-mono font-medium text-[#FF0000] bg-black"
            >
              #{skill}
            </span>
          {/each}
        </div>
      </div>

      <div
        class="mt-8 pt-4 border-t border-[#FF0000]/40 flex justify-between items-center text-[10px] font-mono text-[#FF0000]/70"
      >
        <span>STATUS: VERIFIED</span>
      </div>
    </div>
  </div>
{/if}
