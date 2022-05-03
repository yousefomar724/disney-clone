import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const UserOptions = () => {
  const { data: session } = useSession()
  return (
    <Menu as="div" className="relative inline-block text-lefz-[1000]">
      <div>
        <Menu.Button className="flex w-full items-center justify-center gap-1 rounded-full border border-gray-300 bg-white py-px px-px text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none">
          <Image
            layout="fixed"
            src={session?.user?.image! || '/images/default.png'}
            width={35}
            height={35}
            objectFit="cover"
            objectPosition="center"
            alt={session?.user?.name!}
            className="rounded-full"
            title={session?.user?.email!}
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="fixed z-50 right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link href="/watchlist">
                  <a
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm hover:bg-gray-100'
                    )}
                  >
                    My watchlist
                  </a>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  type="submit"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block w-full px-4 py-2 text-left text-sm'
                  )}
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default UserOptions
