# STEM on the Road

A website documenting a summer 2026 road trip research project exploring STEM education in rural America.

## Quick Start

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Adding Content

All content lives in `src/data/` as JSON files. To add new content, edit the relevant file:

### Add a new town to the map

Edit `src/data/towns.json` and add an entry:

```json
{
  "slug": "town-name-st",
  "name": "Town Name",
  "state": "State",
  "lat": 40.0,
  "lng": -90.0,
  "summary": "Brief description of what you found here.",
  "date": "2026-07-15",
  "image": "/images/towns/town-name.jpg"
}
```

### Add a road update

Edit `src/data/shorts.json`:

```json
{
  "id": "4",
  "townSlug": "town-name-st",
  "date": "2026-07-15",
  "title": "Your update title",
  "text": "What happened today...",
  "image": ""
}
```

### Add a vlog/reflection

Edit `src/data/vlogs.json`:

```json
{
  "id": "3",
  "townSlug": "town-name-st",
  "date": "2026-07-16",
  "title": "Week N Reflection: Title Here",
  "youtubeId": "dQw4w9WgXcQ",
  "reflection": "Your written reflection..."
}
```

To get the YouTube ID: go to your video on YouTube, look at the URL — the ID is the part after `v=`. For example, in `youtube.com/watch?v=dQw4w9WgXcQ`, the ID is `dQw4w9WgXcQ`.

### Add an interview

Edit `src/data/interviews.json`:

```json
{
  "id": "4",
  "townSlug": "town-name-st",
  "date": "2026-07-15",
  "personName": "Jane Doe",
  "role": "Science Teacher",
  "school": "Town High School",
  "photo": "",
  "questions": [
    {
      "q": "Your question here?",
      "a": "Their answer here."
    }
  ]
}
```

### Add the documentary video

Edit `src/pages/Documentary.jsx` and replace the empty string in `documentaryYoutubeId` with your YouTube video ID.

## Adding Photos

Drop image files into `public/images/towns/` and reference them in your JSON as `/images/towns/filename.jpg`.

## Deploy

This project is designed to deploy on [Vercel](https://vercel.com):

1. Push to GitHub
2. Import the repo on Vercel
3. It auto-detects Vite and deploys

Every future push automatically redeploys.

## Tech Stack

- React + Vite
- Tailwind CSS
- React Router
- react-simple-maps (interactive US map)
