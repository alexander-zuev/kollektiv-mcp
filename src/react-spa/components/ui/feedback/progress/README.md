# Progress Components

This directory contains components for displaying loading states and progress indicators in your application.

## Components

### Progress

A horizontal progress bar that visualizes completion percentage.

```tsx
import { Progress } from '@/components/ui/feedback/progress';

// Basic usage
<Progress value={33} />

// Custom styling
<Progress value={75} className="h-2 w-64" />
```

#### Props

- `value`: Number between 0-100 representing completion percentage
- `className`: Optional custom classes
- All standard HTML div props are also supported

#### Structure

- The component consists of two main parts:
  - The track (container): Uses `bg-secondary` for the background
  - The indicator (fill): Uses `bg-primary` for the filled portion

#### Notes

- The Progress component doesn't have explicit active/inactive states
- It's always visible when rendered and shows progress based on the value
- For indeterminate progress, consider using LoadingSpinner instead

### LoadingSpinner

A circular loading spinner for indeterminate loading states.

```tsx
import { LoadingSpinner } from '@/components/ui/feedback/progress';

// Basic usage
<LoadingSpinner />

// With custom size and text
<LoadingSpinner size="lg" text="Processing..." />

// Without text
<LoadingSpinner text="" />
```

#### Props

- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `text`: String to display below spinner (default: 'Loading...')
- `className`: Optional custom classes

#### Notes

- Always displays as "active" when rendered
- Use conditional rendering to show/hide the spinner based on loading state

### Skeleton

A placeholder loading state that pulses to indicate content is loading.

```tsx
import { Skeleton } from '@/components/ui/feedback/progress';

// Basic usage
<Skeleton className="h-4 w-full" />

// For a card placeholder
<div className="space-y-2">
  <Skeleton className="h-12 w-12 rounded-full" />
  <Skeleton className="h-4 w-[250px]" />
  <Skeleton className="h-4 w-[200px]" />
</div>
```

#### Props

- `className`: Optional custom classes (required for dimensions)
- All standard HTML div props are also supported

#### Notes

- Always displays with animation when rendered
- Use conditional rendering to show/hide based on loading state
