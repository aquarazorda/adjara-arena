import { Button } from '../ui/button';

export default function Header() {
  return <header className='bg-primary text-primary-foreground flex items-center h-[70px] w-full'>
    <img src="/assets/logo-sm.svg" alt="Logo" className='px-4 py-3' />
    <aside className="flex px-4 py-1 ml-auto gap-4">
      <Button variant="ghost" className='p-0'>
        <div className='flex flex-col gap-[2px] items-center'>
          <img src="/assets/icons/search.svg" alt="Search" className='w-6 h-6' />
          ძიება
        </div>
      </Button>
      <Button variant="ghost" className='p-0'>
        <div className='flex flex-col gap-[2px] items-center'>
          <img src="/assets/icons/profile.svg" alt="Profile" className='w-6 h-6' />
          შესვლა
        </div>
      </Button>
    </aside>
  </header>
}