# Infotron Solutions Website

A premium, modern website for Infotron Solutions - an IT Services & Talent Solutions firm.

## Tech Stack

- **Frontend**: React 18 with Create React App
- **Styling**: TailwindCSS 3.x
- **UI Components**: Shadcn/UI
- **Build Tool**: Craco (Create React App Configuration Override)
- **Routing**: React Router DOM v6

## Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/              # Shadcn UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── ScrollToTop.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Careers.jsx
│   │   ├── Resources.jsx
│   │   ├── StaffAugmentation.jsx
│   │   ├── ManagedServices.jsx
│   │   ├── BusinessConsulting.jsx
│   │   ├── PrivacyPolicy.jsx
│   │   └── TermsOfService.jsx
│   ├── data/
│   │   └── mockData.js      # Static content data
│   ├── lib/
│   │   └── utils.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
├── craco.config.js
├── tailwind.config.js
├── jsconfig.json
└── README.md
```

## Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

## Installation

1. **Clone or extract the project**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_BACKEND_URL=https://your-domain.com
   ```
   
   For local development:
   ```env
   REACT_APP_BACKEND_URL=http://localhost:3000
   ```

## Development

Start the development server:

```bash
npm start
# or
yarn start
```

The app will run at `http://localhost:3000`

## Production Build

Create an optimized production build:

```bash
npm run build
# or
yarn build
```

The build output will be in the `build/` directory.

## Deployment Options

### Option 1: Static Hosting (Recommended)

The built files can be deployed to any static hosting service:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop the `build` folder
- **AWS S3 + CloudFront**: Upload `build` folder to S3
- **GitHub Pages**: Use `gh-pages` package

### Option 2: Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf` for SPA routing:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Build and run:

```bash
docker build -t infotron-website .
docker run -p 80:80 infotron-website
```

### Option 3: Node.js Server

Install `serve` globally:

```bash
npm install -g serve
```

Serve the build:

```bash
serve -s build -l 3000
```

## Third-Party Integrations

### CEIPAL Job Listings

The Careers page integrates with CEIPAL for live job listings. The widget is configured in `src/pages/Careers.jsx`. To update:

1. Get your CEIPAL Portal ID and API key
2. Update the script in Careers.jsx:
   ```javascript
   window.CeipalJobsWidgetConfig = {
     PortalId: "YOUR_PORTAL_ID",
     ApiKey: "YOUR_API_KEY"
   };
   ```

### Contact Form (Future: HubSpot)

The contact form is ready for HubSpot integration. To enable:

1. Create a HubSpot form
2. Update `src/pages/Contact.jsx` with your HubSpot form ID
3. Add the HubSpot tracking script to `public/index.html`

## Customization

### Updating Content

Most static content is in `src/data/mockData.js`:
- Services descriptions
- Company stats
- Case studies
- Blog posts
- Testimonials

### Updating Styles

- Global styles: `src/App.css`
- Tailwind config: `tailwind.config.js`
- Component styles: Individual component files

### Updating Logo

Replace the logo URL in:
- `src/components/Header.jsx`
- `src/components/Footer.jsx`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary - Infotron Solutions

## Support

For technical support, contact: contact@infotronsolutions.com
