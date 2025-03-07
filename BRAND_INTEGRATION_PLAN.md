# Brand Identity Integration Plan

## Overview

This document outlines how we've integrated the Drake Brand Identity from [brand-page-identity](https://github.com/Drakeyves/brand-page-identity) into our SaaS Starter Kit. We've created a modern UI/UX while maintaining existing functionality.

> **JUNIOR DEV NOTE:** This document serves as a reference for implementing our brand's visual identity. Each section details what was done, which files were modified, and how the components work together.

## Current Project Analysis

Our project uses:
- Next.js 15.2.0
- React 18.3.1
- Tailwind CSS 3.4.17
- DaisyUI 4.12.24
- TypeScript 5.7.3

> **JUNIOR DEV NOTE:** Understanding our tech stack is crucial. We're using Next.js (a React framework), Tailwind (for styling), DaisyUI (for pre-built components), and TypeScript (for type safety). This affects how we implemented our brand identity.

## Brand Identity Elements

### Color Palette
```
Background:    Default #0D0D14, Secondary #141421
Accent Purple: Light #9F7AEA, Default #7A6FE3, Dark #553C9A
Accent Teal:   Light #2ED6A7, Default #25B592, Dark #1C8870
Accent Gold:   Light #F7B731, Default #F5A623, Dark #D48806
Accent Metallic: Light #C5C5D3, Default #A1A1B5, Dark #71718A
```

> **JUNIOR DEV NOTE:** These colors form our brand's visual foundation. The background colors create our dark theme, while the accent colors provide visual hierarchy and interactive elements. Always use these exact hex values for consistency.

### Key Components & Effects
- Modern typography with responsive sizing
- Enhanced buttons, badges, cards, and form elements
- Animations: gradients, floating elements, glows, transitions
- Custom scrollbars and loading indicators

> **JUNIOR DEV NOTE:** These elements work together to create our brand's unique look and feel. The animations and effects should be subtle and enhance the user experience, not distract from it.

## Implementation Details

### Phase 1: Foundation - ✅ COMPLETED

1. **Update Tailwind Configuration** ✅
   - **File:** `tailwind.config.js`
   - Added custom color palette to Tailwind configuration
   - Created a custom DaisyUI theme named 'drake'
   - Set 'drake' as the default dark theme
   - Removed light theme options to enforce dark mode only

   ```js
   // tailwind.config.js
   colors: {
     background: {
       DEFAULT: '#0d0d14',
       secondary: '#141421',
     },
     'accent-purple': {
       light: '#9F7AEA',
       DEFAULT: '#7A6FE3',
       dark: '#553C9A',
     },
     // Additional colors...
   }
   
   // DaisyUI theme configuration
   daisyui: {
     themes: [
       {
         drake: {
           "primary": "#7A6FE3",    // Our accent-purple
           "secondary": "#25B592",  // Our accent-teal
           "accent": "#F5A623",     // Our accent-gold
           "neutral": "#A1A1B5",    // Our accent-metallic
           "base-100": "#0d0d14",   // Our background
           // Additional theme colors...
         }
       },
       'black'  // Alternative dark theme
     ],
     darkTheme: "drake", // Set drake as the default dark theme
   }
   ```

2. **Update Global CSS** ✅
   - **File:** `styles/globals.css`
   - Added CSS variables for brand colors
   - Created component styles using Tailwind's @layer directive
   - Added custom scrollbar styling
   - Implemented gradient effects for buttons

   ```css
   /* styles/globals.css */
   :root {
     --background: #0d0d14;
     --background-secondary: #141421;
     --accent-purple: #7a6fe3;
     /* Additional CSS variables... */
   }
   
   @layer components {
     .btn-primary {
       @apply bg-gradient-to-r from-accent-purple to-accent-purple-dark text-white
              hover:from-accent-purple-dark hover:to-accent-purple
              shadow-lg shadow-accent-purple/20;
     }
     /* Additional component styles... */
   }
   ```

3. **Create Utility Functions** ✅
   - **File:** `lib/utils.ts`
   - Created a utility function for conditional class names
   - Used throughout components for clean, readable code

   ```tsx
   // lib/utils.ts
   export function cn(...classes: (string | undefined | boolean | null)[]) {
     return classes.filter(Boolean).join(' ');
   }
   ```

4. **Theme System Implementation** ✅
   - **Files:** 
     - `lib/theme.ts` - Core theme functionality
     - `hooks/useTheme.ts` - React hook for theme management
   - Implemented dark-mode-only theme system
   - Created toggle between 'drake' and 'dark' themes
   - Ensured theme persistence through localStorage

   ```tsx
   // lib/theme.ts
   export type Theme = 'system' | 'dark' | 'drake';
   
   export const applyTheme = (theme: Theme) => {
     // Implementation details...
   }
   
   // hooks/useTheme.ts
   const toggleTheme = () => {
     // Toggle between drake and dark themes only
     if (selectedTheme.id === 'drake') {
       applyTheme('dark');
       setTheme('dark');
     } else {
       applyTheme('drake');
       setTheme('drake');
     }
   };
   ```

### Phase 2: Core Components - ✅ COMPLETED

1. **Button Component** ✅
   - **File:** `components/shared/Button.tsx`
   - Created with 5 variants: primary, secondary, accent, outline, ghost
   - Supports 3 sizes: sm, md, lg
   - Includes loading state and fullWidth option
   - Uses gradient backgrounds and subtle shadows

   ```tsx
   // components/shared/Button.tsx
   export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
     variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
     size?: 'sm' | 'md' | 'lg';
     loading?: boolean;
     fullWidth?: boolean;
   }
   
   export const Button = ({ 
     variant = 'primary',
     size = 'md',
     loading = false,
     fullWidth = false,
     className,
     disabled,
     children,
     ...props
   }: ButtonProps) => {
     // Implementation details...
   };
   ```

2. **Card Component** ✅
   - **File:** `components/shared/Card.tsx`
   - Updated with brand styling and hover variant
   - Includes Header, Body, Footer, Title, and Description sub-components
   - Uses gradient backgrounds and subtle border effects

   ```tsx
   // components/shared/Card.tsx
   interface CardProps {
     children: React.ReactNode;
     variant?: 'default' | 'hover';
     className?: string;
   }
   
   const Card = ({ 
     children, 
     variant = 'default',
     className 
   }: CardProps) => {
     return (
       <div className={cn(
         variant === 'default' ? 'card-drake' : 'card-drake-hover',
         'w-full',
         className
       )}>
         {children}
       </div>
     );
   };
   ```

3. **Badge Component** ✅
   - **File:** `components/shared/Badge.tsx`
   - Updated with 5 color variants: default, purple, teal, gold, metallic
   - Uses semi-transparent backgrounds for a modern look

   ```tsx
   // components/shared/Badge.tsx
   interface DrakeBadgeProps extends Omit<BadgeProps, 'variant'> {
     drakeVariant?: 'purple' | 'teal' | 'gold' | 'metallic' | 'default';
   }
   
   const Badge = (props: DrakeBadgeProps) => {
     const { children, className, drakeVariant = 'default', ...rest } = props;
     
     const variantClasses = {
       purple: 'bg-accent-purple/10 text-accent-purple-light',
       teal: 'bg-accent-teal/10 text-accent-teal-light',
       gold: 'bg-accent-gold/10 text-accent-gold-light',
       metallic: 'bg-accent-metallic/10 text-accent-metallic-light',
       default: 'badge-drake',
     };
     
     // Implementation details...
   };
   ```

4. **LoadingSpinner Component** ✅
   - **File:** `components/shared/LoadingSpinner.tsx`
   - Created with 3 variants: primary, secondary, accent
   - Supports 3 sizes: sm, md, lg
   - Uses border animation for smooth spinning effect

   ```tsx
   // components/shared/LoadingSpinner.tsx
   interface LoadingSpinnerProps {
     size?: 'sm' | 'md' | 'lg';
     variant?: 'primary' | 'secondary' | 'accent';
     className?: string;
   }
   
   export const LoadingSpinner = ({
     size = 'md',
     variant = 'primary',
     className,
   }: LoadingSpinnerProps) => {
     // Implementation details...
   };
   ```

5. **InputField Component** ✅
   - **File:** `components/shared/InputField.tsx`
   - Created with default and filled variants
   - Supports error states, helper text, and icons
   - Uses subtle animations for focus states

   ```tsx
   // components/shared/InputField.tsx
   export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
     label?: string;
     error?: string;
     helperText?: string;
     fullWidth?: boolean;
     variant?: 'default' | 'filled';
     leftIcon?: React.ReactNode;
     rightIcon?: React.ReactNode;
   }
   
   export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
     (
       {
         label,
         error,
         helperText,
         fullWidth = true,
         variant = 'default',
         className,
         leftIcon,
         rightIcon,
         disabled,
         ...props
       },
       ref
     ) => {
       // Implementation details...
     }
   );
   ```

6. **Select Component** ✅
   - **File:** `components/shared/Select.tsx`
   - Created with custom dropdown styling
   - Supports disabled options, error states, and helper text
   - Maintains consistent styling with InputField

   ```tsx
   // components/shared/Select.tsx
   export interface SelectOption {
     value: string;
     label: string;
     disabled?: boolean;
   }
   
   export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
     label?: string;
     options: SelectOption[];
     error?: string;
     helperText?: string;
     fullWidth?: boolean;
     size?: 'sm' | 'md' | 'lg';
   }
   
   export const Select = forwardRef<HTMLSelectElement, SelectProps>(
     (
       {
         label,
         options,
         error,
         helperText,
         fullWidth = true,
         size = 'md',
         className,
         disabled,
         ...props
       },
       ref
     ) => {
       // Implementation details...
     }
   );
   ```

7. **Toggle Component** ✅
   - **File:** `components/shared/Toggle.tsx`
   - Created with 3 color variants: purple, teal, gold
   - Supports 3 sizes and optional description text
   - Uses smooth transition animations

   ```tsx
   // components/shared/Toggle.tsx
   export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
     label?: string;
     description?: string;
     variant?: 'purple' | 'teal' | 'gold';
     toggleSize?: 'sm' | 'md' | 'lg';
   }
   
   export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
     (
       {
         label,
         description,
         variant = 'purple',
         toggleSize = 'md',
         className,
         disabled,
         ...props
       },
       ref
     ) => {
       // Implementation details...
     }
   );
   ```

8. **ThemeToggle Component** ✅
   - **File:** `components/shared/ThemeToggle.tsx`
   - Created for switching between themes
   - Shows tooltip indicating which theme will be activated
   - Uses icon to represent current theme

   ```tsx
   // components/shared/ThemeToggle.tsx
   interface ThemeToggleProps {
     className?: string;
     showLabel?: boolean;
   }
   
   export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
     className,
     showLabel = false
   }) => {
     const { selectedTheme, toggleTheme } = useTheme();
     const Icon = selectedTheme.icon;
     
     // Determine the next theme name for the tooltip
     const nextThemeName = selectedTheme.id === 'drake' ? 'Dark' : 'Drake';
     
     // Implementation details...
   };
   ```

9. **Component Exports** ✅
   - **File:** `components/shared/index.ts`
   - Updated to export all new components
   - Ensures consistent import pattern across the application

   ```tsx
   // components/shared/index.ts
   export { Button } from './Button';
   export { default as Badge } from './Badge';
   export { default as LoadingSpinner } from './LoadingSpinner';
   export { default as InputField } from './InputField';
   export { default as Select } from './Select';
   export { default as Toggle } from './Toggle';
   export { default as ThemeToggle } from './ThemeToggle';
   // Additional exports...
   ```

10. **Test Page** ✅
    - **File:** `pages/brand-test.tsx`
    - Created to showcase all components
    - Includes examples of all variants and states
    - Uses i18n for all text elements

    ```tsx
    // pages/brand-test.tsx
    const BrandTestPage: NextPage = () => {
      const { t } = useTranslation('common');
      const [toggleValue, setToggleValue] = useState(false);
      
      return (
        <div className="min-h-screen bg-background p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-white">{t('drake-brand-components')}</h1>
              <ThemeToggle showLabel />
            </div>
            
            {/* Component sections... */}
          </div>
        </div>
      );
    };
    ```

### Phase 3: Authentication Integration - ✅ COMPLETED

1. **Login Page Updates** ✅
   - **File:** `pages/auth/login.tsx`
   - Integrated brand components into the login page
   - Added test credentials functionality
   - Improved layout and spacing

   ```tsx
   // pages/auth/login.tsx
   // Button to fill test credentials
   <DrakeButton 
     variant="outline" 
     size="sm" 
     type="button"
     onClick={fillTestCredentials}
   >
     {t('sign-in')}
   </DrakeButton>
   <p className="text-xs text-accent-purple-light mt-1">
     {t('test-credentials')}
   </p>
   ```

2. **Authentication Configuration** ✅
   - **File:** `lib/nextAuth.ts`
   - Updated to support test credentials
   - Ensured proper session creation

   ```tsx
   // lib/nextAuth.ts
   // For testing, check if using test credentials
   if (email === testEmail && password === testPassword) {
     // Return a complete test user object
     return {
       id: 'test-user-id',
       name: 'Drake Test User',
       email: testEmail,
       emailVerified: new Date(),
       image: null,
       role: 'ADMIN',
       teams: [{ id: 'test-team-id', name: 'Test Team', role: 'OWNER' }],
     };
   }
   ```

3. **Middleware Updates** ✅
   - **File:** `middleware.ts`
   - Modified to allow access to brand-test page without authentication
   - Updated unauthenticated routes list

   ```tsx
   // middleware.ts
   // Routes that don't require authentication
   const unAuthenticatedRoutes = [
     // Other routes...
     '/brand-test',
     // Additional routes...
   ];
   ```

## Design System Guidelines

### Typography

- Use responsive font sizes:
  - Headings: text-xl to text-3xl with font-semibold or font-bold
  - Body text: text-sm to text-base with font-normal
  - Small text: text-xs with font-medium for labels and helper text

### Spacing

- Consistent spacing using Tailwind's spacing scale:
  - Components: p-6 for cards, p-4 for sections
  - Gaps: gap-2 for related items, gap-4 for sections, gap-6 for major sections
  - Margins: my-4 for vertical spacing, mx-auto for centering

### Colors

- Background colors:
  - Primary: bg-background for page backgrounds
  - Secondary: bg-background-secondary for card backgrounds
  - Gradients: bg-gradient-to-br for subtle depth

- Text colors:
  - Primary: text-white for headings and important text
  - Secondary: text-accent-metallic-light for less important text
  - Accents: text-accent-purple, text-accent-teal, etc. for highlights

- Interactive elements:
  - Buttons: Use gradient backgrounds with hover states
  - Inputs: Use subtle borders with focus states
  - Toggles: Use accent colors to indicate state

### Animations

- Use subtle animations for better UX:
  - Transitions: transition-all duration-200 for smooth state changes
  - Transforms: hover:-translate-y-1 for hover effects
  - Opacity: opacity-60 for disabled states

### Accessibility

- Ensure proper contrast ratios between text and backgrounds
- Use aria-label attributes for interactive elements
- Support keyboard navigation
- Include hover and focus states for all interactive elements

## Next Steps

1. **Dashboard Implementation**
   - Replace existing components with our new ones
   - Update layout and spacing
   - Add subtle animations for transitions

2. **Team Management Pages**
   - Apply brand styling to team management interfaces
   - Ensure consistent component usage

3. **Settings Pages**
   - Update form elements with our new components
   - Maintain consistent spacing and typography

4. **Billing Pages**
   - Apply brand styling to billing interfaces
   - Use appropriate accent colors for pricing information

## Final Notes

- Always use the `cn()` utility for combining class names
- Maintain consistent spacing and typography across all pages
- Use the brand-test page as a reference for component usage
- Ensure all new components follow the established patterns

> **JUNIOR DEV NOTE:** This brand integration transforms our application's look and feel while maintaining functionality. The component system is designed to be flexible and reusable, making it easy to apply to new pages or transfer to other projects. 