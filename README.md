# Drill4Job - Angular Recreation

This is a recreation of the Drill4Job project using Angular framework, following the specified component structure.

## Project Structure

```
drill4job-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── service-card/
│   │   │   │   ├── service-card.component.ts
│   │   │   │   ├── service-card.component.html
│   │   │   │   ├── service-card.component.css
│   │   │   │   └── service-card.component.spec.ts
│   │   │   ├── header/
│   │   │   │   ├── header.component.ts
│   │   │   │   ├── header.component.html
│   │   │   │   ├── header.component.css
│   │   │   │   └── header.component.spec.ts
│   │   │   └── location-bar/
│   │   │       ├── location-bar.component.ts
│   │   │       ├── location-bar.component.html
│   │   │       ├── location-bar.component.css
│   │   │       └── location-bar.component.spec.ts
│   │   ├── models/
│   │   │   └── service.model.ts
│   │   ├── services/
│   │   │   └── data.service.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   └── app.component.css
│   ├── assets/
│   │   └── images/
│   ├── styles.css
│   └── index.html
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## Features

- **Header Component**: Displays the Drill4Job logo, tagline, and status bar
- **Location Bar Component**: Shows current location with ability to change
- **Service Card Component**: Displays individual services with icons, prices, and ratings
- **Data Service**: Provides service data to components
- **Service Model**: TypeScript interface for service data structure
- **Responsive Design**: Mobile-friendly layout
- **Modern Styling**: Clean, professional appearance matching the original design

## Services Available

1. **Elétrica** - Starting from 250 MZN (Rating: 4.8)
2. **Canalização** - Starting from 200 MZN (Rating: 4.7)
3. **Solar** - Starting from 500 MZN (Rating: 4.9)
4. **Eletrónica** - Starting from 150 MZN (Rating: 4.6)
5. **Ar Condicionado** - Starting from 300 MZN (Rating: 4.5)
6. **Eletrodomésticos** - Starting from 180 MZN (Rating: 4.7)
7. **Carpintaria** - Starting from 220 MZN (Rating: 4.6)
8. **Pintura** - Starting from 160 MZN (Rating: 4.4)

## Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Architecture

This project uses Angular's standalone components architecture for better modularity and performance. Each component is self-contained and can be easily reused or modified.

### Components
- **AppComponent**: Main application component that orchestrates other components
- **HeaderComponent**: Displays branding and status information
- **LocationBarComponent**: Handles location selection functionality
- **ServiceCardComponent**: Reusable component for displaying service information

### Services
- **DataService**: Centralized service for managing application data

### Models
- **Service**: TypeScript interface defining the structure of service objects

## Styling

The application uses a modern, responsive design with:
- Blue gradient header (#4A90E2 to #357ABD)
- Clean white service cards with subtle shadows
- Red emergency banner (#FF5252)
- Yellow rating badges (#FFD700)
- Mobile-responsive grid layout

## Future Enhancements

- Add routing for individual service pages
- Implement location selection functionality
- Add service booking capabilities
- Integrate with backend API
- Add user authentication
- Implement search functionality
