import { useTranslations } from 'next-intl';
import {
  CalendarIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';


export const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Branches',
    href: '/business-settings',
    icon: CalendarIcon,
    current: false,
  },
  { name: 'Services', href: '/add-service', icon: FolderIcon },
  {
    name: 'Staff ',
    href: '/add-staff',
    icon: UserGroupIcon,
  },
  {
    name: 'Sales',
    href: '/sales',
    icon: DocumentDuplicateIcon,
  },
];
