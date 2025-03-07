export type Theme = 'system' | 'dark' | 'drake';
export type ThemesProps = {
  id: Theme;
  name: string;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
};

export const applyTheme = (theme: Theme) => {
  switch (theme) {
    case 'drake':
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'drake');
      localStorage.setItem('theme', 'drake');
      break;
    case 'dark':
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'black');
      localStorage.setItem('theme', 'dark');
      break;
    case 'system':
    default:
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'drake');
        localStorage.removeItem('theme');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'drake');
        localStorage.removeItem('theme');
      }
      break;
  }
};
