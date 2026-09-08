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

const jobList = document.getElementById("jobs-list");

const response = await fetch("/data.json");
const jobs: Job[] = await response.json();

function filterJobs(selectedTags: string[]) {
  const filteredJobs = jobs.filter((job) => {
    const jobTags = [job.role, job.level, ...job.languages, ...job.tools];

    return selectedTags.every((tag) => jobTags.includes(tag));
  });

  renderJobs(filteredJobs);
}

function renderJobs(jobs: Job[]) {
  if (!jobList) return;

  jobList.innerHTML = "";

  jobs.forEach((job) => {
    const li = document.createElement("li");

    li.classList.add(
      "job-card",
      "w-[900px]",
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
        class="flex flex-row justify-between items-center"
      >
        
        <div
          id="left-side"
          class="flex flex-row gap-4 items-center w-[250px]"
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

        <div class="right-side">
          <ul class="flex flex-row gap-4">
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
