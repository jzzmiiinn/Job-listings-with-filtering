import "./style.css";

interface Job {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
}

const filterBar = document.getElementById("filter-bar");
const selectedTagsContainer = document.getElementById("selected-tags");
const clearBtn = document.getElementById("clear-btn");
const jobList = document.getElementById("jobs-list");

let selectedTags: string[] = [];

clearBtn?.addEventListener("click", () => {
  selectedTags = [];
  renderSelectedTags();
  filterJobs();
});

function renderSelectedTags() {
  if (!selectedTagsContainer) return;

  selectedTagsContainer.innerHTML = "";

  if (selectedTags.length === 0) {
    filterBar?.classList.add("hidden");
    return;
  }

  filterBar?.classList.remove("hidden");

  selectedTags.forEach((tag) => {
    const tagElement = document.createElement("div");

    tagElement.classList.add(
      "flex",
      "items-center",
      "bg-[hsl(180,52%,96%)]",
      "text-[hsl(180,29%,50%)]",
      "font-bold",
      "rounded-md",
      "overflow-hidden",
    );

    tagElement.innerHTML = `
      <span class="px-2 py-1">${tag}</span>

      <button
        class="bg-[hsl(180,29%,50%)] text-white px-2 py-1"
      >
        ×
      </button>
    `;

    const removeBtn = tagElement.querySelector("button");

    removeBtn?.addEventListener("click", () => {
      selectedTags = selectedTags.filter((selectedTag) => selectedTag !== tag);

      renderSelectedTags();
      filterJobs();
    });

    selectedTagsContainer.append(tagElement);
  });
}

function filterJobs() {
  const filteredJobs = jobs.filter((job) => {
    const jobTags = [job.role, job.level, ...job.languages, ...job.tools];

    return selectedTags.every((tag) => jobTags.includes(tag));
  });

  renderJobs(filteredJobs);
}

const response = await fetch("/data.json");
const jobs: Job[] = await response.json();

function renderJobs(jobs: Job[]) {
  if (!jobList) return;

  jobList.innerHTML = "";

  jobs.forEach((job) => {
    const li = document.createElement("li");

    li.classList.add(
      "job-card",
      "w-[90%]",
      "max-w-[900px]",
      "flex",
      "flex-col",
      "gap-4",
      "p-4",
      "bg-white",
      "rounded-lg",
      "shadow-md",
    );

    li.innerHTML = `
      <div
        id="job-card"
        class="flex flex-col gap-5 md:flex-row md:justify-between md:items-center"
      >
        
        <div
          id="left-side"
          class="flex flex-row gap-4 items-center"
        >
          
          <img
            src="${job.logo}"
            alt="${job.company} Logo"
            class="w-18 h-18"
          />

          <div id="job-info" class="flex flex-col gap-2">
            
            <div
              id="job-titles"
              class="flex flex-row gap-4 items-center"
            >
              <p class="text-[hsl(180,29%,50%)] font-bold">
                ${job.company}
              </p>

              ${
                job.new
                  ? `<span class="bg-[hsl(180,29%,50%)] font-bold text-white rounded-2xl py-1 px-2 text-xs">
                      NEW!
                    </span>`
                  : ""
              }

              ${
                job.featured
                  ? `<span class="bg-[hsl(180,14%,20%)] font-bold text-white rounded-2xl py-1 px-2 text-xs">
                      FEATURED
                    </span>`
                  : ""
              }
            </div>

            <p class="font-bold">
              ${job.position}
            </p>

            <div class="flex flex-row gap-4 text-gray-600">
              <p>${job.postedAt}</p>
              <span>·</span>
              <p>${job.contract}</p>
              <span>·</span>
              <p>${job.location}</p>
            </div>

          </div>
        </div>

        <div class="right-side w-full md:w-auto">
          <ul class="flex flex-wrap gap-2 md:gap-4">
            ${[job.role, job.level, ...job.languages, ...job.tools]
              .map(
                (tag) => `
                  <li
                    data-tag="${tag}"
                    class="tag bg-[hsl(180,52%,96%)]
                           text-[hsl(180,29%,50%)]
                           p-1
                           font-bold
                           text-sm
                           cursor-pointer"
                  >
                    ${tag}
                  </li>
                `,
              )
              .join("")}
          </ul>
        </div>

      </div>
    `;

    jobList.append(li);
  });
}

renderJobs(jobs);

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  if (!target.classList.contains("tag")) return;

  const tag = target.dataset.tag;

  if (!tag) return;

  if (!selectedTags.includes(tag)) {
    selectedTags.push(tag);
  }

  renderSelectedTags();
  filterJobs();
});
