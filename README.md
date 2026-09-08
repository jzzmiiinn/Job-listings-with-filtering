# Static Job Listings

A responsive job listings website built with HTML, Tailwind CSS, and TypeScript. Users can filter job listings by role, level, language, and tools.

## Features

- Responsive layout for desktop, tablet, and mobile screens
- Display job listings dynamically from a JSON file
- Filter jobs by:
  - Role
  - Level
  - Languages
  - Tools

- Multiple filters can be selected at the same time
- Remove individual filters
- Clear all selected filters
- Dynamic job filtering
- Responsive filter bar
- Responsive job cards
- Mobile and desktop header backgrounds

## Built With

- HTML5
- Tailwind CSS
- TypeScript
- Vite
- JSON

## Project Structure

```text
static-job-listings/
├── public/
│   ├── assets/
│   │   ├── bg-header-desktop.svg
│   │   ├── bg-header-mobile.svg
│   │   └── ...
│   ├── data.json
│   └── favicon.svg
│
├── src/
│   ├── main.ts
│   └── style.css
│
├── index.html
├── package.json
├── tsconfig.json
└── README.md
```

## How It Works

The job data is stored in `public/data.json`.

Each job contains information such as:

```text
- Company
- Logo
- Position
- Role
- Level
- Posted date
- Contract
- Location
- Languages
- Tools
```

TypeScript fetches the data from the JSON file and dynamically generates the job cards.

### Filtering

When a user clicks a job tag, the tag is added to the selected filters.

For example:

```text
React
Junior
Fullstack
```

The application checks each job's role, level, languages, and tools and only displays jobs matching **all selected filters**.

### Removing Filters

Each selected filter has a remove button.

Removing a filter updates the selected tags and automatically refreshes the job listings.

### Clear Filters

The `Clear` button removes all selected filters and displays all available jobs again.

## Responsive Design

The application is designed to work across different screen sizes.

### Desktop

Job information and filter tags are displayed horizontally.

### Mobile

Job cards stack vertically and job tags wrap onto multiple lines.

Tailwind responsive utilities such as:

```text
md:flex-row
md:justify-between
flex-wrap
w-[90%]
max-w-[900px]
```

are used to adapt the layout.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/jzzmiiinn/Job-listings-with-filtering
```

### 2. Navigate into the project

```bash
cd Job-listings-with-filtering
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The project will be available through the local URL provided by Vite.

## Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Learning Goals

This project was built to practice:

- TypeScript interfaces
- DOM manipulation
- Event listeners
- Array methods
- Filtering arrays
- Fetching JSON data
- Dynamic HTML generation
- Working with `data-*` attributes
- Tailwind CSS
- Responsive design
- Managing application state with TypeScript

## Future Improvements

Possible improvements include:

- Add search functionality
- Add animations when filtering jobs
- Add dark mode
- Add pagination for larger job datasets
- Improve accessibility
- Add job details pages
- Store filter selections in the URL

## Acknowledgments

This project was inspired by the **Frontend Mentor Static Job Listings** challenge.

## Author

Yasmin Ali

Built as part of my frontend development practice while learning TypeScript and responsive UI development.
