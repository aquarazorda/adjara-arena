import { HelpCircle, LucideIcon, Newspaper, ScrollText, Tv, Tv2, UserCircle } from 'lucide-react';
import { LazyExoticComponent, lazy } from 'react';

export type AsyncCommandMenuCompProps = {
  search?: string;
};

export type MenuItem = {
  icon?: LucideIcon;
  title: string;
  route?: string;
  items?: MenuItem[];
  component?: LazyExoticComponent<React.ComponentType<AsyncCommandMenuCompProps>>;
};

export default [
  {
    title: 'suggestions',
    items: [
      {
        icon: Newspaper,
        title: 'add_news',
        items: [
          { icon: Newspaper, title: 'add_article' },
          { icon: Tv2, title: 'add_video' },
        ],
      },
      { icon: HelpCircle, title: 'add_new_quiz' },
      { icon: Tv, title: 'add_setanta_stream' },
    ],
  },
  {
    title: 'users',
    items: [
      { icon: UserCircle, title: 'user_search', component: lazy(() => import('../command-menu-async/user-search')) },
      { icon: ScrollText, title: 'user_logs' },
    ],
  },
] satisfies MenuItem[];
